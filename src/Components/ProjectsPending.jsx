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
  Typography
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


function createData(name, id, client, deadline, estimatedBudget, estimatedDuration) {
  return { name, id, client, deadline, estimatedBudget, estimatedDuration };
}

export default function ProjectsPending() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const employeeAssigningRef = useRef(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);

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
        project.projectDuration
      )));
    } catch (error) {
      console.error('Error fetching pending projects:', error);
    }
  };

  const showModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
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
          setIsModalOpen(false);
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
        {/* <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: 3,
            fontWeight: 600,
            color: theme.palette.primary.dark
          }}
        >
          Pending Projects
        </Typography> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                {/* <TableCell align="right">Project ID</TableCell> */}
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Deadline</TableCell>
                <TableCell align="left">Budget($)</TableCell>
                <TableCell align="left">Duration(Weeks)</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.id}</TableCell> */}
                  <TableCell align="left">{row.client}</TableCell>
                  <TableCell align="left">{formatDate(row.deadline)}</TableCell>
                  <TableCell align="left">{row.estimatedBudget}</TableCell>
                  <TableCell align="left">{row.estimatedDuration}</TableCell>
                  <TableCell align="center">
                    <Button className='text-white hover:text-white' style={{ backgroundColor: 'green', hover: 'white' }} onClick={() => showModal(row.id)}>
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
          <Modal
            width={1000}
            className='mr-36'
            title="Assign Employees To Project"
            open={isModalOpen}
            onOk={handleStart}
            onCancel={handleCancel}
          >
            {selectedProjectId && (
              <EmployeeAssigning
                projectId={selectedProjectId}
                ref={employeeAssigningRef}
              />
            )}
          </Modal>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}