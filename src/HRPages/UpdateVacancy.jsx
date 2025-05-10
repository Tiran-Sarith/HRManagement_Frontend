import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert
} from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });

export default function UpdateVacancies() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [vacancyId, setVacancyId] = useState(null);

    const [formData, setFormData] = useState({
        jobTitle: '',
        jobCategory: '',
        hireType: '',
        jobID: '',
        deadline: '',
        designation: '',
        department: '',
        postedDate: '',
        jobDescription: ''
    });

    // Cancel confirmation dialog state
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    
    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        // Get vacancy data from localStorage
        const vacancyData = JSON.parse(localStorage.getItem('vacancyToUpdate'));
        if (vacancyData) {
            setFormData({
                jobTitle: vacancyData.jobTitle || '',
                jobCategory: vacancyData.jobCategory || '',
                hireType: vacancyData.hireType || '',
                jobID: vacancyData.jobID || '',
                deadline: vacancyData.deadline || '',
                designation: vacancyData.designation || '',
                department: vacancyData.department || '',
                postedDate: vacancyData.postedDate || '',
                jobDescription: vacancyData.jobDescription || ''
            });
            setVacancyId(vacancyData._id);
        } else {
            // If no data found, show error and navigate back
            showSnackbar('No vacancy data found to update', 'error');
            setTimeout(() => navigate('/vacancies'), 1500);
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!vacancyId) {
            showSnackbar('Invalid vacancy data', 'error');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`${API_BASE_URL}vacancies/Vupdate/${vacancyId}`, formData);
            showSnackbar('Vacancy Updated Successfully', 'success');
            
            // Clean up and navigate after delay to show the success message
            setTimeout(() => {
                localStorage.removeItem('vacancyToUpdate');
                navigate('/vacancies');
            }, 1500);
        } catch (err) {
            showSnackbar('Error updating vacancy: ' + (err.response?.data?.message || err.message), 'error');
            setLoading(false);
        }
    };

    // Open cancel confirmation dialog
    const handleCancelClick = () => {
        setCancelDialogOpen(true);
    };

    // Close cancel confirmation dialog
    const handleCloseCancelDialog = () => {
        setCancelDialogOpen(false);
    };

    // Confirm cancel action
    const handleConfirmCancel = () => {
        localStorage.removeItem('vacancyToUpdate');
        navigate('/vacancies');
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

    return (
        <div className='w-[847px]'>
            <h2 className='text-2xl font-semibold mb-4 text-center text-green-700'>Update Vacancy</h2>
            
            <form onSubmit={handleSubmit}>
                <div className='w-[560px]'>
                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[560px]' 
                                    label="Job Title" 
                                    variant="filled" 
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Category" 
                                    variant="filled" 
                                    name="jobCategory"
                                    value={formData.jobCategory}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Hire Type" 
                                    variant="filled" 
                                    name="hireType"
                                    value={formData.hireType}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Job ID" 
                                    variant="filled" 
                                    name="jobID"
                                    value={formData.jobID}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Deadline" 
                                    variant="filled" 
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[560px]' 
                                    label="Designation" 
                                    variant="filled" 
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Department" 
                                    variant="filled" 
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Posted Date" 
                                    variant="filled" 
                                    name="postedDate"
                                    value={formData.postedDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-10'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '847px' } }} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="filled-multiline-static"
                                    label="Job Description"
                                    name="jobDescription"
                                    value={formData.jobDescription}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    className='w-[854px]'
                                    required
                                />
                            </div>
                        </Box>
                    </div>

                    <div className='flex justify-start gap-36 ml-16'>
                        <div>
                            <p>Upload a photo</p>
                        </div>

                        <div className=''>
                            <Stack spacing={2} direction="row">
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Update"}
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancelClick}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </form>
            
            {/* Cancel Confirmation Dialog */}
            <Dialog
                open={cancelDialogOpen}
                onClose={handleCloseCancelDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: "#ff9800" }}>
                    <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Confirm Cancel
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel editing this vacancy? All changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: "16px" }}>
                    <Button 
                        onClick={handleCloseCancelDialog} 
                        color="primary"
                        variant="outlined"
                    >
                        Continue Editing
                    </Button>
                    <Button 
                        onClick={handleConfirmCancel} 
                        color="warning" 
                        variant="contained" 
                        autoFocus
                    >
                        Discard Changes
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
        </div>
    );
}




// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const customTheme = (outerTheme) =>
//     createTheme({
//         palette: {
//             mode: outerTheme.palette.mode,
//         },
//         components: {
//             MuiTextField: {
//                 styleOverrides: {
//                     root: {
//                         '--TextField-brandBorderColor': '#E0E3E7',
//                         '--TextField-brandBorderHoverColor': '#B2BAC2',
//                         '--TextField-brandBorderFocusedColor': '#6F7E8C',
//                         '& label.Mui-focused': {
//                             color: 'var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//             MuiFilledInput: {
//                 styleOverrides: {
//                     root: {
//                         '&::before, &::after': {
//                             borderBottom: '2px solid var(--TextField-brandBorderColor)',
//                         },
//                         '&:hover:not(.Mui-disabled, .Mui-error):before': {
//                             borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//                         },
//                         '&.Mui-focused:after': {
//                             borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//         },
//     });

