import React from 'react'
import Button from "@mui/material/Button";

function EmployeePopup({visible, onClose, data, onDelete, onUpdate}) {
    const handleOnClose = (e)=> {
        if(e.target.id === "container") onClose()
    };

    if (!visible || !data) return null;

    return (
        <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-green-50 p-2 rounded-3xl w-[600px] font-sans h-[550px]'>
                <div className='mt-12'>
                <p className='text-4xl font-bold'>{data.name}</p>
                    <div className='flex justify-evenly'>
                        <div className='mt-6'>
                            <div className='flex justify-between p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Designation: </p>
                                <p>{data.designation}</p>
                            </div>
                            <div className='flex justify-between p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Employee ID:</p>
                                <p>{data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 mb-3'>
                        <div className='flex justify-between mx-[32.5px]'>
                            <div className='flex justify-between p-[2px] font-sans'>
                                <p className='font-bold pr-1'>Email:</p>
                                <p>{data.email}</p>
                            </div>
                            <div className='flex justify-between p-[2px] font-sans'>
                                <p className='font-bold pr-1'>Department: </p>
                                <p>{data.department}</p>
                            </div>
                        </div>
                    </div>

                    <hr className='border border-gray-400'/>

                    <p className='font-bold font-sans text-green-600 text-start ml-[32.5px] mt-2'>Personal Information</p>

                    <div className='grid grid-flow-col mx-6 mt-4'>
                        <div className=''>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Full Name: </p>
                                <p>{data.fullName}</p>
                            </div>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>First name: </p>
                                <p>{data.firstName}</p>
                            </div>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>NIC No: </p>
                                <p>{data.nic}</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Name with Initials:</p>
                                <p>{data.name}</p>
                            </div>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Last name: </p>
                                <p>{data.lastName}</p>
                            </div>
                            <div className='flex justify-start p-[2px] font-sans'>
                                <p className='font-bold pr-4'>Telephone No: </p>
                                <p>{data.telephone}</p>
                            </div>
                        </div>
                    </div>

                    <div className='ml-6'>
                        <div className='flex justify-start p-[2px] font-sans'>
                            <p className='font-bold pr-4'>Email: </p>
                            <p>{data.email}</p>
                        </div>
                        <div className='flex justify-start p-[2px] font-sans'>
                            <p className='font-bold pr-4'>Address </p>
                            <p>{data.address}</p>
                        </div>
                    </div>

                    <div className='mt-4 flex justify-end gap-5 mr-8'>
                        <Button
                            onClick={() => onDelete(data.id)}
                            variant="contained"
                            color="error"
                            className="h-9"
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => onUpdate(data.id)}
                            variant="outlined"
                            color="success"
                            className="h-9"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeePopup;