import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ApplicationCard from '../Components/ApplicationCard';



function Applications() {

    

  return (
    <div>
            <div className='border-2 border-green-500 rounded-xl bg-white m-4 w-[455px] '>
                <input type="search" className='w-96'/>
                <label htmlFor="Search" className='text-green-700'>Search</label>
            </div>

            <div className='hover'>
                <ApplicationCard/>
            </div>
        
    </div>
  )
}

export default Applications