// export default function UpdateVacancies() {
//     const outerTheme = useTheme();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         jobTitle: '',
//         jobCategory: '',
//         hireType: '',
//         jobID: '',
//         deadline: '',
//         designation: '',
//         department: '',
//         postedDate: '',
//         jobDescription: ''
//     });

//     useEffect(() => {
//         // Get vacancy data from localStorage
//         const vacancyData = JSON.parse(localStorage.getItem('vacancyToUpdate'));
//         if (vacancyData) {
//             setFormData({
//                 jobTitle: vacancyData.jobTitle || '',
//                 jobCategory: vacancyData.jobCategory || '',
//                 hireType: vacancyData.hireType || '',
//                 jobID: vacancyData.jobID || '',
//                 deadline: vacancyData.deadline || '',
//                 designation: vacancyData.designation || '',
//                 department: vacancyData.department || '',
//                 postedDate: vacancyData.postedDate || '',
//                 jobDescription: vacancyData.jobDescription || ''
//             });
//         }
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const vacancyId = JSON.parse(localStorage.getItem('vacancyToUpdate'))._id;
//             await axios.put(`${API_BASE_URL}vacancies/Vupdate/${vacancyId}`, formData);
//             alert('Vacancy Updated Successfully');
//             localStorage.removeItem('vacancyToUpdate'); // Clean up
//             navigate('/vacancies'); // Navigate back to vacancies list
//         } catch (err) {
//             alert('Error updating vacancy: ' + err.message);
//         }
//     };

//     const handleCancel = () => {
//         localStorage.removeItem('vacancyToUpdate');
//         navigate('/vacancies');
//     };

//     return (
//         <div className='w-[847px]'>
//             <form onSubmit={handleSubmit}>
//                 <div className='w-[560px]'>
//                     <div className='mb-4 flex justify-start ml-12'>
//                         <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[560px]' 
//                                     label="Job Title" 
//                                     variant="filled" 
//                                     name="jobTitle"
//                                     value={formData.jobTitle}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                         </Box>
//                     </div>

//                     <div className='mb-4 flex justify-start ml-12'>
//                         <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Category" 
//                                     variant="filled" 
//                                     name="jobCategory"
//                                     value={formData.jobCategory}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Hire Type" 
//                                     variant="filled" 
//                                     name="hireType"
//                                     value={formData.hireType}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                         </Box>
//                     </div>

//                     <div className='mb-4 flex justify-start ml-12'>
//                         <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Job ID" 
//                                     variant="filled" 
//                                     name="jobID"
//                                     value={formData.jobID}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Deadline" 
//                                     variant="filled" 
//                                     name="deadline"
//                                     value={formData.deadline}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                         </Box>
//                     </div>

//                     <div className='mb-4 flex justify-start ml-12'>
//                         <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[560px]' 
//                                     label="Designation" 
//                                     variant="filled" 
//                                     name="designation"
//                                     value={formData.designation}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                         </Box>
//                     </div>

//                     <div className='mb-4 flex justify-start ml-12'>
//                         <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Department" 
//                                     variant="filled" 
//                                     name="department"
//                                     value={formData.department}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                             <ThemeProvider theme={customTheme(outerTheme)}>
//                                 <TextField 
//                                     className='w-[272px]' 
//                                     label="Posted Date" 
//                                     variant="filled" 
//                                     name="postedDate"
//                                     value={formData.postedDate}
//                                     onChange={handleInputChange}
//                                 />
//                             </ThemeProvider>
//                         </Box>
//                     </div>

//                     <div className='mb-4 flex justify-start ml-10'>
//                         <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '847px' } }} noValidate autoComplete="off">
//                             <div>
//                                 <TextField
//                                     id="filled-multiline-static"
//                                     label="Job Description"
//                                     name="jobDescription"
//                                     value={formData.jobDescription}
//                                     onChange={handleInputChange}
//                                     multiline
//                                     rows={4}
//                                     variant="filled"
//                                     className='w-[854px]'
//                                 />
//                             </div>
//                         </Box>
//                     </div>

//                     <div className='flex justify-start gap-36 ml-16'>
//                         <div>
//                             <p>Upload a photo</p>
//                         </div>

//                         <div className=''>
//                             <Stack spacing={2} direction="row">
//                                 <Button type="submit" variant="contained" color="success">Update</Button>
//                                 <Button variant="outlined" color="success" onClick={handleCancel}>Cancel</Button>
//                             </Stack>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
