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


import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  Button, 
  Stack, 
  Typography, 
  Container, 
  createTheme, 
  ThemeProvider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const technologies = [
  { value: 'MERN', label: 'MERN Stack' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'Flutter', label: 'Flutter' },
  { value: '.NET', label: '.NET' },
];

// Green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Dark green
    },
    success: {
      main: '#4CAF50', // Lighter green
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: 4,
        }
      }
    }
  }
});

function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    projectManager: '',
    projectDeadline: '',
    projectBudget: '',
    projectDuration: '',
    projectCategory: '',
    projectStatus: 'Pending',
    departmentID: '65c8acf641f64fa8ccd1dbda',
    projectDescription: 'New project',
    Number_of_members: 1
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.projectCategory) {
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
      alert('Project added successfully!');
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/projects');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2} 
          sx={{ 
            mb: 3, 
            mt: 4 
          }}
        >
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
          >
            Back to Projects
          </Button>
          <Typography variant="h4">Add New Project</Typography>
        </Stack>

        <Box 
          sx={{ 
            border: 1, 
            borderColor: 'grey.300', 
            borderRadius: 2, 
            p: 4, 
            bgcolor: 'background.paper' 
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                name="projectName"
                label="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                error={!!errors.projectName}
                helperText={errors.projectName}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  required
                  name="projectManager"
                  label="Client"
                  value={formData.projectManager}
                  onChange={handleChange}
                  error={!!errors.projectManager}
                  helperText={errors.projectManager}
                />
                <TextField
                  fullWidth
                  required
                  name="projectDeadline"
                  label="Deadline"
                  type="date"
                  value={formData.projectDeadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.projectDeadline}
                  helperText={errors.projectDeadline}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  required
                  name="projectBudget"
                  label="Estimated Budget($)"
                  type="number"
                  value={formData.projectBudget}
                  onChange={handleChange}
                  error={!!errors.projectBudget}
                  helperText={errors.projectBudget}
                />
                <TextField
                  fullWidth
                  required
                  name="projectDuration"
                  label="Estimated Duration(Weeks)"
                  type="number"
                  value={formData.projectDuration}
                  onChange={handleChange}
                  error={!!errors.projectDuration}
                  helperText={errors.projectDuration}
                />
              </Stack>

              <TextField
                fullWidth
                required
                name="projectCategory"
                select
                label="Technology"
                value={formData.projectCategory}
                onChange={handleChange}
                error={!!errors.projectCategory}
                helperText={errors.projectCategory}
              >
                {technologies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="success"
                  size="large"
                >
                  Add Project
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddProject;