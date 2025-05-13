

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Modern theme with green accents and white base - same as AddVacancies
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

// Same dropdown options as in AddVacancies
const HireType = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Part-time', label: 'Part-time' },
];

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

const Category = [
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

export default function UpdateVacancies() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [vacancyId, setVacancyId] = useState(null);

    const [formData, setFormData] = useState({
        jobTitle: '',
        jobCategory: '',
        hireType: '',
        deadline: null,
        designation: '',
        department: '',
        about: '',
        requirements: '',
        responsibilities: '',
        whatweoffer: '',
        benefits: '',
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
                deadline: vacancyData.deadline ? dayjs(vacancyData.deadline) : null,
                designation: vacancyData.designation || '',
                department: vacancyData.department || '',
                about: vacancyData.about || '',
                // Convert arrays back to |-separated strings for editing
                requirements: Array.isArray(vacancyData.requirements)
                    ? vacancyData.requirements.join('| ')
                    : vacancyData.requirements || '',
                responsibilities: Array.isArray(vacancyData.responsibilities)
                    ? vacancyData.responsibilities.join('| ')
                    : vacancyData.responsibilities || '',
                whatweoffer: vacancyData.whatweoffer || '',
                benefits: Array.isArray(vacancyData.benefits)
                    ? vacancyData.benefits.join('| ')
                    : vacancyData.benefits || ''
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

    const handleDateChange = (field, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: newValue
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
            // Create a copy of the form data and convert |-separated strings to arrays
            const updatedData = {
                ...formData,
                requirements: formData.requirements.split('|').map(item => item.trim()),
                responsibilities: formData.responsibilities.split('|').map(item => item.trim()),
                benefits: formData.benefits.split('|').map(item => item.trim())
            };

            await axios.put(`${API_BASE_URL}vacancies/Vupdate/${vacancyId}`, updatedData);
            showSnackbar('Vacancy Updated Successfully', 'success');

            // Clean up and navigate after delay to show the success message
            setTimeout(() => {
                localStorage.removeItem('vacancyToUpdate');
                navigate('/vacancies');
            }, 2000);
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
        setCancelDialogOpen(false);
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
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate('/vacancies')}>
                    <IconButton size="small" sx={{ p: 0, pr: 1, color: '#4caf50' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: '#4caf50' }}>
                        Back to Vacancies
                    </Typography>
                </Box>

                <Paper elevation={0} sx={{
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

                        Update Vacancy
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }} className='text-left font-semibold'>
                        Edit the vacancy information below
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Job Basic Information Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={700} color="text.primary" align='left'>
                                    Basic Information
                                </Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Job Title"
                                    variant="outlined"
                                    required
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} align='left'>
                                <TextField
                                    fullWidth
                                    select
                                    label="Job Category"
                                    variant="outlined"
                                    required
                                    name="jobCategory"
                                    value={formData.jobCategory}
                                    onChange={handleInputChange}
                                >
                                    {Category.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} align='left'>
                                <TextField
                                    fullWidth
                                    select
                                    label="Hire Type"
                                    variant="outlined"
                                    required
                                    name="hireType"
                                    value={formData.hireType}
                                    onChange={handleInputChange}
                                >
                                    {HireType.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>



                            <Grid item xs={12} sm={6} align='left'>
                                <TextField
                                    fullWidth
                                    select
                                    label="Designation"
                                    variant="outlined"
                                    required
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                >
                                    {Designation.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} align='left'>
                                <TextField

                                    fullWidth
                                    select
                                    label="Department"
                                    variant="outlined"
                                    required
                                    name="department"
                                    value={formData.department}
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ padding: '1 0 0 0' }}>
                                        {/* <TextField
                                            fullWidth
                                            label="ApplicationDeadline"
                                            variant="outlined"
                                            required
                                            name="deadline"></TextField> */}
                                        <DatePicker
                                            label="Application Deadline"
                                            value={formData.deadline}
                                            onChange={(newValue) => handleDateChange('deadline', newValue)}
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>


                            {/* Department & Role Section */}
                            {/* <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ mt: 2 }}>
                                    Department & Role Details
                                </Typography>
                                <Divider />
                            </Grid> */}

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Department"
                                    variant="outlined"
                                    required
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                >
                                    {Department.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid> */}

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Designation"
                                    variant="outlined"
                                    required
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                >
                                    {Designation.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid> */}

                            {/* Job Description Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" align='left' fontWeight={700} color="text.primary" sx={{ mt: 2 }}>
                                    Job Details
                                </Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Job Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    required
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="Enter complete job description"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Requirements"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    required
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleInputChange}
                                    placeholder="Use | symbol to separate different requirements"
                                    helperText="Example: Bachelor's degree in Computer Science | 3+ years experience | Strong communication skills"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Responsibilities"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    required
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleInputChange}
                                    placeholder="Use | symbol to separate different responsibilities"
                                />
                            </Grid>

                            {/* Additional Details Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" align='left' fontWeight={700} color="text.primary" sx={{ mt: 2 }}>
                                    Additional Details
                                </Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Benefits"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleInputChange}
                                    placeholder="Use | symbol to separate different benefits"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="What We Offer"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    name="whatweoffer"
                                    value={formData.whatweoffer}
                                    onChange={handleInputChange}
                                    placeholder="Describe company culture and additional perks"
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
                                    {loading ? "Updating..." : "Update Vacancy"}
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
                            Are you sure you want to cancel editing this vacancy? All changes
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