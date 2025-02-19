import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";

import { PageContainerToolbar } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';



const ApplicationsList = () => {
    const { id } = useParams(); // Get the ID from the URL
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8070/applications/Aview/byVacancy/${id}`)
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
        setLoading(false);
      });
  }, [id]);



  const handleDownload = async () => {
    try {
        if (!application?.filename) {
            alert('No file available for download');
            return;
        }

        const response = await axios.get(
            `http://localhost:8070/applications/download/${application.filename}`, 
            {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/octet-stream'
                }
            }
        );

        // Check if response is valid
        if (response.status !== 200) {
            throw new Error('Download failed');
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', application.filename);
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        link.remove();
    } catch (err) {
        console.error('Error downloading file:', err);
        alert('Error downloading file: ' + (err.response?.data?.message || err.message));
    }
};



  if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "20px auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
      {applications.length > 0 && <span>Designation: {applications[0].jobTitle}</span>}
        
      </Typography>
            <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Portfolio</strong></TableCell>
            <TableCell><strong>Phone No</strong></TableCell>
            <TableCell><strong>Job Title</strong></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.portfolio || "N/A"}</TableCell>
              <TableCell>{app.phoneNo}</TableCell>
              <TableCell>{app.jobTitle}</TableCell>
              <TableCell>
              <div className='my-4 mx-2'>
                <PageContainerToolbar>
                    <Button 
                        startIcon={<FileDownloadIcon />} 
                        color="success"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </PageContainerToolbar>
            </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
};

export default ApplicationsList;