// CVs.jsx
import React from 'react';
import { Container, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CVCard from '../Components/CVCard';

function CVs() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Elegant Back Link */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate(-1)}>
        <IconButton size="small" sx={{ p: 0, pr: 1, color: 'green' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: 'green' }}>
          Go Back
        </Typography>
      </Box>

      {/* CVCard Display */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CVCard />
      </Box>
    </Container>
  );
}

export default CVs;
