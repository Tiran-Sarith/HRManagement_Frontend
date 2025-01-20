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

function AddEmployee() {
    const outerTheme = useTheme();

    // State for all form fields
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
        hired_date: null
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/employee/Eadd', formData);
            alert('Employee Added Successfully');
            // Reset form or redirect as needed
        } catch (error) {
            if (error.response) {
                if (error.response.data.error === 'Duplicate Entry') {
                    alert(error.response.data.message);
                } else {
                    alert('Error adding employee: ' + error.response.data.details);
                }
            } else {
                alert('Error adding employee. Please try again.');
            }
        }
    };

    return (
        <div className='w-[847px] border border-green-500 rounded-lg ml-10'>
            <form onSubmit={handleSubmit}>
                <div className='w-[560px] ml-20'>
                    <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>Personal Information</p>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[560px]' 
                                    label="Full Name" 
                                    variant="filled" 
                                    name="employee_full_name"
                                    value={formData.employee_full_name}
                                    onChange={handleInputChange}
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
                                    name="employee_name_with_initials"
                                    value={formData.employee_name_with_initials}
                                    onChange={handleInputChange}
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
                                    name="employee_first_name"
                                    value={formData.employee_first_name}
                                    onChange={handleInputChange}
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Last Name" 
                                    variant="filled"
                                    name="employee_last_name"
                                    value={formData.employee_last_name}
                                    onChange={handleInputChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Tel No:" 
                                    variant="filled"
                                    name="employee_telephone"
                                    value={formData.employee_telephone}
                                    onChange={handleInputChange}
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
                                    name="employee_nic"
                                    value={formData.employee_nic}
                                    onChange={handleInputChange}
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[272px]' 
                                    label="Employee ID:" 
                                    variant="filled"
                                    name="employee_id"
                                    value={formData.employee_id}
                                    onChange={handleInputChange}
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
                                    name="employee_address"
                                    value={formData.employee_address}
                                    onChange={handleInputChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[560px]' 
                                    label="Email" 
                                    variant="filled"
                                    name="employee_email"
                                    value={formData.employee_email}
                                    onChange={handleInputChange}
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
                                    label="Designation" 
                                    variant="filled"
                                    name="employee_designation"
                                    value={formData.employee_designation}
                                    onChange={handleInputChange}
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField 
                                    className='w-[560px]' 
                                    label="Department" 
                                    variant="filled"
                                    name="employee_department"
                                    value={formData.employee_department}
                                    onChange={handleInputChange}
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
                                    onChange={(date) => setFormData(prev => ({ ...prev, hired_date: date }))}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className='flex justify-start gap-36 ml-16 mb-6'>
                        <div>
                            <p>Upload a photo</p>
                        </div>

                        <div className=''>
                            <Stack spacing={2} direction="row">
                                <Button type="submit" variant="contained" color="success">Add</Button>
                                <Button variant="outlined" color="success">Cancel</Button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;