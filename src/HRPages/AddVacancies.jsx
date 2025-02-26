import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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


    const HireType = [
        {
          value: 'Permanent',
          label: 'Permanent',
        },
        {
          value: 'Internship',
          label: 'Internship',
        },
        {
          value: 'Part-time',
          label: 'Part-time',
        },
      ];

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

export default function AddVacancies() {
    const outerTheme = useTheme();

    const [jobTitle, setJobTitle] = useState('');
    const [hireType, setHireType] = useState('');
    const [jobID, setJobID] = useState('');
    const [deadline, setDeadline] = useState();
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [postedDate, setPostedDate] = useState('');
    const [requirements, setRequirements] = useState([]);
    const [responsibilities, setResponsibilities] = useState([]);
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
            requirements,
            responsibilities,
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
                                <TextField className='w-[272px]' label="Job ID:" variant="filled" onChange={(e) => setJobID(e.target.value)} />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                            <TextField
                            sx={{ width: 273 }}
                            id="filled-select-currency"
                            select
                            label="Hire Type"
                            variant="filled"
                            onChange={(e) => setHireType(e.target.value)}
                            >
                            {HireType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']} sx={{width: 273 }}>
                                            <DatePicker
                                            sx={{width: 273 }}
                                            label="Posted Date"
                                            onChange={(newValue) => setPostedDate(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{width: 273 }}>
                                        <DatePicker
                                        sx={{width: 273 }}
                                        label="Deadline"
                                        value={deadline}
                                        onChange={(newValue) => setDeadline(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                    sx={{ width: 273, marginTop:1 }}
                                    id="filled-select-currency"
                                    select
                                    label="Department"
                                    variant="filled"
                                    onChange={(e) => setDepartment(e.target.value)}
                                    >
                                    {Department.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                sx={{ width: 273,  marginTop:1 }}
                                id="filled-select-currency"
                                select
                                label="Designation"
                                variant="filled"
                                onChange={(e) => setDesignation(e.target.value)}
                                >
                                {Designation.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-1 flex justify-start ml-12'>
                        <Box component="form" sx={{'& .MuiTextField-root': { marginBottom:2, width: '560px' }  }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField
                                        id="filled-multiline-static"
                                        label="Requirements"
                                        onChange={(e) => setRequirements(e.target.value.split(',').map(item => item.trim()))}
                                        multiline
                                        rows={2}
                                        variant="filled"
                                    />
                                <TextField
                                    id="filled-multiline-static"
                                    label="Responsibilities (comma-separated)"
                                    onChange={(e) => setResponsibilities(e.target.value.split(',').map(item => item.trim()))}
                                    multiline
                                    rows={2}
                                    variant="filled"
                                />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-10'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '560px' } }} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="filled-multiline-static"
                                    label="Job Description"
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    multiline
                                    rows={4}
                                    variant="filled"
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
