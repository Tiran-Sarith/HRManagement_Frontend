
// CVCard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    CircularProgress,
    Grid,
    Paper,
    Divider
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function CVCard() {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchApplicationData();
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [applicationId]);

    // Existing fetch functions remain the same...
    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}applications/Aview/${applicationId}`);
            setApplication(response.data);
            if (response.data.filename) {
                fetchPreview(response.data.filename);
            }
            setLoading(false);
        } catch (err) {
            setError('Error fetching application data');
            setLoading(false);
            console.error('Error:', err);
        }
    };

    const fetchPreview = async (filename) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}applications/files/${filename}`,
                {
                    responseType: 'blob'
                }
            );
            const url = URL.createObjectURL(response.data);
            setPreviewUrl(url);
        } catch (err) {
            console.error('Error fetching preview:', err);
        }
    };

    const handleDownload = async () => {
        try {
            if (!application?.filename) {
                throw new Error('No file available for download');
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

            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', application.filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading file:', err);
            alert('Error downloading file: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'green' }} />
        </Box>
    );

    if (error) return (
        <Paper sx={{ p: 3, bgcolor: '#e8f5e9', color: 'green' }}>
            {error}
        </Paper>
    );

    if (!application) return (
        <Paper sx={{ p: 3, bgcolor: '#e8f5e9', color: 'green' }}>
            No application found
        </Paper>
    );

    return (
        <Card
            sx={{
                maxWidth: 1000,
                width: '100%',
                boxShadow: 3,
                borderRadius: 2,
                border: '1px solid #e8f5e9',
                m: 2
            }}
        >
            <CardContent>
                <Grid container spacing={4}>
                    {/* Left side - Application Info */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h5" sx={{ color: 'green', mb: 2, fontWeight: 'bold' }}>
                                Application Details
                            </Typography>

                            {/* Basic Information Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold' }}>
                                    Basic Information
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PersonIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Name:</strong> {application.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {application.email ? (
                                                <a
                                                    href={`mailto:${application.email}`}
                                                    style={{ color: 'blue', textDecoration: 'underline' }}
                                                >
                                                    {application.email}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Tel No:</strong> {application.phoneNo ? (
                                                <a
                                                    href={`tel:${application.phoneNo}`}
                                                    style={{ color: 'blue', textDecoration: 'underline' }}
                                                >
                                                    {application.phoneNo}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <WorkIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Job Title:</strong> {application.jobTitle || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Additional Information Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold' }}>
                                    Additional Information
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                        <InfoIcon sx={{ color: 'green', mt: 0.5 }} />
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                                Introduction
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                                                {application.introduction || 'No introduction provided'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LanguageIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Portfolio:</strong> {application.portfolio ? (
                                                <a
                                                    href={application.portfolio}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: 'blue', textDecoration: 'underline' }}
                                                >
                                                    {application.portfolio}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <StarIcon sx={{ color: 'green' }} />
                                        <Typography variant="body1">
                                            <strong>Score:</strong> {application.cvScore !== undefined ? application.cvScore : 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<FileDownloadIcon />}
                                    onClick={handleDownload}
                                    sx={{
                                        bgcolor: 'green',
                                        '&:hover': {
                                            bgcolor: 'darkgreen',
                                        }
                                    }}
                                >
                                    Download CV
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right side - CV Preview */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            border: '2px dashed #e8f5e9',
                            borderRadius: 2,
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h6" sx={{ color: 'green', mb: 2 }}>
                                CV Preview
                            </Typography>

                            {previewUrl ? (
                                <Box sx={{ width: '100%', height: '600px', position: 'relative' }}>
                                    <iframe
                                        src={previewUrl}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            borderRadius: '8px'
                                        }}
                                        title="CV Preview"
                                    />
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <DescriptionIcon sx={{ fontSize: 60, color: 'green' }} />
                                    <Typography color="textSecondary">
                                        CV preview not available
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CVCard;