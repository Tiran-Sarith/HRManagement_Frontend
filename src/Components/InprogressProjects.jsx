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
import { Button, Modal, List, Card, Typography, Spin } from 'antd';

const { Title, Text } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
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

function createData(name, id, client, deadline, estimatedBudget, estimatedDuration) {
  return { name, id, client, deadline, estimatedBudget, estimatedDuration };
}

export default function InprogressProjects() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

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
        project.projectDuration
      )));
    } catch (error) {
      console.error('Error fetching in-progress projects:', error);
    }
  };

  const fetchEmployeesByProject = async (projectId) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8070/employee/Eview');
      // Filter employees who are assigned to the selected project
      const assignedEmployees = response.data.filter(
        employee => employee.employee_current_project_id === projectId
      );
      setProjectEmployees(assignedEmployees);
    } catch (error) {
      console.error('Error fetching employees for project:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (row) => {
    setSelectedProject(row);
    fetchEmployeesByProject(row.id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProjectEmployees([]);
  };

  const handleFinish = async (id) => {
    if (window.confirm('Are you sure you want to finish this project?')) {
      try {
        // First, update the project status to 'Finished'
        await axios.put(`http://localhost:8070/projects/Pupdate/${id}`, {
          projectStatus: 'Finished'
        });
        
        // Then, call the new endpoint to clear project assignments for employees
        await axios.post(`http://localhost:8070/employee/clearProjectAssignments/${id}`);
        
        // Remove from in-progress list
        setRows(rows.filter(row => row.id !== id));
        
        // Optional: Show success message
        alert('Project marked as finished and employee assignments cleared.');
      } catch (error) {
        console.error('Error updating project status:', error);
        alert('An error occurred while finishing the project.');
      }
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
              <StyledTableCell align="right">Project ID</StyledTableCell>
              <StyledTableCell align="right">Client</StyledTableCell>
              <StyledTableCell align="right">Deadline</StyledTableCell>
              <StyledTableCell align="right">Budget($)</StyledTableCell>
              <StyledTableCell align="right">Duration(Weeks)</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
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
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.client}</StyledTableCell>
                <StyledTableCell align="right">{formatDate(row.deadline)}</StyledTableCell>
                <StyledTableCell align="right">{row.estimatedBudget}</StyledTableCell>
                <StyledTableCell align="right">{row.estimatedDuration}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      handleFinish(row.id);
                    }} 
                    type="primary"
                    style={{ backgroundColor: 'black' }}
                  >
                    Finish
                  </Button>
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

      <Modal 
        title={selectedProject ? `Team Members for ${selectedProject.name}` : "Project Team"}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
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
      </Modal>
    </div>
  );
}