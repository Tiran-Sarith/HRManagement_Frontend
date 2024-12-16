import * as React from 'react';
import { PageContainerToolbar } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';



const NAVIGATION = [
    { segment: '', title: 'Weather' },
    { segment: 'orders', title: 'Orders' },
  ];

function CVCard() {


  return (
    <div className='w-[390px] border-2 border-green-600 rounded-lg flex justify-between p-2 mt-6'>
        <div>
            <div className='flex justify-start'><p className='text-start pl-2 text-black font-sans font-semibold'>Name : </p> <p className='pl-2'>Aaa Bbb Ccc</p></div>
            <div className='flex justify-start'><p className='text-start pl-2 text-black font-sans font-semibold'>Tel No: </p> <p className='pl-2'>+9471 234 5687</p></div>
            <div className='flex justify-start'><p className='text-start pl-2 text-black font-sans font-semibold'>Score : </p> <p className='pl-2'>95</p></div>
        </div>
        <div className='my-4 mx-2'>
            <PageContainerToolbar>
                <Button startIcon={<FileDownloadIcon />} color="success">
                    Download
                </Button>
            </PageContainerToolbar>
        </div>
    </div>
  )
}

export default CVCard