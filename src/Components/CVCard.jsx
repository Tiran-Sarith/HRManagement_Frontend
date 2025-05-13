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
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails
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
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            const response = await axios.get(`${API_BASE_URL}applications/get-s3-cv-url/${filename}`);
            setPreviewUrl(response.data.url);
        } catch (err) {
            console.error('Error fetching S3 preview URL:', err);
        }
    };

    const handleDownload = async () => {
        try {
            if (!application?.filename) {
                throw new Error('No file available for download');
            }

            const response = await axios.get(`${API_BASE_URL}applications/get-s3-cv-url/${application.filename}`);
            const url = response.data.url;

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', application.filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading file from S3:', err);
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
                <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ textAlign: 'left', color: 'green', fontWeight: 'bold' }}>
                            Application Details
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
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
                    </Grid>

                </Grid>

                <Grid container spacing={4}>
                    {/* Left side - Application Info */}

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            {/* Basic Information Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
                                    Basic Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

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




                        </Box>

                    </Grid>



                    {/* Right side - additional information */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold' }}>
                                Additional Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

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
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Questions and Answers Section */}
                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: 'black', mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                        <QuestionAnswerIcon sx={{ color: 'green' }} />
                        Interview Questions & Answers
                    </Typography>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' , padding: '0 16px',width: '100%'}}>
                        {application.questions && application.questions.length > 0 ? (
                            application.questions.map((question, index) => (
                                <Accordion key={index} sx={{ mb: 2, border: '1px solid #e8f5e9', borderRadius: 2, boxShadow: 1, width: '100%' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: 'green' }} />}
                                        sx={{ bgcolor: '#f5f5f5' }}
                                    >
                                        <Typography sx={{ fontWeight: 'bold', textAlign: 'justify' }}>
                                            Question {index + 1}: {question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ bgcolor: 'white', p: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: 'green', textAlign: 'left' }}>
                                            Applicant's Answer:
                                        </Typography>
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                            {application.answers && application.answers[index]
                                                ? application.answers[index]
                                                : 'No answer provided yet.'}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Paper sx={{ p: 3, bgcolor: '#f5f5f5', color: 'gray' }}>
                                No interview questions available for this application.
                            </Paper>
                        )}
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CVCard;