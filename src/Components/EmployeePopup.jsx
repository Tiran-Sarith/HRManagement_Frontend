import React, { useState } from 'react';
import { IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button as MuiButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, message, Popconfirm } from 'antd';


function EmployeePopup({ visible, onClose, data, onDelete, onUpdate }) {
    // State for delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    // State for snackbar notifications
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const handleOnClose = (e) => {
        if (e.target.id === 'popup-container') onClose();
    };

    // Open delete confirmation dialog
    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    // Close delete confirmation dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    // Handle confirm delete
    const handleConfirmDelete = () => {
        try {
            onDelete(data.id);
            showSnackbar("Employee deleted successfully!", "success");
            setTimeout(() => {
                onClose(); // Close the popup after successful deletion
            }, 1500);
        } catch (error) {
            console.error("Error deleting employee:", error);
            showSnackbar("Error deleting employee: " + error.message, "error");
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    // Show snackbar with custom message and severity
    const showSnackbar = (message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // Close snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    if (!visible || !data) return null;

    return (
        <div
            id="popup-container"
            onClick={handleOnClose}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm"
        >
            <div className="flex mt-20 min-h-screen items-start justify-center px-4 py-8">
                <div className="relative w-full max-w-3xl rounded-xl bg-white px-8 py-6 shadow-2xl">
                    {/* Close Button */}
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
                    <div className="mt-8 flex justify-end gap-4">
                        <MuiButton
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </MuiButton>
                        <MuiButton
                            variant="outlined"
                            color="success"
                            startIcon={<EditIcon />}
                            onClick={() => onUpdate(data.id)}
                        >
                            Update
                        </MuiButton>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ color: "#d32f2f" }}>
                    Delete Employee
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the employee "{data.fullName}"? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: "16px" }}>
                    <MuiButton
                        onClick={handleCloseDeleteDialog}
                        variant="outlined"
                    >
                        Cancel
                    </MuiButton>
                    <MuiButton
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        autoFocus
                    >
                        Delete
                    </MuiButton>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    elevation={6}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
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