import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert
} from '@mui/material';

// Update this to match your server configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8070/api/';

// Modern theme with green accents and white base
const customTheme = (outerTheme) =>
    createTheme({
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h5: {
                fontWeight: 600,
                fontSize: '1.5rem',
                color: '#2e7d32',
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 500,
                color: '#4caf50',
            },
        },
        palette: {
            mode: outerTheme.palette.mode,
            primary: {
                main: "#2e7d32", // Green for primary
                dark: "#1b5e20",
                light: "#4caf50",
                contrastText: '#ffffff',
            },
            success: {
                main: '#4caf50',
                dark: '#2e7d32',
            },
            background: {
                default: '#f9f9f9',
                paper: '#ffffff',
            },
            text: {
                primary: '#333333',
                secondary: '#666666',
            },
            divider: 'rgba(0, 0, 0, 0.08)',
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                        borderRadius: 12,
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        margin: '24px 0',
                    },
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        paddingTop: 24,
                        paddingBottom: 24,
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#81c784',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: "#2e7d32",
                            borderWidth: 2,
                        },
                    },
                    notchedOutline: {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        marginBottom: 16,
                        '& label.Mui-focused': {
                            color: "#2e7d32",
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '10px 24px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                    },
                    containedPrimary: {
                        backgroundColor: "#2e7d32",
                        '&:hover': {
                            backgroundColor: '#2e7d32',
                        },
                    },
                    outlinedPrimary: {
                        borderColor: '#4caf50',
                        color: "#2e7d32",
                        '&:hover': {
                            borderColor: '#2e7d32',
                            backgroundColor: 'rgba(76, 175, 80, 0.04)',
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(76, 175, 80, 0.08)',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: 'rgba(76, 175, 80, 0.12)',
                        },
                    },
                },
            },
        },
    });

