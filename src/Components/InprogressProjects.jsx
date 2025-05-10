import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button as AntButton, Modal, List, Card, Typography, Spin, Tabs, Divider } from 'antd';
import { 
  Snackbar, 
  Alert, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button,
  Box,
  Grid
} from '@mui/material';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2E7D32',
    fontWeight: 500,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));

function createData(name, id, client, deadline, estimatedBudget, estimatedDuration, description) {
  return { name, id, client, deadline, estimatedBudget, estimatedDuration, description };
}

export default function InprogressProjects() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  // New state for snackbar notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // New state for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    projectId: null
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchInProgressProjects();
  }, []);

  const fetchInProgressProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const inProgressProjects = response.data.filter(project => project.projectStatus === 'Inprogress');
      setRows(inProgressProjects.map(project => createData(
        project.projectName,
        project._id,
        project.projectManager,
        project.projectDeadline,
        project.projectBudget,
        project.projectDuration,
        project.projectDescription
      )));
    } catch (error) {
      console.error('Error fetching in-progress projects:', error);
      setSnackbar({
        open: true,
        message: 'Error loading projects. Please try again.',
        severity: 'error'
      });
    }
  };

  const fetchEmployeesByProject = async (projectId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}employee/Eview`);
      // Filter employees who are assigned to the selected project
      const assignedEmployees = response.data.filter(
        employee => employee.employee_current_project_id === projectId
      );
      setProjectEmployees(assignedEmployees);
    } catch (error) {
      console.error('Error fetching employees for project:', error);
      setSnackbar({
        open: true,
        message: 'Error loading team members. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const showModal = (row) => {
    setSelectedProject(row);
    fetchEmployeesByProject(row.id);
    setIsModalOpen(true);
    setActiveTab('details'); // Default to details tab when opening modal
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProjectEmployees([]);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({...snackbar, open: false});
  };

  const openConfirmDialog = (id, e) => {
    if (e) {
      e.stopPropagation(); // Prevent row click event
    }
    setConfirmDialog({
      open: true,
      projectId: id
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      projectId: null
    });
  };

  const handleFinish = async () => {
    const id = confirmDialog.projectId;
    closeConfirmDialog();
    
    try {
      // First, update the project status to 'Finished'
      await axios.put(`${API_BASE_URL}projects/Pupdate/${id}`, {
        projectStatus: 'Finished'
      });

      // Then, call the new endpoint to clear project assignments for employees
      await axios.post(`${API_BASE_URL}employee/clearProjectAssignments/${id}`);

      // Remove from in-progress list
      setRows(rows.filter(row => row.id !== id));

      // Show success message
      setSnackbar({
        open: true,
        message: 'Project marked as finished and employee assignments cleared.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating project status:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred while finishing the project.',
        severity: 'error'
      });
    }
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="left">Project ID</StyledTableCell>
              <StyledTableCell align="left">Client</StyledTableCell>
              <StyledTableCell align="left">Deadline</StyledTableCell>
              <StyledTableCell align="left">Budget($)</StyledTableCell>
              <StyledTableCell align="left">Duration(Weeks)</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow
                key={row.name}
                onClick={() => showModal(row)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.id}</StyledTableCell>
                <StyledTableCell align="left">{row.client}</StyledTableCell>
                <StyledTableCell align="left">{formatDate(row.deadline)}</StyledTableCell>
                <StyledTableCell align="left">{row.estimatedBudget}</StyledTableCell>
                <StyledTableCell align="left">{row.estimatedDuration}</StyledTableCell>
                <StyledTableCell align="center">
                  <AntButton
                    onClick={(e) => openConfirmDialog(row.id, e)}
                    type="primary"
                    style={{ backgroundColor: 'green' }}
                  >
                    Finish
                  </AntButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 8, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Project Details and Team Members Modal */}
      <Modal
        title={selectedProject ? `Project: ${selectedProject.name}` : "Project Information"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <AntButton 
            key="finish" 
            type="primary" 
            style={{ backgroundColor: 'green' }}
            onClick={() => selectedProject && openConfirmDialog(selectedProject.id)}
          >
            Finish Project
          </AntButton>,
          <AntButton key="back" onClick={handleCancel}>
            Close
          </AntButton>
        ]}
      >
        {selectedProject && (
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            type="card"
            style={{ marginBottom: '20px' }}
          >
            <TabPane tab="Project Details" key="details">
              <Card bordered={false}>
                <Box sx={{ p: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Title level={4}>{selectedProject.name}</Title>
                      <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Text strong>Project ID:</Text>
                      <Paragraph style={{ marginTop: '4px' }}>{selectedProject.id}</Paragraph>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Text strong>Client:</Text>
                      <Paragraph style={{ marginTop: '4px' }}>{selectedProject.client}</Paragraph>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Text strong>Deadline:</Text>
                      <Paragraph style={{ marginTop: '4px' }}>{formatDate(selectedProject.deadline)}</Paragraph>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Text strong>Budget:</Text>
                      <Paragraph style={{ marginTop: '4px' }}>${selectedProject.estimatedBudget}</Paragraph>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Text strong>Duration:</Text>
                      <Paragraph style={{ marginTop: '4px' }}>{selectedProject.estimatedDuration} weeks</Paragraph>
                    </Grid>
                    
                    <Grid item xs={12} style={{ marginTop: '8px' }}>
                      <Text strong>Description:</Text>
                      <Card 
                        style={{ 
                          marginTop: '8px', 
                          backgroundColor: '#f9f9f9', 
                          borderRadius: '4px'
                        }}
                      >
                        <Text>
                          {selectedProject.description || "No description provided."}
                        </Text>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </TabPane>
            
            <TabPane tab="Team Members" key="team">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin size="large" />
                  <p>Loading employees...</p>
                </div>
              ) : projectEmployees.length > 0 ? (
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={projectEmployees}
                  renderItem={employee => (
                    <List.Item>
                      <Card>
                        <Title level={4}>{employee.employee_full_name}</Title>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <p><Text strong>Employee ID:</Text> {employee.employee_id}</p>
                            <p><Text strong>Designation:</Text> {employee.employee_designation || 'N/A'}</p>
                            <p><Text strong>Email:</Text> {employee.employee_email}</p>
                          </div>
                          <div>
                            <p><Text strong>Department:</Text> {employee.employee_department}</p>
                            <p><Text strong>Phone:</Text> {employee.employee_telephone}</p>
                            <p><Text strong>Address:</Text> {employee.employee_address}</p>
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Title level={4}>No employees assigned to this project</Title>
                  <p>There are currently no team members assigned to this project.</p>
                </div>
              )}
            </TabPane>
          </Tabs>
        )}
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Project Completion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to finish this project? This will mark the project as completed and remove all employee assignments.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinish} color="primary" variant="contained" autoFocus>
            Finish Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}