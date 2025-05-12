import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
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
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
                main: '#4caf50', // Slightly lighter green for modern look
                dark: '#2e7d32',
                light: '#81c784',
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
                            borderColor: '#4caf50',
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
                            color: '#4caf50',
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
                        backgroundColor: '#4caf50',
                        '&:hover': {
                            backgroundColor: '#2e7d32',
                        },
                    },
                    outlinedPrimary: {
                        borderColor: '#4caf50',
                        color: '#4caf50',
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

export default function AddVacancies() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [jobTitle, setJobTitle] = useState('');
    const [hireType, setHireType] = useState('');
    const [jobID, setJobID] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [postedDate, setPostedDate] = useState(null);
    const [requirements, setRequirements] = useState([]);
    const [responsibilities, setResponsibilities] = useState([]);
    const [about, setAbout] = useState('');
    const [whatweoffer, setWhatWeOffer] = useState('');
    const [benefits, setBenefits] = useState('');
    const [jobCategory, setJobCategory] = useState('');

    // Cancel confirmation dialog state
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });


    const submitVacancy = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newVacancy = {
            jobTitle,
            about,
            hireType,
            jobCategory,
            jobID,
            deadline,
            designation,
            department,
            postedDate,
            requirements,
            responsibilities,
            whatweoffer,
            benefits,
        };

        try {
            await axios.post(`${API_BASE_URL}Vacancies/Vadd`, newVacancy);
            // alert('Vacancy Added');

            showSnackbar('Vacancy Added Successfully', 'success');
            setTimeout(() => {
                localStorage.removeItem('vacancyData');
                navigate('/vacancies');
            }, 2000);

        } catch (err) {
            // alert(err);
            showSnackbar(
                "Error Adding vacancy: " +
                (err.response?.data?.message || err.message),
                "error"
            );
            setLoading(false);
        }
    };

    // Open cancel confirmation dialog
    const handleCancelClick = () => {
        // Check if there are unsaved changes
        setCancelDialogOpen(true);
    };

    // Close cancel confirmation dialog
    const handleCloseCancelDialog = () => {
        setCancelDialogOpen(false);
    };

    // Confirm cancel action
    const handleConfirmCancel = () => {
        localStorage.removeItem('vacancyData');
        setCancelDialogOpen(false);
        // Redirect to vacancies page
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
                <Paper elevation={0} sx={{ padding: 4, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Add New Vacancy
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                        Complete the form below to create a job posting
                    </Typography>

                    <form onSubmit={submitVacancy}>
                        <Grid container spacing={3}>
                            {/* Job Basic Information Section */}
                            <Grid item xs={12}>
                                <Typography variant="body1" align='left' fontWeight={700} color="text.primary">
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
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Job Category"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setJobCategory(e.target.value)}
                                >
                                    {Category.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Job ID"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setJobID(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Hire Type"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setHireType(e.target.value)}
                                >
                                    {HireType.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Department & Role Section */}
                            {/* <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ mt: 2 }}>
                                    Department & Role Details
                                </Typography>
                                <Divider />
                            </Grid> */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Department"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setDepartment(e.target.value)}
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
                                    select
                                    label="Designation"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setDesignation(e.target.value)}
                                >
                                    {Designation.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Date Information Section */}
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ padding: 0 }}>
                                        <DatePicker
                                            label="Posted Date"
                                            value={postedDate}
                                            onChange={(newValue) => setPostedDate(newValue)}
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ padding: 0 }}>
                                        <DatePicker
                                            label="Application Deadline"
                                            value={deadline}
                                            onChange={(newValue) => setDeadline(newValue)}
                                            sx={{ width: '100%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

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
                                    onChange={(e) => setAbout(e.target.value)}
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
                                    onChange={(e) => setRequirements(e.target.value.split('|').map(item => item.trim()))}
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
                                    onChange={(e) => setResponsibilities(e.target.value.split('|').map(item => item.trim()))}
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
                                    onChange={(e) => setBenefits(e.target.value.split('|').map(item => item.trim()))}
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
                                    onChange={(e) => setWhatWeOffer(e.target.value)}
                                    placeholder="Describe company culture and additional perks"
                                />
                            </Grid>

                            {/* Form Actions */}
                            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button variant="outlined" color="primary" onClick={handleCancelClick} disabled={loading} startIcon={<CancelIcon />}>
                                    Cancel
                                </Button>
                                {/* <Button type="submit" variant="contained" color="primary">
                                    Add Vacancy
                                </Button> */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    startIcon={<SaveIcon />}
                                >
                                    {loading ? "Adding..." : "Add Vacancy"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
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