import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import dayjs from 'dayjs';

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

function EmployeeUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const outerTheme = useTheme();
    
    const [formData, setFormData] = useState({
        employee_full_name: '',
        employee_name_with_initials: '',
        employee_first_name: '',
        employee_last_name: '',
        employee_id: '',
        employee_email: '',
        employee_nic: '',
        employee_telephone: '',
        employee_address: '',
        employee_designation: '',
        employee_department: '',
        employee_current_project_id: '',
        hired_date: null
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!id) {
                console.error('No ID provided');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8070/employee/Eview/${id}`);
                const employeeData = response.data;
                
                setFormData({
                    employee_full_name: employeeData.employee_full_name || '',
                    employee_name_with_initials: employeeData.employee_name_with_initials || '',
                    employee_first_name: employeeData.employee_first_name || '',
                    employee_last_name: employeeData.employee_last_name || '',
                    employee_id: employeeData.employee_id || '',
                    employee_email: employeeData.employee_email || '',
                    employee_nic: employeeData.employee_nic || '',
                    employee_telephone: employeeData.employee_telephone || '',
                    employee_address: employeeData.employee_address || '',
                    employee_designation: employeeData.employee_designation || '',
                    employee_department: employeeData.employee_department || '',
                    employee_current_project_id: employeeData.employee_current_project_id || '',
                    hired_date: employeeData.hired_date ? dayjs(employeeData.hired_date) : null
                });
            } catch (error) {
                console.error('Error fetching employee:', error);
                alert('Failed to fetch employee details');
            }
        };

        if (id) {
            fetchEmployee();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            hired_date: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(
                `http://localhost:8070/employee/Eupdate/${id}`,
                formData
            );
            
            if (response.status === 200) {
                alert('Employee Updated Successfully');
                navigate('/employees'); // Navigate back to employees page
            }
        } catch (err) {
            alert('Error updating employee: ' + (err.response?.data?.message || err.message));
        }
    };

    
    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div className='w-[847px] border border-green-500 rounded-lg ml-10'>
            <form onSubmit={handleSubmit}>
                <div className='w-[560px] ml-20'>
                    <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>
                        Personal Information
                    </p>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Full Name"
                                    variant="filled"
                                    name="employee_full_name"
                                    value={formData.employee_full_name}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Name with Initials"
                                    variant="filled"
                                    name="employee_name_with_initials"
                                    value={formData.employee_name_with_initials}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="First Name"
                                    variant="filled"
                                    name="employee_first_name"
                                    value={formData.employee_first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="Last Name"
                                    variant="filled"
                                    name="employee_last_name"
                                    value={formData.employee_last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="Employee ID"
                                    variant="filled"
                                    name="employee_id"
                                    value={formData.employee_id}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="Telephone"
                                    variant="filled"
                                    name="employee_telephone"
                                    value={formData.employee_telephone}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="NIC"
                                    variant="filled"
                                    name="employee_nic"
                                    value={formData.employee_nic}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[272px]'
                                    label="Project ID"
                                    variant="filled"
                                    name="employee_current_project_id"
                                    value={formData.employee_current_project_id}
                                    onChange={handleChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Address"
                                    variant="filled"
                                    name="employee_address"
                                    value={formData.employee_address}
                                    onChange={handleChange}
                                    required
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Email"
                                    variant="filled"
                                    name="employee_email"
                                    value={formData.employee_email}
                                    onChange={handleChange}
                                    type="email"
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>
                        Company Information
                    </p>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Designation"
                                    variant="filled"
                                    name="employee_designation"
                                    value={formData.employee_designation}
                                    onChange={handleChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    className='w-[560px]'
                                    label="Department"
                                    variant="filled"
                                    name="employee_department"
                                    value={formData.employee_department}
                                    onChange={handleChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Hired Date"
                                    value={formData.hired_date}
                                    onChange={handleDateChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className='flex justify-start gap-36 ml-16 mb-6'>
                        <Stack spacing={2} direction="row">
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="success"
                            >
                                Update
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="success" 
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EmployeeUpdate;