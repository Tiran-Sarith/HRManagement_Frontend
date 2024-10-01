import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


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

    return (
        <div className='w-[847px]'>
            <form action="">
                <div className='w-[560px] '>
                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <TextField className='w-[560px]' label="Job Name" variant="filled" />
                        </ThemeProvider>
                        </Box>
                    </div>
                    
                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Category" variant="filled" />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Hire Type" variant="filled" />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Job ID:" variant="filled" />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Deadline" variant="filled" />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <TextField className='w-[560px]' label="Designation" variant="filled" />
                        </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-12'>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Department" variant="filled" />
                            </ThemeProvider>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField className='w-[272px]' label="Job Posted" variant="filled" />
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className='mb-4 flex justify-start ml-10'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '847px' } }} noValidate autoComplete="off">
                            <div>
                                <TextField
                                id="filled-multiline-static"
                                label="Job Description"
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
                            <Button variant="contained" color="success">Success</Button>                                
                            <Button variant="outlined" color="success">Outlined</Button>
                            </Stack>
                        </div>

                        </div>
                </div>

            </form>
            

        </div>
    );
    }
