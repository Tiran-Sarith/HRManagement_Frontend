import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

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

export default function AddVacancies() {
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
        <div className='w-[847px]'>
            <form onSubmit={submitVacancy}>
                <div className='w-[560px] '>
                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Job Name" variant="filled" onChange={(e) => setJobTitle(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Category" variant="filled" onChange={(e) => setJobCategory(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Hire Type" variant="filled" onChange={(e) => setHireType(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Job ID:" variant="filled" onChange={(e) => setJobID(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Deadline" variant="filled" onChange={(e) => setDeadline(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[560px]' label="Designation" variant="filled" onChange={(e) => setDesignation(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Department" variant="filled" onChange={(e) => setDepartment(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Job Posted" variant="filled" onChange={(e) => setPostedDate(e.target.value)} />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-10'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '847px' } }} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="filled-multiline-static"
                                    label="Job Description"
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    className='w-[854px]'
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
                                <Button type="submit" variant="contained" color="success">Add </Button>
                                <Button variant="outlined" color="success">Cancel</Button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
