// CVs.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainerToolbar } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';

function CVs() {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplicationData();
    }, [applicationId]);

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/applications/Aview/${applicationId}`);
            setApplication(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching application data');
            setLoading(false);
            console.error('Error:', err);
        }
    };

    // CVs.jsx
const handleDownload = async () => {
  try {
      if (!application.filename) {
          alert('No file available for download');
          return;
      }

      const response = await axios.get(
          `http://localhost:8070/applications/download/${application.filename}`, 
          {
              responseType: 'blob',
              headers: {
                  'Accept': 'application/octet-stream'
              }
          }
      );
      
      // Check if response is valid
      if (response.status !== 200) {
          throw new Error('Download failed');
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', application.filename);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      link.remove();
  } catch (err) {
      console.error('Error downloading file:', err);
      alert('Error downloading file: ' + (err.response?.data?.message || err.message));
  }
};

    if (loading) return <div>Loading application data...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!application) return <div>No application found</div>;

    return (
        <div className='w-[390px] border-2 border-green-600 rounded-lg flex justify-between p-2 mt-6'>
            <div>
                <div className='flex justify-start'>
                    <p className='text-start pl-2 text-black font-sans font-semibold'>Name: </p>
                    <p className='pl-2'>{application.name}</p>
                </div>
                <div className='flex justify-start'>
                    <p className='text-start pl-2 text-black font-sans font-semibold'>Tel No: </p>
                    <p className='pl-2'>{application.phoneNo}</p>
                </div>
                <div className='flex justify-start'>
                    <p className='text-start pl-2 text-black font-sans font-semibold'>Score: </p>
                    <p className='pl-2'>{}</p>
                </div>
            </div>
            <div className='my-4 mx-2'>
                <PageContainerToolbar>
                    <Button 
                        startIcon={<FileDownloadIcon />} 
                        color="success"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </PageContainerToolbar>
            </div>
        </div>
    );
}

export default CVs;