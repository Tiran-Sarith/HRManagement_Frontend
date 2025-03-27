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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  CheckCircle as CheckCircleIcon 
} from '@mui/icons-material';
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

export default function InProgressProjects() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);

  useEffect(() => {
    fetchInProgressProjects();
  }, []);

  const fetchInProgressProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const inProgressProjects = response.data.filter(project => project.projectStatus === 'Inprogress');
      setRows(inProgressProjects);
    } catch (error) {
      console.error('Error fetching in-progress projects:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    try {
      await axios.delete(`${API_BASE_URL}projects/Pdelete/${selectedProject._id}`);
      
      // Remove the project from the list
      setRows(rows.filter(project => project._id !== selectedProject._id));
      
      // Close the delete dialog
      setDeleteDialogOpen(false);
      
      alert('Project deleted successfully.');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project.');
    }
  };

  const handleFinishProject = async () => {
    if (!selectedProject) return;

    try {
      // Update project status to 'Finished'
      await axios.put(`${API_BASE_URL}projects/Pupdate/${selectedProject._id}`, {
        projectStatus: 'Finished'
      });
      
      // Clear project assignments for employees
      await axios.post(`${API_BASE_URL}employee/clearProjectAssignments/${selectedProject._id}`);
      
      // Remove from in-progress list
      setRows(rows.filter(project => project._id !== selectedProject._id));
      
      // Close the finish dialog
      setFinishDialogOpen(false);
      
      alert('Project marked as finished and employee assignments cleared.');
    } catch (error) {
      console.error('Error updating project status:', error);
      alert('An error occurred while finishing the project.');
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
          In Progress Projects
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
                    <IconButton 
                      color="success" 
                      onClick={() => {
                        setSelectedProject(project);
                        setFinishDialogOpen(true);
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => {
                        setSelectedProject(project);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-project-dialog-title"
        >
          <DialogTitle id="delete-project-dialog-title">
            Delete Project
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the project "{selectedProject?.projectName}"? 
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteProject} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Finish Project Confirmation Dialog */}
        <Dialog
          open={finishDialogOpen}
          onClose={() => setFinishDialogOpen(false)}
          aria-labelledby="finish-project-dialog-title"
        >
          <DialogTitle id="finish-project-dialog-title">
            Finish Project
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to mark the project "{selectedProject?.projectName}" as finished? 
              This will clear all employee assignments for this project.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFinishDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleFinishProject} color="success" autoFocus>
              Finish Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}