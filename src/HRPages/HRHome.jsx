import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { PieChart } from '@mui/x-charts/PieChart';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#09d9ab',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));


const card1 = (
  <React.Fragment>
    <CardContent>
      <h1 className='font-sans text-start text-3xl font-semibold text-green-700'> Hire per month </h1>
      
      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>January</h2>
          <p className='text-start  text-green-700' > 14</p>
        </div>

        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={70} />
        </Stack>
      </div>
      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
            <h2 className='text-start  text-green-700 '>February</h2>
            <p className='text-start  text-green-700' > 10</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={50} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>March</h2>
          <p className='text-start  text-green-700' > 8</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={40} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>April</h2>
          <p className='text-start  text-green-700' > 16</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={80} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
      <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>May</h2>
          <p className='text-start  text-green-700' > 7</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={35} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>June</h2>
          <p className='text-start  text-green-700' > 12</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={60} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>July</h2>
          <p className='text-start  text-green-700' > 8</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={40} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
      <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>August</h2>
          <p className='text-start  text-green-700' > 10</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={50} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>September</h2>
          <p className='text-start  text-green-700' > 13</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={65} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>October</h2>
          <p className='text-start  text-green-700' > 14</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={70} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>November</h2>
          <p className='text-start  text-green-700' > 11</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={55} />
        </Stack>
      </div>

      <div className='mt-4 ml-4'>
        <div className='flex justify-between'>
          <h2 className='text-start  text-green-700 '>December</h2>
          <p className='text-start  text-green-700' > 4</p>
        </div>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>     
          <BorderLinearProgress variant="determinate" value={20} />
        </Stack>
      </div>

    </CardContent>
  
  </React.Fragment>
);

const card2 = (
  <React.Fragment>
    <CardContent>
      <h1 className='font-sans text-start text-3xl font-semibold text-green-700'> Hires</h1>
      
      <div>
        <h2 className='text-start ml-4 mb-5 font-sans font-semibold text-green-700 mt-6 text-xl'>For Departments</h2>

        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Software Engineering</p> <p className='text-start ml-4 text-green-700'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Cyber security Engineering</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>DevOps Engineering</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Networking Engineering</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>QA Engineering </p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>UI/UX Development</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
      </div>
      
      <div>
        <h2 className='text-start ml-4 mb-5 mt-10 font-sans font-semibold text-green-700 text-xl'>Summary of Applicants</h2>

        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Applications</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Technical Interview</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>HR Interview</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Total Hired</p> <p className='text-start ml-4 text-[#018554]'> 55 </p>
        </div>
        <hr />
      </div>
        
    </CardContent>
  
  </React.Fragment>
);

const card3 = (
  <React.Fragment>
    <CardContent>
      <h1 className='font-sans text-start text-3xl font-semibold text-green-700'> Project Summary </h1>
      
      <div className='flex justify-evenly'>
        <div>
          <p className='text-[90px] font-bold  font-sans mx-2 mt-4 text-[#00a36d]'>20</p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>Pending Projects</p>
        </div>
        
        <div>
          <p className='text-[90px] font-bold  font-sans mx-2 mt-4 text-[#00a36d]'>8</p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>Processing Projects</p>
        </div>
        
        <div>
          <p className='text-[90px] font-bold  font-sans mx-2 mt-4 text-[#00a36d]'>35</p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>Finished Projects</p>
        </div>
      </div>

    </CardContent>
  
  </React.Fragment>
);

function HRHome() {

return (
    <div>

      <Box sx={{maxWidth : 1000}}>
        <div className='flex justify-between'>
          <div className='flex justify-start'>
            <Card variant="outlined" className='w-80'>{card1}</Card>
            <Card variant="outlined" className='w-80 ml-3'>{card2}</Card>
          </div>
          <div>
            <Card variant="outlined" sx={{ width: 600}} className='w-80 ml-3'>{card3}</Card>
            <div className='bg-white h-[350px] w-[600px] ml-3 shadow-md mt-3 '>
              <PieChart sx={{marginTop : 3}}
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                  },
                ]}
                width={600}
                height={300}
              />
            </div>

          </div>
        </div>
      </Box>

    </div>
  )
}

export default HRHome