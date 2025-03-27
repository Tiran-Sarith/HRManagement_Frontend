// //ProjectsPending.jsx
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import axios from 'axios';
// import { Button, Modal, message } from 'antd';
// import { useState, useRef } from 'react';
// import EmployeeAssigning from './EmployeeAssigning';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, id, client, deadline, estimatedBudget, estimatedDuration) {
//   return { name, id, client, deadline, estimatedBudget, estimatedDuration };
// }

// export default function ProjectsPending() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProjectId, setSelectedProjectId] = useState(null);
//   const employeeAssigningRef = useRef(null);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(8);
//   const [rows, setRows] = React.useState([]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   React.useEffect(() => {
//     fetchPendingProjects();
//   }, []);

//   const fetchPendingProjects = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}projects/Pview`);
//       const pendingProjects = response.data.filter(project => project.projectStatus === 'Pending');
//       setRows(pendingProjects.map(project => createData(
//         project.projectName,
//         project._id,
//         project.projectManager,
//         project.projectDeadline,
//         project.projectBudget,
//         project.projectDuration
//       )));
//     } catch (error) {
//       console.error('Error fetching pending projects:', error);
//     }
//   };

//   const showModal = (projectId) => {
//     setSelectedProjectId(projectId);
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedProjectId(null);
//   };

//   // Handle start project and assign employees
//   const handleStart = async () => {
//     try {
//       if (!selectedProjectId) {
//         message.error('No project selected');
//         return;
//       }

//       // First assign employees using the EmployeeAssigning component
//       const employeeAssignSuccess = await employeeAssigningRef.current.handleAssignEmployees();
      
//       if (employeeAssignSuccess) {
//         // Then update project status
//         await axios.put(`${API_BASE_URL}projects/Pupdate/${selectedProjectId}`, {
//           projectStatus: 'Inprogress'
//         });

//         // Remove from pending list
//         setRows(rows.filter(row => row.id !== selectedProjectId));
//         message.success('Project started successfully');
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       message.error('Failed to start project');
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Project Name</StyledTableCell>
//             <StyledTableCell align="right">Project ID</StyledTableCell>
//             <StyledTableCell align="right">Client</StyledTableCell>
//             <StyledTableCell align="right">Deadline</StyledTableCell>
//             <StyledTableCell align="right">Budget($)</StyledTableCell>
//             <StyledTableCell align="right">Duration(Weeks)</StyledTableCell>
//             <StyledTableCell align="center"></StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//             <StyledTableRow key={row.id}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.id}</StyledTableCell>
//               <StyledTableCell align="right">{row.client}</StyledTableCell>
//               <StyledTableCell align="right">{row.deadline}</StyledTableCell>
//               <StyledTableCell align="right">{row.estimatedBudget}</StyledTableCell>
//               <StyledTableCell align="right">{row.estimatedDuration}</StyledTableCell>
//               <StyledTableCell align="center">
//                 <Button className='bg-black text-white' onClick={() => showModal(row.id)}>
//                   Start
//                 </Button>
//               </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Modal 
//         width={1000} 
//         className='mr-36' 
//         title="Assign Employees To Project" 
//         open={isModalOpen} 
//         onOk={handleStart} 
//         onCancel={handleCancel}
//       >
//         {selectedProjectId && (
//           <EmployeeAssigning 
//             projectId={selectedProjectId} 
//             ref={employeeAssigningRef} 
//           />
//         )}
//       </Modal>
//     </TableContainer>
//   );
// }






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
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

export default function ProjectsPending() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [startProjectDialogOpen, setStartProjectDialogOpen] = useState(false);

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const pendingProjects = response.data.filter(project => project.projectStatus === 'Pending');
      setRows(pendingProjects);
    } catch (error) {
      console.error('Error fetching pending projects:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStartProject = async () => {
    if (!selectedProject) return;

    try {
      // Update project status to 'Inprogress'
      await axios.put(`${API_BASE_URL}projects/Pupdate/${selectedProject._id}`, {
        projectStatus: 'Inprogress'
      });
      
      // Remove from pending list
      setRows(rows.filter(project => project._id !== selectedProject._id));
      
      // Close the start project dialog
      setStartProjectDialogOpen(false);
      
      alert('Project started successfully.');
    } catch (error) {
      console.error('Error starting project:', error);
      alert('An error occurred while starting the project.');
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
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            marginBottom: 3, 
            fontWeight: 600, 
            color: theme.palette.primary.dark 
          }}
        >
          Pending Projects
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Budget ($)</TableCell>
                <TableCell>Duration (Weeks)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                <TableRow 
                  key={project._id} 
                  hover
                >
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project._id}</TableCell>
                  <TableCell>{project.projectManager}</TableCell>
                  <TableCell>{formatDate(project.projectDeadline)}</TableCell>
                  <TableCell>{project.projectBudget}</TableCell>
                  <TableCell>{project.projectDuration}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => {
                        setSelectedProject(project);
                        setStartProjectDialogOpen(true);
                      }}
                    >
                      Start Project
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 8, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Start Project Confirmation Dialog */}
        <Dialog
          open={startProjectDialogOpen}
          onClose={() => setStartProjectDialogOpen(false)}
          aria-labelledby="start-project-dialog-title"
        >
          <DialogTitle id="start-project-dialog-title">
            Start Project
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to start the project "{selectedProject?.projectName}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStartProjectDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleStartProject} color="primary" autoFocus>
              Start Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}