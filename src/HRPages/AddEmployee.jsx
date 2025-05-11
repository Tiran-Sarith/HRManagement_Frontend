import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Typography} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// Update this to match your server configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8070/api/';

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

        const Designation = [
        {
          value: 'Head of Department',
          label: 'HOD',
        },
        {
          value: 'Senior Manager',
          label: 'Senior Manager',
        },
        {
          value: 'Senior Engineer',
          label: 'Senior Engineer',
        },
        {
          value: 'Engineer',
          label: 'Engineer',
        },
        {
          value: 'Assistant Engineer',
          label: 'Assistant Engineer',
        },
        {
          value: 'Trainee Engineer',
          label: 'Trainee Engineer',
        },
      ];

    const Department = [
        {
          value: 'Networking',
          label: 'Networking',
        },
        {
          value: 'Software Development',
          label: 'Software Development',
        },
        {
          value: 'Cyber Security',
          label: 'Cyber Security',
        },
        {
          value: 'DevOps',
          label: 'DevOps',
        },
        {
          value: 'Quality Assurance',
          label: 'QA',
        },
        {
          value: 'UI/UX Design',
          label: 'UI/UX',
        },
        {
          value: 'Data Science',
          label: 'Data Science',
        },
        {
          value: 'Machine Learning/AI',
          label: 'Machine Learning/AI',
        },
        {
          value: 'Human Resources',
          label: 'Human Resources',
        },
      ];


function AddEmployee() {
    const outerTheme = useTheme();

    // Employee state variables mapped to backend model
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

    const submitEmployee = async (e) => {
        e.preventDefault();

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
            // These fields aren't directly in your form but are in the model:
            employee_current_project_id: "", // Empty by default for new employees
        };

        try {
            const response = await axios.post(`${API_BASE_URL}employee/Eadd`, newEmployee);
            alert('Employee Added Successfully');
            console.log('Response:', response.data);
            
            // Reset form after successful submission
            resetForm();
        } catch (err) {
            console.error('Error:', err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Error: ${err.response.data.message}`);
            } else {
                alert('Failed to add employee. Please try again.');
            }
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

    const navigate = useNavigate();
    // Function to handle navigation   
    const handleNavigation = () => {
        navigate('/employee');
    };
    return (

        <div>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={handleNavigation}>
                    <IconButton size="small" sx={{ p: 0, pr: 1, color: 'green' }}>
                    <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'green' }}>
                    Go Back
                    </Typography>
                </Box>
            <div className='w-[847px] border border-green-500 rounded-lg ml-10'>


                <form onSubmit={submitEmployee}>
                    <div className='w-[560px] ml-20'>

                        <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>Personal Information</p>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[560px]' 
                                        label="Full Name" 
                                        variant="filled" 
                                        value={employeeFullName}
                                        onChange={(e) => setEmployeeFullName(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[560px]' 
                                        label="Name with initials" 
                                        variant="filled" 
                                        value={employeeNameWithInitials}
                                        onChange={(e) => setEmployeeNameWithInitials(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="First Name" 
                                        variant="filled" 
                                        value={employeeFirstName}
                                        onChange={(e) => setEmployeeFirstName(e.target.value)} 
                                    />
                                </ThemeProvider>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="Last Name" 
                                        variant="filled" 
                                        value={employeeLastName}
                                        onChange={(e) => setEmployeeLastName(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="Age" 
                                        variant="filled" 
                                        value={employeeAge}
                                        onChange={(e) => setEmployeeAge(e.target.value)} 
                                    />
                                </ThemeProvider>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="Tel No:" 
                                        variant="filled" 
                                        value={employeeTelephone}
                                        onChange={(e) => setEmployeeTelephone(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="NIC:" 
                                        variant="filled" 
                                        value={employeeNIC}
                                        onChange={(e) => setEmployeeNIC(e.target.value)} 
                                    />
                                </ThemeProvider>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="EPF No:" 
                                        variant="filled" 
                                        value={employeeEPF}
                                        onChange={(e) => setEmployeeEPF(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[560px]' 
                                        label="Address" 
                                        variant="filled" 
                                        value={employeeAddress}
                                        onChange={(e) => setEmployeeAddress(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[560px]' 
                                        label="Private E-mail" 
                                        variant="filled" 
                                        value={employeePrivateEmail}
                                        onChange={(e) => setEmployeePrivateEmail(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>

                        <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>Company Information</p>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[560px]' 
                                        label="Company E-mail" 
                                        variant="filled" 
                                        value={employeeEmail}
                                        onChange={(e) => setEmployeeEmail(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>
                        
                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <TextField
                                    sx={{ width: 273,  marginTop:1 }}
                                    id="filled-select-currency"
                                    select
                                    label="Designation*"
                                    variant="filled"
                                    onChange={(e) => setEmployeeDesignation(e.target.value)}
                                    >
                                    {Designation.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField
                                        sx={{ width: 273, marginTop:1 }}
                                        id="filled-select-currency"
                                        select
                                        label="Department*"
                                        variant="filled"
                                        onChange={(e) => setEmployeeDepartment(e.target.value)}
                                        >
                                        {Department.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider>
                            </Box>
                        </div>

                        <div className='mb-4 flex justify-start ml-12'>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 0 }}>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField 
                                        className='w-[272px]' 
                                        label="Company ID:" 
                                        variant="filled" 
                                        value={employeeID}
                                        onChange={(e) => setEmployeeID(e.target.value)} 
                                    />
                                </ThemeProvider>
                            </Box>
                        </div>
                        <div className='mb-4 flex justify-start ml-12'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Hired Date"
                                        value={hiredDate}
                                        onChange={(newValue) => setHiredDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className='flex justify-start gap-36 mt-10 ml-96 mb-6'>
                            <div className=''>
                                <Stack spacing={2} direction="row">
                                    <Button type="submit" variant="contained" color="success">Add</Button>
                                    <Button variant="outlined" color="success" onClick={resetForm}>Cancel</Button>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;