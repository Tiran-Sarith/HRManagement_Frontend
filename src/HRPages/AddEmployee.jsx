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
import { grey } from '@mui/material/colors';


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

    const [jobTitle, setJobTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [hireType, setHireType] = useState('');
    const [jobID, setJobID] = useState('');
    const [deadline, setDeadline] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [postedDate, setPostedDate] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const submitVacancy = async (e) => {
        e.preventDefault();

        const newVacancy = {
            jobTitle,
            jobCategory,
            hireType,
            jobID,
            deadline,
            designation,
            department,
            postedDate,
            jobDescription,
        };

        try {
            await axios.post("http://localhost:8070/Vacancies/Vadd", newVacancy);
            alert('Vacancy Added');
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className='w-[847px] border border-green-500 rounded-lg ml-10'>
            <form onSubmit={submitVacancy}>
                <div className='w-[560px] ml-20'>

                    <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>Personal Information</p>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Full Name" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Name with initials" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="First Name" variant="filled" onChange={(e) => setJobCategory(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Last Name" variant="filled" onChange={(e) => setHireType(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Age" variant="filled" onChange={(e) => setJobID(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Tel No:" variant="filled" onChange={(e) => setDeadline(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="NIC:" variant="filled" onChange={(e) => setJobID(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="EPF No:" variant="filled" onChange={(e) => setDeadline(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Address" variant="filled" onChange={(e) => setDesignation(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Private E-mail" variant="filled" onChange={(e) => setDesignation(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <p className='pr-[290px] py-7 text-green-600 text-lg font-semibold font-sans'>Company Information</p>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Company E-mail" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Designation" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Department" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 0 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Company ID:" variant="filled" onChange={(e) => setJobID(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>
                    <div className='mb-4 flex justify-start ml-12'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Hired Date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>



                    <div className='flex justify-start gap-36 ml-16 mb-6'>
                        <div>
                            <p>Upload a photo</p>
                        </div>

                        <div className=''>
                            <Stack spacing={2} direction="row">
                                <Button type="submit" variant="contained" color="success" >Add</Button>
                                <Button variant="outlined" color="success">Cancel</Button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee