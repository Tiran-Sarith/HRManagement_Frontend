// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import ApplicationCard from '../Components/ApplicationCard';
// import axios from 'axios';

// function Applications() {
//     const [applications, setApplications] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchApplications();
//     }, []);

//     const fetchApplications = async () => {
//         try {
//             const response = await axios.get('http://localhost:8070/applications/Aview');
//             console.log('Fetched data:', response.data); // Debug log
//             setApplications(response.data);
//             setLoading(false);
//         } catch (err) {
//             setError('Error fetching applications');
//             setLoading(false);
//             console.error('Error:', err);
//         }
//     };

//     const filteredApplications = applications.filter(app => {
//         if (!searchTerm) return true;
        
//         const searchLower = searchTerm.toLowerCase();
//         return (
//             (app?.name?.toLowerCase()?.includes(searchLower)) ||
//             (app?.email?.toLowerCase()?.includes(searchLower)) ||
//             (app?.portfolio?.toLowerCase()?.includes(searchLower)) ||
//             (app?.phoneNo?.toString()?.includes(searchTerm))
//         );
//     });

//     return (
//         <div>
//             <div className='border-2 border-green-500 rounded-xl bg-white m-4 w-[455px]'>
//                 <input 
//                     type="search" 
//                     className='w-96'
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search applications..."
//                 />
//                 <label htmlFor="Search" className='text-green-700'>Search</label>
//             </div>

//             {loading && <div>Loading applications...</div>}
//             {error && <div className="text-red-500">{error}</div>}
            
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
//                 {!loading && filteredApplications.length === 0 && (
//                     <div>No applications found</div>
//                 )}
//                 {filteredApplications.map((application) => (
//                     <ApplicationCard 
//                         key={application._id || Math.random()}
//                         application={application}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Applications;


import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ApplicationCard from '../Components/ApplicationCard';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}applications/Aview`);
      const data = await response.json();
      // Sort applications by MongoDB ObjectId (newest first)
      const sortedData = [...data].sort((a, b) => {
        // MongoDB ObjectId contains timestamp in first 4 bytes
        // Later ObjectIds (newer) are "greater" than earlier ones
        return b._id.localeCompare(a._id);
      });
      setApplications(sortedData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch applications');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const filteredApplications = applications?.filter(app => 
    app?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: 'green' }}>
          Applications
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'green',
              },
              '&:hover fieldset': {
                borderColor: 'green',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'green',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'green' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: 'green' }} />
        </Box>
      ) : error ? (
        <Box sx={{ 
          bgcolor: '#e8f5e9', 
          color: 'green', 
          p: 2, 
          borderRadius: 1 
        }}>
          {error}
        </Box>
      ) : applications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'green' }}>
          No applications found
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3
        }}>
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application._id || Math.random()}
              application={application}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Applications;
