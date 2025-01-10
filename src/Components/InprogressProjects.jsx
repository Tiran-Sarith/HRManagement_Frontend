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
import Button from '@mui/material/Button';
import axios from 'axios';

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
}));

function createData(name,id, client, deadline, estimatedBudget, estimatedDuration) {
  return { name,id, client, deadline, estimatedBudget, estimatedDuration };
}


export default function InprogressProjects() {
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
    fetchInProgressProjects();
  }, []);

  const fetchInProgressProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8070/projects/Pview');
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

  const handleFinish = async (id) => {
    if (window.confirm('Are you sure you want to finish this project?')) {
      try {
        await axios.put(`http://localhost:8070/projects/Pupdate/${id}`, {
          projectStatus: 'Finished'
        });
        // Remove from in-progress list
        setRows(rows.filter(row => row.id !== id));
      } catch (error) {
        console.error('Error updating project status:', error);
      }
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
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
              <StyledTableCell align="right">{row.client}</StyledTableCell>
              <StyledTableCell align="right">{row.deadline}</StyledTableCell>
              <StyledTableCell align="right">{row.estimatedBudget}</StyledTableCell>
              <StyledTableCell align="right">{row.estimatedDuration}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="contained" sx={{backgroundColor: 'black'}} onClick={() => handleFinish(row.id)}>
                  Finish
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
    </TableContainer>
  );
}
