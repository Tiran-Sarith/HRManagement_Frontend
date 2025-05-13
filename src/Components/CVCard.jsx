// Content for Interview Questions tab
    const renderInterviewQuestions = () => (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ 
                color: 'primary.main', 
                mb: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
            }}>
                <QuestionAnswerIcon />
                Interview Questions & Answers
            </Typography>
            
            <Box sx={{ 
                maxHeight: '600px', 
                overflowY: 'auto', 
                width: '100%',
                px: 1,
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: 10,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                    borderRadius: 10,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                    },
                },
            }}>
                {application.questions && application.questions.length > 0 ? (
                    application.questions.map((question, index) => (
                        <Accordion 
                            key={index} 
                            sx={{ 
                                mb: 2.5, 
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                borderRadius: '12px !important', 
                                overflow: 'hidden',
                                '&:before': {
                                    display: 'none',
                                },
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                sx={{ 
                                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                                    '&.Mui-expanded': {
                                        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    }
                                }}
                            >
                                <Typography sx={{ 
                                    fontWeight: 600, 
                                    color: 'primary.dark',
                                    fontSize: '0.95rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Box component="span" sx={{ 
                                        bgcolor: 'primary.main', 
                                        color: 'white', 
                                        width: 24, 
                                        height: 24,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        flexShrink: 0,
                                    }}>
                                        {index + 1}
                                    </Box>
                                    {question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ bgcolor: 'white', p: 3 }}>
                                <Typography variant="body1" sx={{ 
                                    fontWeight: 'bold', 
                                    mb: 2, 
                                    color: 'primary.main', 
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Box component="span" sx={{
                                        display: 'inline-block',
                                        width: 6,
                                        height: 20,
                                        bgcolor: 'primary.main',
                                        borderRadius: 1,
                                        mr: 1
                                    }}></Box>
                                    Applicant's Answer:
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    whiteSpace: 'pre-line', 
                                    textAlign: 'justify',
                                    color: 'text.primary',
                                    bgcolor: alpha(theme.palette.primary.light, 0.04),
                                    p: 2,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    lineHeight: 1.7,
                                }}>
                                    {application.answers && application.answers[index]
                                        ? application.answers[index]
                                        : 'No answer provided yet.'}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Paper sx={{ 
                        p: 4, 
                        bgcolor: alpha(theme.palette.primary.light, 0.05), 
                        color: 'text.secondary',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}>
                        <QuestionAnswerIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.4) }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            No interview questions available for this application.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );import React, { useState, useEffect } from 'react';
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
    AccordionDetails,
    Tabs,
    Tab,
    ThemeProvider,
    createTheme,
    alpha,
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

// Create a custom green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Material-UI Green 800
      light: '#4caf50', // Material-UI Green 500
      dark: '#1b5e20', // Material-UI Green 900
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e8f5e9', // Light green background
      light: '#f1f8e9',
      dark: '#c8e6c9',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:before': {
            display: 'none',
          },
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          marginBottom: 12,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 16px',
          minHeight: 56,
          '&.Mui-expanded': {
            minHeight: 56,
          },
        },
        content: {
          margin: '12px 0',
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          minHeight: 48,
          padding: '12px 20px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// TabPanel component to handle tab content display
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

// Helper function for tab accessibility
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CVCard() {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        fetchApplicationData();
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [applicationId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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

    // Content for Application Details tab
    const renderApplicationDetails = () => (
        <Grid container spacing={4}>
            {/* Left side - Application Info */}
            <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Basic Information Section */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DescriptionIcon fontSize="small" />
                            Basic Information
                        </Typography>
                        <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3, px: 1 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <PersonIcon />
                                </Box>
                                <Typography variant="body1">
                                    <strong>Name:</strong> {application.name}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <EmailIcon />
                                </Box>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {application.email ? (
                                        <a
                                            href={`mailto:${application.email}`}
                                            style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                                        >
                                            {application.email}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <PhoneIcon />
                                </Box>
                                <Typography variant="body1">
                                    <strong>Tel No:</strong> {application.phoneNo ? (
                                        <a
                                            href={`tel:${application.phoneNo}`}
                                            style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                                        >
                                            {application.phoneNo}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <WorkIcon />
                                </Box>
                                <Typography variant="body1">
                                    <strong>Job Title:</strong> {application.jobTitle || 'N/A'}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <LanguageIcon />
                                </Box>
                                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                                    <strong>Portfolio:</strong> {application.portfolio ? (
                                        <a
                                            href={application.portfolio}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                                        >
                                            {application.portfolio}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                bgcolor: alpha(theme.palette.primary.light, 0.07),
                                p: 1.5,
                                borderRadius: 2
                            }}>
                                <Box sx={{ 
                                    bgcolor: 'primary.main', 
                                    borderRadius: '50%', 
                                    p: 1, 
                                    display: 'flex',
                                    color: 'white'
                                }}>
                                    <StarIcon />
                                </Box>
                                <Typography variant="body1">
                                    <strong>Score:</strong> {application.cvScore !== undefined ? (
                                        <Box component="span" sx={{ 
                                            py: 0.5, 
                                            px: 1.5, 
                                            borderRadius: 10, 
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            ml: 1
                                        }}>
                                            {application.cvScore}
                                        </Box>
                                    ) : 'N/A'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>

            {/* Right side - additional information */}
            <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoIcon fontSize="small" />
                        Additional Information
                    </Typography>
                    <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2, 
                        mt: 3,
                        bgcolor: alpha(theme.palette.primary.light, 0.07),
                        p: 3,
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'left', mb: 1 }}>
                            Introduction
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            textAlign: 'justify',
                            lineHeight: 1.7,
                            color: 'text.primary',
                            fontSize: '0.95rem'
                        }}>
                            {application.introduction || 'No introduction provided'}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );

    // Content for Interview Questions tab
    const renderInterviewQuestions = () => (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: 'black', mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                <QuestionAnswerIcon sx={{ color: 'green' }} />
                Interview Questions & Answers
            </Typography>
            <div style={{ maxHeight: '500px', overflowY: 'auto', width: '100%' }}>
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
    );

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    maxWidth: 1000,
                    width: '100%',
                    m: 2,
                    bgcolor: 'background.paper',
                    backgroundImage: 'linear-gradient(180deg, rgba(46, 125, 50, 0.03) 0%, rgba(255,255,255,0) 50%)',
                }}
            >
                <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            {/* <Typography variant="h4" sx={{ textAlign: 'left', color: 'primary.main' }}>
                                Application Details
                            </Typography> */}
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                            <Box sx={{ mt: { xs: 2, md: 0 } }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FileDownloadIcon />}
                                    onClick={handleDownload}
                                    sx={{
                                        px: 3,
                                        py: 1.2,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    Download CV
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Tab Navigation */}
                    <Box sx={{ 
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                        mb: 4,
                        mt: 3
                    }}>
                        <Tabs 
                            value={tabValue} 
                            onChange={handleTabChange} 
                            aria-label="application tabs"
                            variant="fullWidth"
                            sx={{
                                minHeight: 56,
                                '& .MuiTabs-flexContainer': {
                                    height: '100%'
                                },
                                '& .MuiTab-root': { 
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: 'text.primary',
                                    opacity: 0.7,
                                    py: 2,
                                    transition: 'all 0.2s ease',
                                },
                                '& .Mui-selected': { 
                                    color: 'primary.main',
                                    opacity: 1,
                                },
                                '& .MuiTabs-indicator': { 
                                    backgroundColor: 'primary.main',
                                    height: 3,
                                    borderRadius: '3px 3px 0 0'
                                }
                            }}
                        >
                            <Tab 
                                label="Application Details" 
                                icon={<DescriptionIcon />} 
                                iconPosition="start" 
                                {...a11yProps(0)} 
                                sx={{ borderRadius: '8px 0 0 8px' }}
                            />
                            <Tab 
                                label="Interview Questions" 
                                icon={<QuestionAnswerIcon />} 
                                iconPosition="start" 
                                {...a11yProps(1)} 
                                sx={{ borderRadius: '0 8px 8px 0' }}
                            />
                        </Tabs>
                    </Box>

                {/* Tab Panels */}
                <TabPanel value={tabValue} index={0} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                    {renderApplicationDetails()}
                </TabPanel>
                <TabPanel value={tabValue} index={1} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                    {renderInterviewQuestions()}
                </TabPanel>
            </CardContent>
        </Card>
        </ThemeProvider>
    );
}

export default CVCard;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     Card,
//     CardContent,
//     Button,
//     Typography,
//     Box,
//     CircularProgress,
//     Grid,
//     Paper,
//     Divider,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails
// } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import PersonIcon from '@mui/icons-material/Person';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import StarIcon from '@mui/icons-material/Star';
// import DescriptionIcon from '@mui/icons-material/Description';
// import WorkIcon from '@mui/icons-material/Work';
// import LanguageIcon from '@mui/icons-material/Language';
// import InfoIcon from '@mui/icons-material/Info';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function CVCard() {
//     const { applicationId } = useParams();
//     const [application, setApplication] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     useEffect(() => {
//         fetchApplicationData();
//         return () => {
//             if (previewUrl) {
//                 URL.revokeObjectURL(previewUrl);
//             }
//         };
//     }, [applicationId]);

//     const fetchApplicationData = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}applications/Aview/${applicationId}`);
//             setApplication(response.data);
//             if (response.data.filename) {
//                 fetchPreview(response.data.filename);
//             }
//             setLoading(false);
//         } catch (err) {
//             setError('Error fetching application data');
//             setLoading(false);
//             console.error('Error:', err);
//         }
//     };

//     const fetchPreview = async (filename) => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}applications/get-s3-cv-url/${filename}`);
//             setPreviewUrl(response.data.url);
//         } catch (err) {
//             console.error('Error fetching S3 preview URL:', err);
//         }
//     };

//     const handleDownload = async () => {
//         try {
//             if (!application?.filename) {
//                 throw new Error('No file available for download');
//             }

//             const response = await axios.get(`${API_BASE_URL}applications/get-s3-cv-url/${application.filename}`);
//             const url = response.data.url;

//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', application.filename);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (err) {
//             console.error('Error downloading file from S3:', err);
//             alert('Error downloading file: ' + (err.response?.data?.message || err.message));
//         }
//     };

//     if (loading) return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//             <CircularProgress sx={{ color: 'green' }} />
//         </Box>
//     );

//     if (error) return (
//         <Paper sx={{ p: 3, bgcolor: '#e8f5e9', color: 'green' }}>
//             {error}
//         </Paper>
//     );

//     if (!application) return (
//         <Paper sx={{ p: 3, bgcolor: '#e8f5e9', color: 'green' }}>
//             No application found
//         </Paper>
//     );

//     return (
//         <Card
//             sx={{
//                 maxWidth: 1000,
//                 width: '100%',
//                 boxShadow: 3,
//                 borderRadius: 2,
//                 border: '1px solid #e8f5e9',
//                 m: 2
//             }}
//         >
//             <CardContent>
//                 <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h4" sx={{ textAlign: 'left', color: 'green', fontWeight: 'bold' }}>
//                             Application Details
//                         </Typography>

//                     </Grid>
//                     <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
//                         <Box sx={{ mt: 2 }}>
//                             <Button
//                                 variant="contained"
//                                 startIcon={<FileDownloadIcon />}
//                                 onClick={handleDownload}
//                                 sx={{
//                                     bgcolor: 'green',
//                                     '&:hover': {
//                                         bgcolor: 'darkgreen',
//                                     }
//                                 }}
//                             >
//                                 Download CV
//                             </Button>
//                         </Box>
//                     </Grid>

//                 </Grid>

//                 <Grid container spacing={4}>
//                     {/* Left side - Application Info */}

//                     <Grid item xs={12} md={6}>
//                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
//                             {/* Basic Information Section */}
//                             <Box sx={{ mb: 3 }}>
//                                 <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
//                                     Basic Information
//                                 </Typography>
//                                 <Divider sx={{ mb: 2 }} />

//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <PersonIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Name:</strong> {application.name}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <EmailIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Email:</strong> {application.email ? (
//                                                 <a
//                                                     href={`mailto:${application.email}`}
//                                                     style={{ color: 'blue', textDecoration: 'underline' }}
//                                                 >
//                                                     {application.email}
//                                                 </a>
//                                             ) : (
//                                                 'N/A'
//                                             )}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <PhoneIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Tel No:</strong> {application.phoneNo ? (
//                                                 <a
//                                                     href={`tel:${application.phoneNo}`}
//                                                     style={{ color: 'blue', textDecoration: 'underline' }}
//                                                 >
//                                                     {application.phoneNo}
//                                                 </a>
//                                             ) : (
//                                                 'N/A'
//                                             )}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <WorkIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Job Title:</strong> {application.jobTitle || 'N/A'}
//                                         </Typography>
//                                     </Box>
//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <LanguageIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Portfolio:</strong> {application.portfolio ? (
//                                                 <a
//                                                     href={application.portfolio}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     style={{ color: 'blue', textDecoration: 'underline' }}
//                                                 >
//                                                     {application.portfolio}
//                                                 </a>
//                                             ) : (
//                                                 'N/A'
//                                             )}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                         <StarIcon sx={{ color: 'green' }} />
//                                         <Typography variant="body1">
//                                             <strong>Score:</strong> {application.cvScore !== undefined ? application.cvScore : 'N/A'}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>




//                         </Box>

//                     </Grid>



//                     {/* Right side - additional information */}
//                     <Grid item xs={12} md={6}>
//                         <Box sx={{ mb: 3 }}>
//                             <Typography variant="h6" sx={{ color: 'black', mb: 2, fontWeight: 'bold' }}>
//                                 Additional Information
//                             </Typography>
//                             <Divider sx={{ mb: 2 }} />

//                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//                                     <InfoIcon sx={{ color: 'green', mt: 0.5 }} />
//                                     <Box>
//                                         <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
//                                             Introduction
//                                         </Typography>
//                                         <Typography variant="body1" sx={{ textAlign: 'justify' }}>
//                                             {application.introduction || 'No introduction provided'}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Grid>
//                 </Grid>

//                 {/* Questions and Answers Section */}
//                 <Divider sx={{ my: 3 }} />

//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="h6" sx={{ color: 'black', mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
//                         <QuestionAnswerIcon sx={{ color: 'green' }} />
//                         Interview Questions & Answers
//                     </Typography>
//                     <div style={{ maxHeight: '400px', overflowY: 'auto' , padding: '0 16px',width: '100%'}}>
//                         {application.questions && application.questions.length > 0 ? (
//                             application.questions.map((question, index) => (
//                                 <Accordion key={index} sx={{ mb: 2, border: '1px solid #e8f5e9', borderRadius: 2, boxShadow: 1, width: '100%' }}>
//                                     <AccordionSummary
//                                         expandIcon={<ExpandMoreIcon sx={{ color: 'green' }} />}
//                                         sx={{ bgcolor: '#f5f5f5' }}
//                                     >
//                                         <Typography sx={{ fontWeight: 'bold', textAlign: 'justify' }}>
//                                             Question {index + 1}: {question}
//                                         </Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails sx={{ bgcolor: 'white', p: 2 }}>
//                                         <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: 'green', textAlign: 'left' }}>
//                                             Applicant's Answer:
//                                         </Typography>
//                                         <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
//                                             {application.answers && application.answers[index]
//                                                 ? application.answers[index]
//                                                 : 'No answer provided yet.'}
//                                         </Typography>
//                                     </AccordionDetails>
//                                 </Accordion>
//                             ))
//                         ) : (
//                             <Paper sx={{ p: 3, bgcolor: '#f5f5f5', color: 'gray' }}>
//                                 No interview questions available for this application.
//                             </Paper>
//                         )}
//                     </div>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }

// export default CVCard;