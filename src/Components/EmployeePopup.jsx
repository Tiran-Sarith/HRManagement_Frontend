import React from 'react'
import Button from "@mui/material/Button";


function EmployeePopup({visible,onClose}) {

    const handleOnClose = (e)=> {
        if(e.target.id === "container") onClose()
    };

    const handleDelete = ()=>{

    }

    if (!visible) return null;

  return (
    <div id='container' onClick = {handleOnClose} className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
        
        <div className='bg-green-50 p-2 rounded-3xl w-[600px] font-sans h-[550px]'>

            <div className='mt-12'>

                <div className='flex justify-evenly'>
                    <img src="" alt="" className='border border-green-500 w-32 h-32 rounded-full border-b-4' />
                    <div className='mt-6'>
                        <div className='flex justify-between p-[2px] font-sans'><p className='font-bold pr-4'>Name:</p><p>A.B.C. Perera</p></div>
                        <div className='flex justify-between p-[2px] font-sans'><p className='font-bold pr-4'>Designation: </p><p>Senior Engineer</p></div>
                        <div className='flex justify-between p-[2px] font-sans'><p className='font-bold pr-4'>Employee ID:</p><p>228976546</p></div>
                    </div>
                </div>

                <div className='mt-5 mb-3'>
                    <div className='flex justify-between mx-[32.5px]'>
                        <div className='flex justify-between p-[2px] font-sans'><p className='font-bold pr-1'>Email:</p><p></p>pereraabd@gmail.com</div>
                        <div className='flex justify-between p-[2px] font-sans'><p className='font-bold pr-1'>Department: </p><p></p>Software</div>
                    </div>
                    <div>
                        <div className='flex justify-start ml-[32.5px] p-[2px] font-sans'><p className='font-bold pr-1'>Department: </p><p></p>Software</div>
                    </div>
                </div>

                <hr className='border border-gray-400'/>

                <p className='font-bold font-sans text-green-600 text-start ml-[32.5px] mt-2'>Personal Information</p>

                <div className='grid grid-flow-col mx-6 mt-4'>
                    <div className=''>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Full Name: </p><p>Aaa Bbbb Ccccc Perera </p></div>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>First name: </p><p></p>Aaa</div>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>NIC No: </p><p>200010901185</p></div>
                    </div>
                    <div className=''>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Name with Initials:</p><p> Perera A.B.C </p></div>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Last name: </p><p>Perera</p></div>
                        <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Telephone No: </p><p> +94 71 456 9631</p></div>
                    </div>
                </div>
                <div className='ml-6'>
                    <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Email: </p><p>hello@relume.io</p></div>
                    <div className='flex justify-start p-[2px] font-sans'><p className='font-bold pr-4'>Address </p><p> No:221B, Baker street, London</p></div>
                </div>

                <div className='mt-4 flex justify-end gap-5 mr-8'>                   
                    <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="success"
                    className="h-9 bg-green-500"
                    >
                        Delete
                    </Button>
                    <Button
                    onClick={handleDelete}
                    variant="outlined"
                    color="success"
                    className="h-9 bg-green-500"
                    >
                        Delete
                    </Button>
                </div>

            </div>

        </div>

    </div>
  )
}

export default EmployeePopup

