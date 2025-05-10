import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  TextField, Box,
  CircularProgress,
  Button,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApplicationsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    fetchApplications();
  }, [id]);
  
  // const fetchApplications = () => {
  //   axios.get(`${API_BASE_URL}applications/Aview/byVacancy/${id}`)
  //     .then((response) => {
  //       // Sort applications by score before setting state
  //       const sortedApplications = response.data.sort((a, b) => {
  //         // Convert scores to numbers, treating null/undefined as 0
  //         const scoreA = Number(a.cvScore) || 0;
  //         const scoreB = Number(b.cvScore) || 0;
  //         return scoreB - scoreA; // Sort in descending order
  //       });
  //       setApplications(sortedApplications);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching applications:", error);
  //       setError("Failed to load applications.");
  //       setLoading(false);
  //     });
  // };

  const fetchApplications = () => {
  setLoading(true); // Start loading

  axios.get(`${API_BASE_URL}applications/Aview/byVacancy/${id}`)
    .then((response) => {
      if (Array.isArray(response.data) && response.data.length === 0) {
        // No applications found
        setApplications([]);
        setError("No applications available for this vacancy.");
      } else if (Array.isArray(response.data) && response.data.length > 0) {
        // Sort applications by score before setting state
        const sortedApplications = response.data.sort((a, b) => {
          // Convert scores to numbers, treating null/undefined as 0
          const scoreA = Number(a.cvScore) || 0;
          const scoreB = Number(b.cvScore) || 0;
          return scoreB - scoreA; // Sort in descending order
        });
        setApplications(sortedApplications);
        setError(null); // Clear any previous error
      } else {
        // Handle unexpected response structure
        setApplications([]);
        setError("Unexpected data format.");
      }
      setLoading(false); // Set loading to false
    })
    .catch((error) => {
      console.error("Error fetching applications:", error);
      setApplications([]); // Set empty array in case of error
      setError("Failed to load applications.");
      setLoading(false); // Set loading to false
    });
};


  const handleDownload = async (application) => {
    try {
      if (!application?.filename) {
        showSnackbar("No file available for download", "error");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}applications/files/${application.filename}`,
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/octet-stream'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Download failed');
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', application.filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.error('Error downloading file:', err);
      showSnackbar('Error downloading file: ' + (err.response?.data?.message || err.message), "error");
    }
  };

  const handleViewApplication = (app) => {
    navigate(`/cvs/${app._id}`);
  };
  
  // Open delete confirmation dialog
  const handleDeleteClick = (app) => {
    setApplicationToDelete(app);
    setDeleteDialogOpen(true);
  };
  
  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };
  
  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return;
    
    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}applications/Adelete/${applicationToDelete._id}`);
      
      if (response.status === 200) {
        // Remove application from state to update UI
        setApplications(prevApplications => 
          prevApplications.filter(app => app._id !== applicationToDelete._id)
        );
        showSnackbar("Application successfully deleted", "success");
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      showSnackbar("Failed to delete application", "error");
    } finally {
      setLoading(false);
      handleCloseDeleteDialog();
    }
  };
  
  // Show snackbar with custom message and severity
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Filter applications based on search term while maintaining sort order
  const filteredApplications = applications?.filter(app => {
    const searchLower = searchTerm.toLowerCase();
    return (
      app.name?.toLowerCase().includes(searchLower) ||
      app.email?.toLowerCase().includes(searchLower) ||
      app.phoneNo?.toLowerCase().includes(searchLower) ||
      app._id?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <CircularProgress style={{ color: "#4CAF50" }} />
    </div>
  );

  if (error) return (
    <Typography color="error" align="center" sx={{ padding: "2rem" }}>
      {error}
    </Typography>
  );

  return (
    <>
     {/* Elegant Back Link */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate(-1)}>
        <IconButton size="small" sx={{ p: 0, pr: 1, color: 'green' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: 'green' }}>
          Go Back
        </Typography>
      </Box>
      <Paper sx={{ 
        maxWidth: 1200, 
        margin: "2rem auto",
        padding: "1.5rem",
        backgroundColor: "#fafafa"
      }}>
        {loading ? (
  <Typography>Loading...</Typography>
) : error ? (
  <Typography color="error">Failed to load applications.</Typography>
) : applications?.length === 0 ? (
  <Typography>No applications available for this vacancy.</Typography>
) : (
  <>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: "#2E7D32",
            marginBottom: "2rem"
          }}
        >
          Applications for {applications[0].jobTitle}
        </Typography>
          
          {/* {applications?.length > 0 && `Applications for ${applications[0].jobTitle}`} */}
       

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              maxWidth: 500,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'green',
                },
                '&:hover fieldset': {
                  borderColor: 'green',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'green' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E8F5E9" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Application ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Phone No</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Score</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography sx={{ color: 'gray', py: 3 }}>
                      No applications found matching your search
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications?.map((app) => (
                  <TableRow 
                    key={app._id}
                    sx={{ '&:hover': { backgroundColor: '#F1F8E9' } }}
                  >
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app._id?.slice(-10) || 'N/A'}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.phoneNo}</TableCell>
                    <TableCell>{app.cvScore || 'N/A'}/1000</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewApplication(app)}
                          sx={{ 
                            borderColor: '#4CAF50',
                            color: '#4CAF50',
                            '&:hover': {
                              borderColor: '#2E7D32',
                              backgroundColor: '#E8F5E9'
                            }
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<FileDownloadIcon />}
                          onClick={() => handleDownload(app)}
                          sx={{ 
                            borderColor: '#4CAF50',
                            color: '#4CAF50',
                            '&:hover': {
                              borderColor: '#2E7D32',
                              backgroundColor: '#E8F5E9'
                            }
                          }}
                        >
                          Download
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteClick(app)}
                          sx={{ 
                            borderColor: '#f44336',
                            color: '#f44336',
                            '&:hover': {
                              borderColor: '#d32f2f',
                              backgroundColor: '#ffebee'
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
)}
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#d32f2f" }}>
          Delete Application
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the application from {applicationToDelete?.name}? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained" 
            autoFocus
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplicationsList;