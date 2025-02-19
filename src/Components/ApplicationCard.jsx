


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardMedia,
  Typography, 
  Avatar,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import JobIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import image2 from '../Screens/Assests/OIP (2).jfif';

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  if (!application) return null;

  return (
    <Card 
      onClick={() => navigate(`/cvs/${application._id}`)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0, 128, 0, 0.15)'
        },
        maxWidth: 345,
        border: '1px solid #e8f5e9'
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#e8f5e9', color: 'green' }}>
            <PersonIcon />
          </Avatar>
        }
        title={ 
          <Typography variant="h6" component="div" sx={{ color: 'green', alignItems: 'center' }}>
            {application.name || 'No Name'}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" sx={{ color: 'green' }}>
            ID: {application._id?.slice(-10) || 'N/A'}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="140"
        image={image2}
        alt="Application image"
        sx={{
          mx: 'auto',
          width: 'auto',
          maxHeight: '160px',
          objectFit: 'contain',
          px: 4
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ color: 'green' }} fontSize="small" />
            <Typography variant="body2" sx={{ color: 'green' }}>
              {application.email || 'No Email'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon sx={{ color: 'green' }} fontSize="small" />
            <Typography variant="body2" sx={{ color: 'green' }}>
              {application.phoneNo || 'No Phone Number'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <JobIcon sx={{ color: 'green' }} fontSize="small" />
            <Typography variant="body2" sx={{ color: 'green' }}>
              {application.jobTitle|| 'No jobTitle'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;