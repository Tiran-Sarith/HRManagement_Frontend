<<<<<<< Updated upstream


// export default ApplicationsList;
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
  TextField, Container, Box,
  CircularProgress,
  Button,
  InputAdornment
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

const ApplicationsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState(null);
=======
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";

// import { PageContainerToolbar } from '@toolpad/core/PageContainer';
// import Button from '@mui/material/Button';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';



// const ApplicationsList = () => {
//     const { id } = useParams(); // Get the ID from the URL
//   const [applications, setApplications] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8070/applications/Aview/byVacancy/${id}`)
//       .then((response) => {
//         setApplications(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching applications:", error);
//         setError("Failed to load applications.");
//         setLoading(false);
//       });
//   }, [id]);



//   const handleDownload = async () => {
//     try {
//         if (!application?.filename) {
//             alert('No file available for download');
//             return;
//         }

//         const response = await axios.get(
//             `http://localhost:8070/applications/download/${application.filename}`, 
//             {
//                 responseType: 'blob',
//                 headers: {
//                     'Accept': 'application/octet-stream'
//                 }
//             }
//         );

//         // Check if response is valid
//         if (response.status !== 200) {
//             throw new Error('Download failed');
//         }

//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', application.filename);
//         document.body.appendChild(link);
//         link.click();
        
//         // Cleanup
//         window.URL.revokeObjectURL(url);
//         link.remove();
//     } catch (err) {
//         console.error('Error downloading file:', err);
//         alert('Error downloading file: ' + (err.response?.data?.message || err.message));
//     }
// };



//   if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "20px auto" }}>
//       <Typography variant="h5" align="center" gutterBottom>
//       {applications.length > 0 && <span>Designation: {applications[0].jobTitle}</span>}
        
//       </Typography>
//             <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Name</strong></TableCell>
//             <TableCell><strong>Email</strong></TableCell>
//             <TableCell><strong>Portfolio</strong></TableCell>
//             <TableCell><strong>Phone No</strong></TableCell>
//             <TableCell><strong>Job Title</strong></TableCell>
            
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {applications.map((app) => (
//             <TableRow key={app._id}>
//               <TableCell>{app.name}</TableCell>
//               <TableCell>{app.email}</TableCell>
//               <TableCell>{app.portfolio || "N/A"}</TableCell>
//               <TableCell>{app.phoneNo}</TableCell>
//               <TableCell>{app.jobTitle}</TableCell>
//               <TableCell>
//               <div className='my-4 mx-2'>
//                 <PageContainerToolbar>
//                     <Button 
//                         startIcon={<FileDownloadIcon />} 
//                         color="success"
//                         onClick={handleDownload}
//                     >
//                         Download
//                     </Button>
//                 </PageContainerToolbar>
//             </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//     </TableContainer>
//   );
// };

// export default ApplicationsList;



import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ApplicationCard from '../Components/ApplicationCard';

const Applications = () => {
  const [applications, setApplications] = useState([]);
>>>>>>> Stashed changes
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

<<<<<<< Updated upstream
  const handleDownload = async (application) => {
    try {
      if (!application?.filename) {
        alert('No file available for download');
        return;
      }

      const response = await axios.get(
        `http://localhost:8070/applications/files/${application.filename}`,
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
      alert('Error downloading file: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleViewApplication = (app) => {
    navigate(`/cvs/${app._id}`);
  };

  // Filter applications based on search term
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
    <Paper sx={{ 
      maxWidth: 1200, 
      margin: "2rem auto",
      padding: "1.5rem",
      backgroundColor: "#fafafa"
    }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ 
          color: "#2E7D32",
          marginBottom: "2rem"
        }}
      >
        {applications?.length > 0 && `Applications for ${applications[0].jobTitle}`}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: 'green' }}>
          Applications
        </Typography>
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
                <TableCell colSpan={5} align="center">
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
                  <TableCell>{app.cvScore || 'N/A'}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewApplication(app)}
                        sx={{ 
                          mr: 1,
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
=======
  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:8070/applications/Aview/byVacancy/${id}');
      const data = await response.json();
      // Sort applications by MongoDB ObjectId (newest first)
      const sortedData = [...data].sort((a, b) => {
        // MongoDB ObjectId contains timestamp in first 4 bytes
        // Later ObjectIds (newer) are "greater" than earlier ones
        return b._id.localeCompare(a._id);
      });
      setApplications(sortedData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch applications');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const filteredApplications = applications?.filter(app => 
    app?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: 'green' }}>
          Applications
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search applications..."
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: 'green' }} />
        </Box>
      ) : error ? (
        <Box sx={{ 
          bgcolor: '#e8f5e9', 
          color: 'green', 
          p: 2, 
          borderRadius: 1 
        }}>
          {error}
        </Box>
      ) : applications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'green' }}>
          No applications found
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3
        }}>
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application._id || Math.random()}
              application={application}
            />
          ))}
        </Box>
      )}
    </Container>
>>>>>>> Stashed changes
  );
};

export default Applications;