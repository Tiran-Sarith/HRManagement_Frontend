import React, { useState } from 'react';
import { 
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
  Typography,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Snackbar,
    Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddProject() {
  const navigate = useNavigate();
  
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
      error: {
        main: '#d32f2f',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4caf50',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2e7d32',
              },
            },
          },
        },
      },
    },
  });

  const [formData, setFormData] = useState({
    projectName: '',
    projectManager: '', // This will be used as client in the UI
    projectDeadline: '',
    projectBudget: '',
    projectDuration: '',
    projectCategory: '', // Technology field that will now be written in
    projectStatus: 'Pending', // Default status for new projects
    departmentID: '65c8acf641f64fa8ccd1dbda', // Replace with actual department ID
    projectDescription: 'New project', // Default description
    Number_of_members: 1 // Default number of members
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project Name is required';
    }
    if (!formData.projectManager.trim()) {
      newErrors.projectManager = 'Client is required';
    }
    if (!formData.projectDeadline) {
      newErrors.projectDeadline = 'Deadline is required';
    }
    if (!formData.projectBudget || formData.projectBudget <= 0) {
      newErrors.projectBudget = 'Valid budget is required';
    }
    if (!formData.projectDuration || formData.projectDuration <= 0) {
      newErrors.projectDuration = 'Valid duration is required';
    }
    if (!formData.projectCategory.trim()) {
      newErrors.projectCategory = 'Technology is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}projects/Padd`, formData);
      setSnackbar({
        open: true,
        message: 'Project added successfully!',
        severity: 'success'
      });
      // Navigate after a short delay to allow the user to see the success message
      setTimeout(() => {
        navigate('/projects');
      }, 2000);

      // alert('Project added successfully!');
      // navigate('/projects'); // Navigate back to projects page
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error adding project. Please try again.',
        severity: 'error'
      });

      console.error('Error adding project:', error);
      // alert('Error adding project. Please try again.');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({...snackbar, open: false});
  };

  const handleCancel = () => {
    // Navigate back to projects page without saving
    navigate('/projects');
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: '8px', 
              bgcolor: 'primary.main' 
            }} 
          />
          
          <Typography 
            variant="h5" 
            component="h1" 
            fontWeight="bold" 
            color="primary.dark" 
            sx={{ mb: 4, display: 'flex', alignItems: 'center' }}
          >
            <AddCircleIcon sx={{ mr: 1 }} /> 
            New Project
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="projectName"
                  label="Project Name"
                  variant="outlined"
                  value={formData.projectName}
                  onChange={handleChange}
                  error={!!errors.projectName}
                  helperText={errors.projectName}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="projectManager"
                  label="Client"
                  variant="outlined"
                  value={formData.projectManager}
                  onChange={handleChange}
                  error={!!errors.projectManager}
                  helperText={errors.projectManager}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="projectDeadline"
                  label="Deadline"
                  type="date"
                  variant="outlined"
                  value={formData.projectDeadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.projectDeadline}
                  helperText={errors.projectDeadline}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="projectBudget"
                  label="Estimated Budget"
                  type="number"
                  variant="outlined"
                  value={formData.projectBudget}
                  onChange={handleChange}
                  error={!!errors.projectBudget}
                  helperText={errors.projectBudget}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="projectDuration"
                  label="Estimated Duration (Weeks)"
                  type="number"
                  variant="outlined"
                  value={formData.projectDuration}
                  onChange={handleChange}
                  error={!!errors.projectDuration}
                  helperText={errors.projectDuration}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="projectCategory"
                  label="Technology"
                  variant="outlined"
                  placeholder="Enter technology stack (e.g. MERN, Spring Boot, Flutter)"
                  value={formData.projectCategory}
                  onChange={handleChange}
                  error={!!errors.projectCategory}
                  helperText={errors.projectCategory || "Specify the technology stack used for this project"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CodeIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                
              <Stack direction="row" spacing={2}>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleCancel}
                    sx={{ 
                      borderRadius: 2, 
                      px: 4, 
                      py: 1,
                      fontWeight: 'medium'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ 
                      borderRadius: 2, 
                      px: 4, 
                      py: 1,
                      fontWeight: 'medium',
                      boxShadow: 2
                    }}
                  >
                    Add Project
                  </Button>
                </Stack>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ 
                    borderRadius: 2, 
                    px: 4, 
                    py: 1,
                    fontWeight: 'medium',
                    boxShadow: 2
                  }}
                >
                  Add Project
                </Button> */}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default AddProject;




// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import { Button } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const technologies = [
//   {
//     value: 'MERN',
//     label: 'MERN Stack',
//   },
//   {
//     value: 'Spring Boot',
//     label: 'Spring Boot',
//   },
//   {
//     value: 'Flutter',
//     label: 'Flutter',
//   },
//   {
//     value: '.NET',
//     label: '.NET',
//   },
// ];

// function AddProject() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectManager: '', // This will be used as client in the UI
//     projectDeadline: '',
//     projectBudget: '',
//     projectDuration: '',
//     projectCategory: '', // This will be used as technology in the UI
//     projectStatus: 'Pending', // Default status for new projects
//     departmentID: '65c8acf641f64fa8ccd1dbda', // Replace with actual department ID
//     projectDescription: 'New project', // Default description
//     Number_of_members: 1 // Default number of members
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.projectName.trim()) {
//       newErrors.projectName = 'Project Name is required';
//     }
//     if (!formData.projectManager.trim()) {
//       newErrors.projectManager = 'Client is required';
//     }
//     if (!formData.projectDeadline) {
//       newErrors.projectDeadline = 'Deadline is required';
//     }
//     if (!formData.projectBudget || formData.projectBudget <= 0) {
//       newErrors.projectBudget = 'Valid budget is required';
//     }
//     if (!formData.projectDuration || formData.projectDuration <= 0) {
//       newErrors.projectDuration = 'Valid duration is required';
//     }
//     if (!formData.projectCategory) {
//       newErrors.projectCategory = 'Technology is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
    
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE_URL}projects/Padd`, formData);
//       alert('Project added successfully!');
//       navigate('/projects'); // Navigate back to projects page
//     } catch (error) {
//       console.error('Error adding project:', error);
//       alert('Error adding project. Please try again.');
//     }
//   };

//   return (
//     <div className='mb-[400px] w-[800px] border-2 border-gray-200 rounded-xl p-5'>
//       <form onSubmit={handleSubmit}>
//         <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background: 'white' } }}>
//           <div>
//             <TextField
//               required
//               name="projectName"
//               label="Project Name"
//               value={formData.projectName}
//               onChange={handleChange}
//               error={!!errors.projectName}
//               helperText={errors.projectName}
//             />
//           </div>
//         </Box>

//         <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background: 'white' } }}>
//           <div>
//             <TextField
//               required
//               name="projectManager"
//               label="Client"
//               value={formData.projectManager}
//               onChange={handleChange}
//               error={!!errors.projectManager}
//               helperText={errors.projectManager}
//             />
//             <TextField
//               required
//               name="projectDeadline"
//               label="Deadline"
//               type="date"
//               value={formData.projectDeadline}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.projectDeadline}
//               helperText={errors.projectDeadline}
//             />
//           </div>
//         </Box>

//         <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background: 'white' } }}>
//           <div>
//             <TextField
//               required
//               name="projectBudget"
//               label="Estimated Budget($)"
//               type="number"
//               value={formData.projectBudget}
//               onChange={handleChange}
//               error={!!errors.projectBudget}
//               helperText={errors.projectBudget}
//             />
//             <TextField
//               required
//               name="projectDuration"
//               label="Estimated Duration(Weeks)"
//               type="number"
//               value={formData.projectDuration}
//               onChange={handleChange}
//               error={!!errors.projectDuration}
//               helperText={errors.projectDuration}
//             />
//           </div>
//         </Box>

//         <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background: 'white' } }}>
//           <div>
//             <TextField
//               required
//               name="projectCategory"
//               select
//               label="Technology"
//               value={formData.projectCategory}
//               onChange={handleChange}
//               error={!!errors.projectCategory}
//               helperText={errors.projectCategory}
//             >
//               {technologies.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </div>
//         </Box>

//         <Button 
//           type="submit"
//           variant="contained" 
//           color="success" 
//           sx={{marginLeft: 45, marginTop: 10}}
//         >
//           Add Project
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default AddProject;
