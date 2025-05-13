import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Grid, 
  Divider, 
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

const { Option } = Select;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Modern theme with green accents and white base - matching the employee form design
const customTheme = (outerTheme) =>
  createTheme({
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        color: '#2e7d32',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#4caf50',
      },
    },
    palette: {
      mode: outerTheme.palette.mode,
      primary: {
        main: "#2e7d32", // Green for primary
        dark: "#1b5e20",
        light: "#4caf50",
        contrastText: '#ffffff',
      },
      success: {
        main: '#4caf50',
        dark: '#2e7d32',
      },
      background: {
        default: '#f9f9f9',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
      divider: 'rgba(0, 0, 0, 0.08)',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            borderRadius: 12,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            margin: '24px 0',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: 24,
            paddingBottom: 24,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          containedPrimary: {
            backgroundColor: "#2e7d32",
            '&:hover': {
              backgroundColor: '#2e7d32',
            },
          },
          outlinedPrimary: {
            borderColor: '#4caf50',
            color: "#2e7d32",
            '&:hover': {
              borderColor: '#2e7d32',
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
            },
          },
        },
      },
    },
  });

function MembersAccounts() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const outerTheme = useTheme();

  // State for cancel confirmation dialog
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // State for snackbar notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleUserCreate = async (values) => {
    try {
      setLoading(true);
      
      // Prepare data according to your backend API structure
      const userData = {
        name: values.EmployeeName,
        department: values.Department,
        employeeId: values.EmployeeID,
        role: values.role.toLowerCase(), // Convert to lowercase to match enum in model
        email: values.email,
        password: values.password
      };

      // Make API call to your backend endpoint
      const response = await axios.post(`${API_BASE_URL}user/register`, userData);
      
      if (response.status === 201) {
        showSnackbar('User created successfully!', 'success');
        form.resetFields(); // Reset form after successful submission
        
        // Navigate back after successful creation
        setTimeout(() => {
          navigate('/membersaccounts');
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Open cancel confirmation dialog
  const handleCancelClick = () => {
    setCancelDialogOpen(true);
  };

  // Close cancel confirmation dialog
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  // Confirm cancel action
  const handleConfirmCancel = () => {
    form.resetFields();
    setCancelDialogOpen(false);
    navigate('/membersaccounts');
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

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate('/membersaccounts')}>
          <IconButton size="small" sx={{ p: 0, pr: 1, color: 'primary.main' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body1" sx={{ color: 'primary.main' }}>
            Back to Member Accounts
          </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ 
          padding: 4, 
          mb: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.light",
          position: "relative",
          overflow: "hidden" 
        }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              bgcolor: "primary.main",
            }}
          />
          <Typography variant="h5" sx={{color:'primary.dark'}} className='text-left' gutterBottom>
            <PersonAddIcon sx={{ mr: 1 }} />
            Create Member Account
          </Typography>
          <Typography 
            variant="subtitle1" 
            gutterBottom 
            sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }} 
            className='text-left font-semibold'
          >
            Fill in the information below to create a new member account
          </Typography>

          <Form
            form={form}
            name="register"
            onFinish={handleUserCreate}
            layout="vertical"
            requiredMark={true}
          >
            <Grid container spacing={2}>
              {/* User Information Section */}
              <Grid item xs={12}>
                <Typography variant="body1" fontSize={18} align='left' fontWeight={700} color="text.primary">
                  User Information
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="EmployeeName"
                  label="Employee Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input employee name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter employee name" />
                </Form.Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="EmployeeID"
                  label="Employee ID"
                  rules={[
                    {
                      required: true,
                      message: 'Please input employee ID!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter employee ID" />
                </Form.Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="Department"
                  label="Department"
                  rules={[
                    {
                      required: true,
                      message: 'Please input department!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter department" />
                </Form.Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a role!',
                    },
                  ]}
                >
                  <Select size="large" placeholder="Select role">
                    <Option value="member">Member</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </Form.Item>
              </Grid>

              {/* Account Information Section */}
              <Grid item xs={12}>
                <Typography variant="body1" fontSize={18} align='left' fontWeight={700} color="text.primary" sx={{ mt: 2 }}>
                  Account Information
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not a valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter email address" />
                </Form.Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password size="large" placeholder="Enter password" />
                </Form.Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="Confirm password" />
                </Form.Item>
              </Grid>

              {/* Form Actions */}
              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={handleCancelClick} 
                  disabled={loading}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SaveIcon />}
                  onClick={() => form.submit()}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Paper>

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={cancelDialogOpen}
          onClose={handleCloseCancelDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ color: "#ff9800" }}>
            <InfoIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Confirm Cancel
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to cancel creating this account? All entered information
              will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: "16px" }}>
            <Button
              onClick={handleCloseCancelDialog}
              color="primary"
              variant="outlined"
            >
              Continue Editing
            </Button>
            <Button
              onClick={handleConfirmCancel}
              color="warning"
              variant="contained"
              autoFocus
            >
              Discard Changes
            </Button>
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
      </Container>
    </ThemeProvider>
  );
}

export default MembersAccounts;