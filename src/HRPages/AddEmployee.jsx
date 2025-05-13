import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    IconButton
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

function AddEmployee() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Employee state variables
    const [employeeFullName, setEmployeeFullName] = useState('');
    const [employeeNameWithInitials, setEmployeeNameWithInitials] = useState('');
    const [employeeFirstName, setEmployeeFirstName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [employeeAge, setEmployeeAge] = useState('');
    const [employeeTelephone, setEmployeeTelephone] = useState('');
    const [employeeNIC, setEmployeeNIC] = useState('');
    const [employeeEPF, setEmployeeEPF] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [employeePrivateEmail, setEmployeePrivateEmail] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeDesignation, setEmployeeDesignation] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [hiredDate, setHiredDate] = useState(dayjs());

    // Cancel confirmation dialog state
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const submitEmployee = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newEmployee = {
            employee_full_name: employeeFullName,
            employee_name_with_initials: employeeNameWithInitials,
            employee_first_name: employeeFirstName,
            employee_last_name: employeeLastName,
            employee_id: employeeID,
            employee_email: employeeEmail,
            employee_nic: employeeNIC,
            employee_telephone: employeeTelephone,
            employee_address: employeeAddress,
            employee_designation: employeeDesignation,
            employee_department: employeeDepartment,
            employee_current_project_id: "", // Empty by default for new employees
        };

        try {
            await axios.post(`${API_BASE_URL}employee/Eadd`, newEmployee);
            showSnackbar('Employee Added Successfully', 'success');
            
            setTimeout(() => {
                resetForm();
                navigate('/employee');
            }, 2000);
        } catch (err) {
            showSnackbar(
                "Error Adding Employee: " +
                (err.response?.data?.message || err.message),
                "error"
            );
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEmployeeFullName('');
        setEmployeeNameWithInitials('');
        setEmployeeFirstName('');
        setEmployeeLastName('');
        setEmployeeAge('');
        setEmployeeTelephone('');
        setEmployeeNIC('');
        setEmployeeEPF('');
        setEmployeeAddress('');
        setEmployeePrivateEmail('');
        setEmployeeEmail('');
        setEmployeeDesignation('');
        setEmployeeDepartment('');
        setEmployeeID('');
        setHiredDate(dayjs());
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
        resetForm();
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
                {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={handleNavigation}>
                    <IconButton size="small" sx={{ p: 0, pr: 1, color: 'primary.main' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'primary.main' }}>
                        Go Back
                    </Typography>
                </Box> */}
                
                <Paper elevation={3} sx={{ padding: 4, mb: 4,p: 4,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.light",
            position: "relative",
            overflow: "hidden", }}>
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
                        <AddCircleIcon sx={{ mr: 1 }} />
                        Add New Employee
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }} className='text-left font-semibold'>
                        Complete the form below to add a new employee to the system
                    </Typography>

                    <form onSubmit={submitEmployee}>
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
                                    value={employeeFullName}
                                    onChange={(e) => setEmployeeFullName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name with Initials"
                                    variant="outlined"
                                    required
                                    value={employeeNameWithInitials}
                                    onChange={(e) => setEmployeeNameWithInitials(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    value={employeeFirstName}
                                    onChange={(e) => setEmployeeFirstName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    value={employeeLastName}
                                    onChange={(e) => setEmployeeLastName(e.target.value)}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    variant="outlined"
                                    type="number"
                                    value={employeeAge}
                                    onChange={(e) => setEmployeeAge(e.target.value)}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Telephone"
                                    variant="outlined"
                                    required
                                    value={employeeTelephone}
                                    onChange={(e) => setEmployeeTelephone(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="NIC"
                                    variant="outlined"
                                    required
                                    value={employeeNIC}
                                    onChange={(e) => setEmployeeNIC(e.target.value)}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="EPF Number"
                                    variant="outlined"
                                    value={employeeEPF}
                                    onChange={(e) => setEmployeeEPF(e.target.value)}
                                />
                            </Grid> */}

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    required
                                    value={employeeAddress}
                                    onChange={(e) => setEmployeeAddress(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Private Email"
                                    variant="outlined"
                                    type="email"
                                    value={employeePrivateEmail}
                                    onChange={(e) => setEmployeePrivateEmail(e.target.value)}
                                />
                            </Grid>

                            {/* Company Information Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" fontSize={18} align='left' fontWeight={700} color="text.primary" sx={{ mt: 2 }}>
                                    Company Information
                                </Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Email"
                                    variant="outlined"
                                    required
                                    type="email"
                                    value={employeeEmail}
                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Designation"
                                    variant="outlined"
                                    required
                                    value={employeeDesignation}
                                    onChange={(e) => setEmployeeDesignation(e.target.value)}
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
                                    variant="outlined"
                                    required
                                    value={employeeDepartment}
                                    onChange={(e) => setEmployeeDepartment(e.target.value)}
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
                                    value={employeeID}
                                    onChange={(e) => setEmployeeID(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ padding: '0 1 0 0' }}>
                                        <DatePicker
                                            label="Hired Date"
                                            value={hiredDate}
                                            onChange={(newValue) => setHiredDate(newValue)}
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                                    startIcon={<SaveIcon />}
                                >
                                    {loading ? "Adding..." : "Add Employee"}
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
                            Are you sure you want to cancel adding this employee? All entered information
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

export default AddEmployee;