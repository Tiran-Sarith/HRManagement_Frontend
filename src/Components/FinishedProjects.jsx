import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Enhanced theme with green palette and additional styles
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Dark green
      light: '#4CAF50', // Lighter green
      dark: '#1B5E20', // Darker green
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#F44336', // Red for delete
      contrastText: '#ffffff'
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
          backgroundColor: '#2E7D32'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: '#2E7D32',
          fontSize: '0.95rem'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#f9fbf7',
          },
          '&:hover': {
            backgroundColor: '#edf7e9 !important',
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.deleteButton': {
            color: '#F44336',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.08)'
            }
          }
        }
      }
    }
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.9rem',
  padding: '16px'
}));

export default function FinishedProjects() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [sortOrder, setSortOrder] = useState('desc'); // Default: newest first (descending)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      await axios.delete(`${API_BASE_URL}projects/Pdelete/${projectToDelete._id}`);
      
      // Remove the deleted project from the state
      setRows(rows.filter(project => project._id !== projectToDelete._id));
      
      setSnackbar({
        open: true,
        message: 'Project deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting project. Please try again.',
        severity: 'error'
      });
    } finally {
      handleCloseDialog();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    // Sort the rows based on completion date
    const sortedRows = [...rows].sort((a, b) => {
      // Assuming you have a field like 'completedDate' or using 'updatedAt'
      // If you don't have a specific completion date field, you might need to add one
      const dateA = new Date(a.updatedAt || a.projectDeadline);
      const dateB = new Date(b.updatedAt || b.projectDeadline);
      
      return newOrder === 'asc' 
        ? dateA - dateB  // Ascending: oldest first
        : dateB - dateA; // Descending: newest first
    });
    
    setRows(sortedRows);
  };

  useEffect(() => {
    fetchFinishedProjects();
  }, []);

  const fetchFinishedProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const finishedProjects = response.data.filter(project => project.projectStatus === 'Finished');
      
      // Sort projects by default (newest first)
      const sortedProjects = finishedProjects.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.projectDeadline);
        const dateB = new Date(b.updatedAt || b.projectDeadline);
        return dateB - dateA; // Descending order by default
      });
      
      setRows(sortedProjects);
    } catch (error) {
      console.error('Error fetching finished projects:', error);
      setSnackbar({
        open: true,
        message: 'Error loading projects. Please refresh the page.',
        severity: 'error'
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {/* <Typography variant="h6" component="div" sx={{ color: 'primary.dark', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1 }} /> Completed Projects
          </Typography> */}
          
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<SortIcon />}
            onClick={toggleSortOrder}
            sx={{ borderRadius: 2 }}
          >
            Sort by {sortOrder === 'asc' ? 'Oldest' : 'Newest'} First
          </Button>
        </Box>

        <TableContainer 
          component={Paper} 
          elevation={3}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Budget ($)</TableCell>
                <TableCell>Duration (Weeks)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                <TableRow key={project._id} hover>
                  <StyledTableCell>{project.projectName}</StyledTableCell>
                  <StyledTableCell>{project.projectManager}</StyledTableCell>
                  <StyledTableCell>{formatDate(project.projectDeadline)}</StyledTableCell>
                  <StyledTableCell>${project.projectBudget.toLocaleString()}</StyledTableCell>
                  <StyledTableCell>{project.projectDuration}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Delete Project">
                      <IconButton 
                        className="deleteButton"
                        onClick={() => handleDeleteClick(project)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No completed projects found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
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
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
          Delete Project
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 1, px: 3, mt: 1 }}>
          <DialogContentText>
            Are you sure you want to delete the project "{projectToDelete?.projectName}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}


// import * as React from 'react';
// import  { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import { 
//   Box,
//   Typography
// } from '@mui/material';
// import axios from 'axios';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// // Custom theme with green palette
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2E7D32', // Dark green
//       light: '#4CAF50', // Lighter green
//       dark: '#1B5E20', // Darker green
//     },
//     background: {
//       default: '#F1F8E9', // Light green background
//       paper: '#ffffff' // Lighter paper background
//     }
//   },
//   components: {
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#2E7D32',
//           color: 'white'
//         }
//       }
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           color: 'white',
//           fontWeight: 'bold',
//           backgroundColor: '#2E7D32'
//         }
//       }
//     }
//   }
// });



// export default function FinishedProjects() {
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
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };


//   React.useEffect(() => {
//     fetchFinishedProjects();
//   }, []);

//   const fetchFinishedProjects = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}projects/Pview`);
//       const finishedProjects = response.data.filter(project => project.projectStatus === 'Finished');
//       setRows(finishedProjects
//       //   .map(project => createData(
//       //   project.projectName,
//       //   project._id,
//       //   project.projectManager,
//       //   project.projectDeadline,
//       //   project.projectBudget,
//       //   project.projectDuration
//       // ))
//     );
//     } catch (error) {
//       console.error('Error fetching finished projects:', error);
//     }
//   };

//   return (

//     <ThemeProvider theme={theme}>
//           <Box sx={{ width: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
            
//             <TableContainer component={Paper} elevation={3}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Project Name</TableCell>
//                     <TableCell>Client</TableCell>
//                     <TableCell>Deadline</TableCell>
//                     <TableCell>Budget ($)</TableCell>
//                     <TableCell>Duration (Weeks)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
//                     <TableRow 
//                       key={project._id} 
//                       hover
//                     >
//                       <TableCell>{project.projectName}</TableCell>
//                       {/* <TableCell>{project._id}</TableCell> */}
//                       <TableCell>{project.projectManager}</TableCell>
//                       <TableCell>{formatDate(project.projectDeadline)}</TableCell>
//                       <TableCell>{project.projectBudget}</TableCell>
//                       <TableCell>{project.projectDuration}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               <TablePagination
//                 rowsPerPageOptions={[5, 8, 10, 25]}
//                 component="div"
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </TableContainer>
//           </Box>
//         </ThemeProvider>

   
//   );
// }
