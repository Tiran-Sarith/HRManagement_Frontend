import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { Button, Modal, message } from 'antd';
import { useState, useRef } from 'react';
import EmployeeAssigning from './EmployeeAssigning';
import {
  Box,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Custom theme with green palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Dark green
      light: '#4CAF50', // Lighter green
      dark: '#1B5E20', // Darker green
    },
    background: {
      default: '#F1F8E9', // Light green background
      paper: '#ffffff' // Lighter paper background
    }
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E7D32',
          color: 'white'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: '#2E7D32'
        }
      }
    }
  }
});


function createData(name, id, client, deadline, estimatedBudget, estimatedDuration, description, technology) {
  return { name, id, client, deadline, estimatedBudget, estimatedDuration, description, technology };
}

export default function ProjectsPending() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const employeeAssigningRef = useRef(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);
  const [projectDetails, setProjectDetails] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const pendingProjects = response.data.filter(project => project.projectStatus === 'Pending');
      setRows(pendingProjects.map(project => createData(
        project.projectName,
        project._id,
        project.projectManager,
        project.projectDeadline,
        project.projectBudget,
        project.projectDuration,
        project.projectDescription,
        project.projectCategory
      )));
    } catch (error) {
      console.error('Error fetching pending projects:', error);
    }
  };

  const showAssignModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsAssignModalOpen(true);
  };

  const handleCancelAssign = () => {
    setIsAssignModalOpen(false);
    setSelectedProjectId(null);
  };

  // Show details modal when clicking on a row
  const showDetailsModal = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleCancelDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  // Handle start project and assign employees
  const handleStart = async () => {
    try {
      if (!selectedProjectId) {
        message.error('No project selected');
        return;
      }

      // First check if ref exists and call handleAssignEmployees
      if (employeeAssigningRef.current && employeeAssigningRef.current.handleAssignEmployees) {
        const employeeAssignSuccess = await employeeAssigningRef.current.handleAssignEmployees();

        if (employeeAssignSuccess) {
          // Then update project status
          await axios.put(`${API_BASE_URL}projects/Pupdate/${selectedProjectId}`, {
            projectStatus: 'Inprogress'
          });

          // Remove from pending list
          setRows(rows.filter(row => row.id !== selectedProjectId));
          message.success('Project started successfully');
          setIsAssignModalOpen(false);
        }
      } else {
        message.error('Employee assignment component is not properly initialized');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      message.error('Failed to start project');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Deadline</TableCell>
                <TableCell align="left">Budget($)</TableCell>
                <TableCell align="left">Duration(Weeks)</TableCell>
                <TableCell align="left">Technology</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => showDetailsModal(row)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.client}</TableCell>
                  <TableCell align="left">{formatDate(row.deadline)}</TableCell>
                  <TableCell align="left">{row.estimatedBudget}</TableCell>
                  <TableCell align="left">{row.estimatedDuration}</TableCell>
                  <TableCell align="left">{row.technology}</TableCell>
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Button
                      className='text-white hover:text-white'
                      style={{ backgroundColor: 'green', hover: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        showAssignModal(row.id);
                      }}
                    >
                      Start
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Employee Assignment Modal */}
          <Modal
            width={1000}
            className='mr-36'
            title="Assign Employees To Project"
            open={isAssignModalOpen}
            onOk={handleStart}
            onCancel={handleCancelAssign}
          >
            {selectedProjectId && (
              <EmployeeAssigning
                projectId={selectedProjectId}
                ref={employeeAssigningRef}
              />
            )}
          </Modal>

          {/* Project Details Modal */}
          <Modal
            title="Project Details"
            open={isDetailsModalOpen}
            onCancel={handleCancelDetails}
            footer={
              <div style={{ textAlign: 'center' }}>
                <Button className='iteams-center' key="close" onClick={handleCancelDetails} >
                  Close
                </Button>,
                <Button
                  key="start"
                  type="primary"
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => {
                    handleCancelDetails();
                    if (selectedProject) {
                      showAssignModal(selectedProject.id);
                    }
                  }}
                >
                  Start Project
                </Button>
              </div>
            }
          >
            {selectedProject && (
              // <Box sx={{ p: 2 }}>
              //   <Grid container spacing={2}>
              //     <Grid item xs={12}>
              //       <Typography variant="h5" fontWeight="bold" color="primary.dark">
              //         {selectedProject.name}
              //       </Typography>
              //       <Divider sx={{ my: 2 }} />
              //     </Grid>

              //     <Grid item xs={6}>
              //       <Typography variant="subtitle1" fontWeight="bold">Client:</Typography>
              //       <Typography variant="body1" gutterBottom>{selectedProject.client}</Typography>
              //     </Grid>

              //     <Grid item xs={6}>
              //       <Typography variant="subtitle1" fontWeight="bold">Deadline:</Typography>
              //       <Typography variant="body1" gutterBottom>{formatDate(selectedProject.deadline)}</Typography>
              //     </Grid>

              //     <Grid item xs={6}>
              //       <Typography variant="subtitle1" fontWeight="bold">Budget:</Typography>
              //       <Typography variant="body1" gutterBottom>${selectedProject.estimatedBudget}</Typography>
              //     </Grid>

              //     <Grid item xs={6}>
              //       <Typography variant="subtitle1" fontWeight="bold">Duration:</Typography>
              //       <Typography variant="body1" gutterBottom>{selectedProject.estimatedDuration} weeks</Typography>
              //     </Grid>

              //     <Grid item xs={12}>
              //       <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
              //       <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
              //         <Typography variant="body1">
              //           {selectedProject.description || "No description provided."}
              //         </Typography>
              //       </Paper>
              //     </Grid>
              //   </Grid>
              // </Box>



              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>

                  {/* Title */}
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="bold" color="primary.dark">
                      {selectedProject.name}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  {/* Client Info */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Client:</Typography>
                    <Typography variant="body1 " textAlign="left">{selectedProject.client}</Typography>
                  </Grid>

                  {/* Deadline */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Deadline:</Typography>
                    <Typography variant="body1" textAlign="left">{formatDate(selectedProject.deadline)}</Typography>
                  </Grid>

                  {/* Budget */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Budget:</Typography>
                    <Typography variant="body1" textAlign="left">${selectedProject.estimatedBudget}</Typography>
                  </Grid>

                  {/* Duration */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Duration:</Typography>
                    <Typography variant="body1" textAlign="left">{selectedProject.estimatedDuration} weeks</Typography>
                  </Grid>

                  {/* Technology Used */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">Technology Used:</Typography>
                    <Paper elevation={1} sx={{ p: 2, backgroundColor: '#eef6fb' }}>
                      <Typography variant="body1" textAlign="left">
                        {selectedProject.technology || "No technologies specified."}
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
                    <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                      <Typography variant="body1" textAlign="justify">
                        {selectedProject.description || "No description provided."}
                      </Typography>
                    </Paper>
                  </Grid>

                </Grid>
              </Box>

            )}
          </Modal>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}