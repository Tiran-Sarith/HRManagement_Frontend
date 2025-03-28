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
import { Button, Modal, message } from 'antd';
import { useState, useRef } from 'react';
import EmployeeAssigning from './EmployeeAssigning';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, id, client, deadline, estimatedBudget, estimatedDuration) {
  return { name, id, client, deadline, estimatedBudget, estimatedDuration };
}

export default function ProjectsPending() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const employeeAssigningRef = useRef(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const pendingProjects = response.data.filter(project => project.projectStatus === 'Pending');
      setRows(pendingProjects.map(project => createData(
        project.projectName,
        project._id,
        project.projectManager,
        project.projectDeadline,
        project.projectBudget,
        project.projectDuration
      )));
    } catch (error) {
      console.error('Error fetching pending projects:', error);
    }
  };

  const showModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  // Handle start project and assign employees
  const handleStart = async () => {
    try {
      if (!selectedProjectId) {
        message.error('No project selected');
        return;
      }

      // First check if ref exists and call handleAssignEmployees
      if (employeeAssigningRef.current && employeeAssigningRef.current.handleAssignEmployees) {
        const employeeAssignSuccess = await employeeAssigningRef.current.handleAssignEmployees();
        
        if (employeeAssignSuccess) {
          // Then update project status
          await axios.put(`${API_BASE_URL}projects/Pupdate/${selectedProjectId}`, {
            projectStatus: 'Inprogress'
          });

          // Remove from pending list
          setRows(rows.filter(row => row.id !== selectedProjectId));
          message.success('Project started successfully');
          setIsModalOpen(false);
        }
      } else {
        message.error('Employee assignment component is not properly initialized');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      message.error('Failed to start project');
    }
  };

  return (
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
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
              <StyledTableCell align="right">{row.client}</StyledTableCell>
              <StyledTableCell align="right">{row.deadline}</StyledTableCell>
              <StyledTableCell align="right">{row.estimatedBudget}</StyledTableCell>
              <StyledTableCell align="right">{row.estimatedDuration}</StyledTableCell>
              <StyledTableCell align="center">
                <Button className='bg-black text-white' onClick={() => showModal(row.id)}>
                  Start
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal 
        width={1000} 
        className='mr-36' 
        title="Assign Employees To Project" 
        open={isModalOpen} 
        onOk={handleStart} 
        onCancel={handleCancel}
      >
        {selectedProjectId && (
          <EmployeeAssigning 
            projectId={selectedProjectId} 
            ref={employeeAssigningRef} 
          />
        )}
      </Modal>
    </TableContainer>
  );
}