const Designation = [
    { value: 'Head of Department', label: 'HOD' },
    { value: 'Senior Manager', label: 'Senior Manager' },
    { value: 'Senior Engineer', label: 'Senior Engineer' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Assistant Engineer', label: 'Assistant Engineer' },
    { value: 'Trainee Engineer', label: 'Trainee Engineer' },
];

const Department = [
    { value: 'Networking', label: 'Networking' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Cyber Security', label: 'Cyber Security' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Quality Assurance', label: 'QA' },
    { value: 'UI/UX Design', label: 'UI/UX' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Machine Learning/AI', label: 'Machine Learning/AI' },
    { value: 'Human Resources', label: 'Human Resources' },
];

function UpdateEmployee() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    // Employee state variables
    const [formData, setFormData] = useState({
        employee_full_name: '',
        employee_name_with_initials: '',
        employee_first_name: '',
        employee_last_name: '',
        employee_Age: '',
        employee_telephone: '',
        employee_nic: '',
        employeeEPF: '',
        employee_address: '',
        employee_email: '', // Private email
        employee_Company_Email: '', // Company email
        employee_designation: '',
        employee_department: '',
        employee_id: '',
        employee_HiredDate: dayjs(),
        employee_current_project_id: '',
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
        // Get employee data from localStorage
        const employeeData = JSON.parse(localStorage.getItem('employeeToUpdate'));
        if (employeeData) {
            console.log("Employee data from localStorage:", employeeData);
            
            // Handle different possible field name formats in the stored data
            // This provides fallbacks for different naming conventions
            setFormData({
                employee_full_name: employeeData.employee_full_name || '',
                employee_name_with_initials: employeeData.employee_name_with_initials || '',
                employee_first_name: employeeData.employee_first_name || '',
                employee_last_name: employeeData.employee_last_name || '',
                // Try all possible Age field name variations
                employee_Age: employeeData.employee_Age || employeeData.employee_age || '',
                employee_telephone: employeeData.employee_telephone || '',
                employee_nic: employeeData.employee_nic || '',
                // Try all possible EPF field name variations
                employeeEPF: employeeData.employeeEPF || employeeData.employee_epf || employeeData.employee_EPF || '',
                employee_address: employeeData.employee_address || '',
                // Private email
                employee_email: employeeData.employee_email || employeeData.employee_private_email || '',
                // Company email - try all possible variations
                employee_Company_Email: employeeData.employee_Company_Email || 
                                       employeeData.employee_company_email || 
                                       employeeData.employee_Company_email ||
                                       employeeData.Company_Email || '',
                employee_designation: employeeData.employee_designation || '',
                employee_department: employeeData.employee_department || '',
                employee_id: employeeData.employee_id || '',
                // Try all possible date field variations
                employee_HiredDate: employeeData.employee_HiredDate ? 
                                   dayjs(employeeData.employee_HiredDate) : 
                                   (employeeData.employee_hired_date ? 
                                   dayjs(employeeData.employee_hired_date) :
                                   (employeeData.hired_date ?
                                   dayjs(employeeData.hired_date) : dayjs())),
                employee_current_project_id: employeeData.employee_current_project_id || '',
            });
            setEmployeeId(employeeData._id);
            
            // Debug logging to help identify field issues
            console.log("Set form data:", {
                "Age field (employee_Age)": employeeData.employee_Age,
                "Age field (employee_age)": employeeData.employee_age,
                "EPF field (employeeEPF)": employeeData.employeeEPF,
                "EPF field (employee_epf)": employeeData.employee_epf,
                "EPF field (employee_EPF)": employeeData.employee_EPF,
                "Company Email (employee_Company_Email)": employeeData.employee_Company_Email,
                "Company Email (employee_company_email)": employeeData.employee_company_email
            });
        } else {
            // If no data found, show error and navigate back
            showSnackbar('No employee data found to update', 'error');
            setTimeout(() => navigate('/employee'), 1500);
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (newValue) => {
        setFormData(prevState => ({
            ...prevState,
            employee_HiredDate: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!employeeId) {
            showSnackbar('Invalid employee data', 'error');
            return;
        }

        setLoading(true);
        
        try {
            // Prepare the updated employee data
            const updatedEmployeeData = {
                employee_full_name: formData.employee_full_name,
                employee_name_with_initials: formData.employee_name_with_initials,
                employee_first_name: formData.employee_first_name,
                employee_last_name: formData.employee_last_name,
                employee_id: formData.employee_id,
                employee_email: formData.employee_email, // Private email
                employee_nic: formData.employee_nic,
                employee_telephone: formData.employee_telephone,
                employee_address: formData.employee_address,
                employee_designation: formData.employee_designation,
                employee_department: formData.employee_department,
                employee_current_project_id: formData.employee_current_project_id,
                employee_Age: formData.employee_Age,
                employeeEPF: formData.employeeEPF,
                employee_HiredDate: formData.employee_HiredDate.format('YYYY-MM-DD'),
                employee_Company_Email: formData.employee_Company_Email
            };

            console.log('Sending updated data:', updatedEmployeeData);
            
            const response = await axios.put(`${API_BASE_URL}employee/Eupdate/${employeeId}`, updatedEmployeeData);
            console.log('Server response:', response.data);
            
            showSnackbar('Employee Updated Successfully', 'success');
            
            // Clean up and navigate after delay to show the success message
            setTimeout(() => {
                localStorage.removeItem('employeeToUpdate');
                navigate('/employee');
            }, 2000);
        } catch (err) {
            console.error('Error details:', err.response?.data || err.message);
            showSnackbar(
                "Error Updating Employee: " +
                (err.response?.data?.message || err.message),
                "error"
            );
            setLoading(false);
        }
    };

    // Handle navigation back
    const handleNavigation = () => {
        navigate('/employee');
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
        localStorage.removeItem('employeeToUpdate');
        setCancelDialogOpen(false);
        navigate('/employee');
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
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={handleNavigation}>
                    <IconButton size="small" sx={{ p: 0, pr: 1, color: 'primary.main' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'primary.main' }}>
                        Back to Employees
                    </Typography>
                </Box>
                
                <Paper elevation={3} sx={{ 
                    padding: 4, 
                    mb: 4,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "primary.light",
                    position: "relative",
                    overflow: "hidden" 
                }}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "8px",
                            bgcolor: "primary.main",
                        }}
                    />
                    <Typography variant="h5" sx={{color:'primary.dark'}} className='text-left' gutterBottom>
                        <EditIcon sx={{ mr: 1 }} />
                        Update Employee Details
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }} className='text-left font-semibold'>
                        Edit employee information below
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Personal Information Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" fontSize={18} align='left' fontWeight={700} color="text.primary">
                                    Personal Information
                                </Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    required
                                    name="employee_full_name"
                                    value={formData.employee_full_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name with Initials"
                                    variant="outlined"
                                    required
                                    name="employee_name_with_initials"
                                    value={formData.employee_name_with_initials}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    name="employee_first_name"
                                    value={formData.employee_first_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    name="employee_last_name"
                                    value={formData.employee_last_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    variant="outlined"
                                    type="number"
                                    name="employee_Age"
                                    value={formData.employee_Age}
                                    onChange={handleInputChange}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Telephone"
                                    variant="outlined"
                                    required
                                    name="employee_telephone"
                                    value={formData.employee_telephone}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="NIC"
                                    variant="outlined"
                                    required
                                    name="employee_nic"
                                    value={formData.employee_nic}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="EPF Number"
                                    variant="outlined"
                                    name="employeeEPF"
                                    value={formData.employeeEPF}
                                    onChange={handleInputChange}
                                />
                            </Grid> */}

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    required
                                    name="employee_address"
                                    value={formData.employee_address}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Private Email"
                                    variant="outlined"
                                    type="email"
                                    name="employee_email"
                                    value={formData.employee_email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* Company Information Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" fontSize={18} align='left' fontWeight={700} color="text.primary">
                                    Company Information
                                </Typography>
                                <Divider />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Email"
                                    variant="outlined"
                                    required
                                    name="employee_Company_Email"
                                    value={formData.employee_Company_Email}
                                    onChange={handleInputChange}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    sx={{ textAlign: 'left' }}
                                    select
                                    label="Designation"
                                    variant="outlined"
                                    required
                                    name="employee_designation"
                                    value={formData.employee_designation}
                                    onChange={handleInputChange}
                                >
                                    {Designation.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Department"
                                    sx={{ textAlign: 'left' }}
                                    variant="outlined"
                                    required
                                    name="employee_department"
                                    value={formData.employee_department}
                                    onChange={handleInputChange}
                                >
                                    {Department.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Employee ID"
                                    variant="outlined"
                                    required
                                    name="employee_id"
                                    value={formData.employee_id}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ padding: '0 1 0 0' }}>
                                        <DatePicker
                                            label="Hired Date"
                                            value={formData.employee_HiredDate}
                                            onChange={handleDateChange}
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Current Project ID"
                                    variant="outlined"
                                    name="employee_current_project_id"
                                    value={formData.employee_current_project_id}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {/* Form Actions */}
                            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    onClick={handleCancelClick} 
                                    disabled={loading}
                                    startIcon={<CancelIcon />}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
                                >
                                    {loading ? "Updating..." : "Update Employee"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Cancel Confirmation Dialog */}
                <Dialog
                    open={cancelDialogOpen}
                    onClose={handleCloseCancelDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{ color: "#ff9800" }}>
                        <InfoIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Confirm Cancel
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to cancel editing this employee? All changes
                            will be lost.
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        variant="filled"
                        elevation={6}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default UpdateEmployee;