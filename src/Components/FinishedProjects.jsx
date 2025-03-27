// // //FinishedProjects.jsx
// // import * as React from 'react';
// // import { styled } from '@mui/material/styles';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';
// // import TablePagination from '@mui/material/TablePagination';
// // import axios from 'axios';

// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// //   [`&.${tableCellClasses.head}`]: {
// //     backgroundColor: theme.palette.common.black,
// //     color: theme.palette.common.white,
// //   },
// //   [`&.${tableCellClasses.body}`]: {
// //     fontSize: 14,
// //   },
// // }));

// // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //   '&:nth-of-type(odd)': {
// //     backgroundColor: theme.palette.action.hover,
// //   },
// //   // hide last border
// //   '&:last-child td, &:last-child th': {
// //     border: 0,
// //   },
// // }));

// // function createData(name,id, client, deadline, estimatedBudget, estimatedDuration) {
// //   return { name,id, client, deadline, estimatedBudget, estimatedDuration };
// // }


// // export default function FinishedProjects() {
// //   const [page, setPage] = React.useState(0);
// //   const [rowsPerPage, setRowsPerPage] = React.useState(8);
// //   const [rows, setRows] = React.useState([]);

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   React.useEffect(() => {
// //     fetchFinishedProjects();
// //   }, []);

// //   const fetchFinishedProjects = async () => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}projects/Pview`);
// //       const finishedProjects = response.data.filter(project => project.projectStatus === 'Finished');
// //       setRows(finishedProjects.map(project => createData(
// //         project.projectName,
// //         project._id,
// //         project.projectManager,
// //         project.projectDeadline,
// //         project.projectBudget,
// //         project.projectDuration
// //       )));
// //     } catch (error) {
// //       console.error('Error fetching finished projects:', error);
// //     }
// //   };

// //   return (
// //     <TableContainer component={Paper}>
// //       <Table sx={{ minWidth: 700 }} aria-label="customized table">
// //         <TableHead>
// //           <TableRow>
// //             <StyledTableCell>Project Name</StyledTableCell>
// //             <StyledTableCell align="right">Project ID</StyledTableCell>
// //             <StyledTableCell align="right">Client</StyledTableCell>
// //             <StyledTableCell align="right">Deadline</StyledTableCell>
// //             <StyledTableCell align="right">Budget($)</StyledTableCell>
// //             <StyledTableCell align="right">Duration(Weeks)</StyledTableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
// //             <StyledTableRow key={row.name}>
// //               <StyledTableCell component="th" scope="row">
// //                 {row.name}
// //               </StyledTableCell>
// //               <StyledTableCell align="right">{row.id}</StyledTableCell>
// //               <StyledTableCell align="right">{row.client}</StyledTableCell>
// //               <StyledTableCell align="right">{row.deadline}</StyledTableCell>
// //               <StyledTableCell align="right">{row.estimatedBudget}</StyledTableCell>
// //               <StyledTableCell align="right">{row.estimatedDuration}</StyledTableCell>
// //             </StyledTableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //       <TablePagination
// //         rowsPerPageOptions={[5, 10, 25]}
// //         component="div"
// //         count={rows.length}
// //         rowsPerPage={rowsPerPage}
// //         page={page}
// //         onPageChange={handleChangePage}
// //         onRowsPerPageChange={handleChangeRowsPerPage}
// //       />
// //     </TableContainer>
// //   );
// // }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   TablePagination,
//   Box,
//   Chip,
//   Typography
// } from '@mui/material';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function FinishedProjects() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(8);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     fetchFinishedProjects();
//   }, []);

//   const fetchFinishedProjects = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}projects/Pview`);
//       const finishedProjects = response.data.filter(project => project.projectStatus === 'Finished');
//       setRows(finishedProjects);
//     } catch (error) {
//       console.error('Error fetching finished projects:', error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Format the date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <Box sx={{ width: '100%', padding: 2 }}>
//       <Typography 
//         variant="h4" 
//         gutterBottom 
//         sx={{ 
//           marginBottom: 3, 
//           fontWeight: 600, 
//           color: 'text.primary' 
//         }}
//       >
//         Completed Projects
//       </Typography>
//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Project Name</TableCell>
//               <TableCell>Project ID</TableCell>
//               <TableCell>Client</TableCell>
//               <TableCell>Deadline</TableCell>
//               <TableCell>Budget ($)</TableCell>
//               <TableCell>Duration (Weeks)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
//               <TableRow 
//                 key={project._id} 
//                 hover
//               >
//                 <TableCell>{project.projectName}</TableCell>
//                 <TableCell>{project._id}</TableCell>
//                 <TableCell>{project.projectManager}</TableCell>
//                 <TableCell>
//                   <Chip 
//                     label={formatDate(project.projectDeadline)} 
//                     color="success" 
//                     size="small" 
//                     variant="outlined"
//                   />
//                 </TableCell>
//                 <TableCell>{project.projectBudget}</TableCell>
//                 <TableCell>{project.projectDuration}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 8, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  Box,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom theme with green palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Dark green
      light: '#4CAF50', // Lighter green
      dark: '#1B5E20', // Darker green
    },
    background: {
      default: '#F1F8E9', // Light green background
      paper: '#ffffff' // Lighter paper background
    }
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E7D32',
          color: 'white'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: '#2E7D32'
        }
      }
    }
  }
});

export default function FinishedProjects() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchFinishedProjects();
  }, []);

  const fetchFinishedProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/Pview`);
      const finishedProjects = response.data.filter(project => project.projectStatus === 'Finished');
      setRows(finishedProjects);
    } catch (error) {
      console.error('Error fetching finished projects:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', padding: 2, backgroundColor: theme.palette.background.default }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            marginBottom: 3, 
            fontWeight: 600, 
            color: theme.palette.primary.dark 
          }}
        >
          Completed Projects
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Budget ($)</TableCell>
                <TableCell>Duration (Weeks)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                <TableRow 
                  key={project._id} 
                  hover
                >
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project._id}</TableCell>
                  <TableCell>{project.projectManager}</TableCell>
                  <TableCell>{formatDate(project.projectDeadline)}</TableCell>
                  <TableCell>{project.projectBudget}</TableCell>
                  <TableCell>{project.projectDuration}</TableCell>
                </TableRow>
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
      </Box>
    </ThemeProvider>
  );
}