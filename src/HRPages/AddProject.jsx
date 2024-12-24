import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

const currencies = [
    {
      value: 'MERN',
      label: 'MERN Stack',
    },
    {
      value: 'Spring Boot',
      label: 'Spring Boot',
    },
    {
      value: 'Flutter',
      label: 'Flutter',
    },
    {
      value: '.NET',
      label: '.NET',
    },
  ];
  

function AddProject() {
  return (
    <div className='mb-[400px] w-[800px] border-2 border-gray-200 rounded-xl p-5'>     
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background:'white' } }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Project Name"
                    />
                <TextField
                    required
                    id="outlined-required"
                    label="Project ID"
                    />
            </div>
        </Box>
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background:'white' } }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Client"
                    />
                <TextField
                    required
                    id="outlined-required"
                    label="Deadline"
                    />
            </div>
        </Box>
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background:'white' } }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Estimated Budget($)"
                    />
                <TextField
                    required
                    id="outlined-required"
                    label="Estimated Duration(Weeks)"
                    />
            </div>
        </Box>
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', background:'white' } }}
            noValidate
            autoComplete="off"
            >
            <div>
            <TextField
                    id="outlined-select-currency"
                    select
                    label="Technology"
                    defaultValue=''
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
        <Button variant="contained" color="success" sx={{marginLeft: 45, marginTop: 10}}>Add Project</Button>
    </div>
  )
}

export default AddProject