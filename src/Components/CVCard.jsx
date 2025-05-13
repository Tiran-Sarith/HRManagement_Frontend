
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
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
        },
      },
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
  },
});

// TabPanel component for tab content display
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
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
      console.error('Error downloading file:', err);
      alert('Error downloading file: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  );

  if (error) return (
    <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.primary.light, 0.1), color: 'primary.main', maxWidth: 800, mx: 'auto', mt: 4 }}>
      {error}
    </Paper>
  );

  if (!application) return (
    <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.primary.light, 0.1), color: 'primary.main', maxWidth: 800, mx: 'auto', mt: 4 }}>
      No application found
    </Paper>
  );

  // Content for Application Details tab
  const renderApplicationDetails = () => (
    <Grid container spacing={3}>
      {/* Left side - Basic Information */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" />
            Applicant Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left'}}>Name:</Typography>
              <Typography variant="body1"sx={{textAlign: 'left'}} >{application.name || 'N/A'}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left'}}>Email:</Typography>
              <Typography variant="body1" sx={{textAlign: 'left'}}>
                {application.email ? (
                  <a href={`mailto:${application.email}`} style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                    {application.email}
                  </a>
                ) : 'N/A'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left' }}>Phone:</Typography>
              <Typography variant="body1" sx={{textAlign: 'left'}}>
                {application.phoneNo ? (
                  <a href={`tel:${application.phoneNo}`} style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                    {application.phoneNo}
                  </a>
                ) : 'N/A'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left' }}>Position:</Typography>
              <Typography variant="body1" sx={{textAlign: 'left'}} >{application.jobTitle || 'N/A'}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left'}}>Portfolio:</Typography>
              <Typography variant="body1" sx={{ wordBreak: 'break-word',textAlign: 'right' }}>
                {application.portfolio ? (
                  <a 
                    href={application.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
                  >
                    {application.portfolio}
                  </a>
                ) : 'N/A'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, width: 100 ,textAlign: 'left' }}>CV Score:</Typography>
              <Typography variant="body1">
                {application.cvScore !== undefined ? (
                  <Box component="span" sx={{
                    py: 0.3,
                    px: 1.5,
                    borderRadius: 10,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                    {application.cvScore}
                  </Box>
                ) : 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Right side - Additional Information */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon fontSize="small" />
            Introduction
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" sx={{
            lineHeight: 1.7,
            color: 'text.primary',
            bgcolor: alpha(theme.palette.primary.light, 0.05),
            p: 2,
            borderRadius: 2,
            textAlign: 'justify',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
            height: 'calc(100% - 60px)',
            overflowY: 'auto'
          }}>
            {application.introduction || 'No introduction provided'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  // Content for Interview Questions tab
  const renderInterviewQuestions = () => (
    <Box sx={{ mt: 2 , width: '100%' }}>
      {application.questions && application.questions.length > 0 ? (
        application.questions.map((question, index) => (
          <Accordion 
            key={index} 
            sx={{ 
              mb: 2, 
              textAlign: 'justify',
              width: '100%',
              borderRadius: '6px !important',
              overflow: 'hidden',
              boxShadow: 'none',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&.Mui-expanded': {
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}
            >
              <Typography sx={{ fontWeight: 600, color: 'primary.dark', textAlign: 'left' }}>
                Question {index + 1}: {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main',textAlign: 'left' }}>
                Applicant's Answer:
              </Typography>
              <Typography variant="body1" sx={{ 
                whiteSpace: 'pre-line', 
                p: 2,
                textAlign: 'justify',
                bgcolor: alpha(theme.palette.primary.light, 0.05),
                borderRadius: 1,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
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
          textAlign: 'center',
          bgcolor: alpha(theme.palette.primary.light, 0.05),
          color: 'text.secondary', 
          borderRadius: 2,
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`
        }}>
          <QuestionAnswerIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.4), mb: 2 }} />
          <Typography>
            No interview questions available for this application.
          </Typography>
        </Paper>
      )}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ 
        width: '100%',
        padding: 2,
        margin: '24px auto',
        overflow: 'visible',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Typography variant="h4" sx={{ color: 'primary.main' }}>
              Application Details
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleDownload}
              sx={{ 
                px: 3,
                py: 1.2,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              Download CV
            </Button>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              aria-label="application tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: 3
                }
              }}
            >
              <Tab 
                label="Application Details" 
                icon={<DescriptionIcon fontSize="small" />} 
                iconPosition="start" 
                {...a11yProps(0)} 
                sx={{ mr: 2 }} 
              />
              <Tab 
                label="Interview Questions" 
                icon={<QuestionAnswerIcon fontSize="small" />} 
                iconPosition="start" 
                {...a11yProps(1)} 
              />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            {renderApplicationDetails()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderInterviewQuestions()}
          </TabPanel>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default CVCard;