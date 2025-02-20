


// CVs.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CVCard from '../Components/CVCard'

function CVs() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          color: 'green',
          borderBottom: '2px solid #e8f5e9',
          pb: 2
        }}
      >
        CVs
      </Typography> */}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CVCard />
      </Box>
    </Container>
  );
}

export default CVs;