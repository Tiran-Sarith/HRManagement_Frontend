
import  { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Box,
  Tabs,
  Tab,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';
import ProjectsPending from '../Components/ProjectsPending';
import InprogressProjects from '../Components/InprogressProjects';
import FinishedProjects from '../Components/FinishedProjects';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `project-tab-${index}`,
    'aria-controls': `project-tabpanel-${index}`,
  };
}

function Projects() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const defaultTheme = useTheme();
  const isMobile = useMediaQuery(defaultTheme.breakpoints.down('md'));
  
  // Create green theme
  const greenTheme = createTheme({
    palette: {
      primary: {
        main: '#2e7d32', // green[800]
        light: '#4caf50', // green[500]
        dark: '#1b5e20', // green[900]
        contrastText: '#fff',
      },
      secondary: {
        main: '#81c784', // green[300]
      },
      background: {
        default: '#f1f8e9', // light green background
        paper: '#ffffff',
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewProject = () => {
    navigate("/addProject");
  };

  const tabItems = [
    { label: "Pending Projects", component: <ProjectsPending /> },
    { label: "In Progress Projects", component: <InprogressProjects /> },
    { label: "Completed Projects", component: <FinishedProjects /> }
  ];

  return (
    <ThemeProvider theme={greenTheme}>
    <Container maxWidth="xl" sx={{ py: 4 }}>
    
        <Box sx={{ 
          p: 3, 
          pb: 0, 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          borderBottom: '1px solid',
          // borderColor: 'primary.light',
          opacity: 0.9,
          // bgcolor: 'primary.light',
          color: 'primary.contrastText'
        }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<AddIcon />} 
            onClick={handleNewProject}
            sx={{ 
              borderRadius: 2,
              px: 3,
              fontWeight: 'medium',
              boxShadow: 2,
              bgcolor: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.main',
              }
            }}
          >
            New Project
          </Button>
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'primary.light' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="project tabs"
              variant={isMobile ? "fullWidth" : "standard"}
              centered={!isMobile}
              textColor="primary"
              indicatorColor="primary"
              sx={{ 
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  bgcolor: 'primary.main'
                },
                '& .MuiTab-root': {
                  fontSize: '18px',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  minWidth: 120,
                  px: 4,
                  color: 'primary.dark'
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 'bold'
                }
              }}
            >
              {tabItems.map((item, index) => (
                <Tab key={index} label={item.label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          
          {tabItems.map((item, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              {item.component}
            </CustomTabPanel>
          ))}
        </Box>
    </Container>
    </ThemeProvider>
  );
}

export default Projects;
