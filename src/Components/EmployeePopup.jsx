import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, message, Popconfirm } from 'antd';

function EmployeePopup({ visible, onClose, data, onDelete, onUpdate }) {
    const handleOnClose = (e) => {
        if (e.target.id === 'popup-container') onClose();
    };

    if (!visible || !data) return null;

    const confirm = e => {
    console.log(e);
    message.success('Click on Yes');
    };
    const cancel = e => {
    console.log(e);
    message.error('Click on No');
    };

    return (
        <div
            id="popup-container"
            onClick={handleOnClose}
    className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm"
        >
    <div className="flex mt-20 min-h-screen items-start justify-center px-4 py-8">
        <div className="relative w-full max-w-3xl rounded-xl bg-white px-8 py-6 shadow-2xl">                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    className="!absolute right-4 top-4 text-gray-600 hover:text-black"
                >
                    <CloseIcon />
                </IconButton>

                {/* Header */}
                <div className="mb-6 border-b pb-4 text-left">
                    <h2 className="text-3xl font-bold text-gray-800 text-left">{data.fullName}</h2>
                    <p className="text-sm text-gray-500 mt-1 text-left">
                        {data.designation} | ID: {data.employeeId}
                    </p>
                </div>

                {/* Info Sections */}
                <div className="space-y-6 text-sm text-left">
                    {/* Basic Info */}
                    <Section title="Basic Information">
                        <Grid>
                            <Info label="First Name"  value={data.firstName} />
                            <Info label="Last Name" value={data.lastName} />
                            <Info label="Name with Initials" value={data.name} />
                            <Info label="NIC Number" value={data.nic} />
                            <Info label="Department" value={data.department} />
                            <Info label="Designation" value={data.designation} />
                            <Info label="Age" value={data.age} />
                            <Info label="Hired Date" value={data.hiredDate} />
                            <Info label="EPF Number" value={data.epf} />

                        </Grid>
                    </Section>

                    {/* Contact Info */}
                    <Section title="Contact Information">
                        <Grid>
                            <Info label="Company Email" value={data.companyemail} />
                            <Info label="Private Email" value={data.email} />
                            <Info label="Telephone" value={data.telephone} />
                            <Info label="Address" value={data.address} colSpan />
                        </Grid>
                    </Section>
                </div>

                {/* Buttons */}
                <div className="mt-4 mb-4 flex justify-end gap-4">
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this employee?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger onClick={() => onDelete(data.id)}>Delete</Button>
                    </Popconfirm>
                    <Button onClick={() => onUpdate(data.id)} variant="outlined" color="success">
                        Update
                    </Button>
                </div>
            </div>
            </div>
        </div>
    );
}

// Reusable section block
const Section = ({ title, children }) => (
    <div>
        <h3 className="mb-3 text-lg font-semibold text-green-700">{title}</h3>
        {children}
    </div>
);

// Responsive grid
const Grid = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">{children}</div>
);

// Info display component
const Info = ({ label, value, colSpan }) => (
    <div className={`${colSpan ? 'col-span-full' : ''} flex flex-col gap-1`}>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="text-sm text-gray-800 bg-gray-100 rounded-md px-4 py-2 border border-gray-200">
            {value || '—'}
        </div>
    </div>
);


export default EmployeePopup;
