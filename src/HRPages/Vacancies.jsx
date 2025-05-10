import React, { useEffect, useState } from "react";
import {useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Dialog,
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch all vacancies
  const getVacancies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}vacancies/Vview`);
      const formattedVacancies = response.data.map((vacancy, index) => ({
        id: vacancy._id, // Use MongoDB _id as the unique identifier
        JobName: vacancy.jobTitle,
        JobType: vacancy.hireType,
        Department: vacancy.department,
        Created: vacancy.postedDate,
        Deadline: vacancy.deadline,
        // Store all vacancy data for potential updates
        originalData: vacancy
      }));
      setRows(formattedVacancies);
      setVacancies(response.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      showSnackbar("Error fetching vacancies: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  // Open delete confirmation dialog
  const handleDeleteClick = (id) => {
    const vacancy = rows.find(row => row.id === id);
    if (vacancy) {
      setVacancyToDelete(vacancy);
      setDeleteDialogOpen(true);
    }
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setVacancyToDelete(null);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!vacancyToDelete) return;
    
    try {
      setLoading(true);
      // Make DELETE request to backend
      await axios.delete(`${API_BASE_URL}vacancies/Vdelete/${vacancyToDelete.id}`);
      
      // Update local state after successful deletion
      setRows(prevRows => prevRows.filter(row => row.id !== vacancyToDelete.id));
      showSnackbar("Vacancy deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      showSnackbar("Error deleting vacancy: " + error.message, "error");
    } finally {
      setLoading(false);
      handleCloseDeleteDialog();
    }
  };

  const handleUpdate = (id) => {
    // Find the vacancy data to update
    const vacancyToUpdate = rows.find(row => row.id === id);
    if (!vacancyToUpdate) return;

    // Store the vacancy data in localStorage for use in the update form
    localStorage.setItem('vacancyToUpdate', JSON.stringify(vacancyToUpdate.originalData));
    
    // Navigate to update page
    navigate("/vacanciesUpdate");
  };

  const handleAddVacancy = () => {
    navigate("/vacanciesAdd");
  };

  const handleApplicationVacancies = (id) => {
    navigate(`/vacancies/${id}`);
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

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "JobName", headerName: "Job Name", width: 130 },
    { field: "JobType", headerName: "Job Type", width: 130 },
    { field: "Department", headerName: "Department", width: 130 },
    { field: "Created", headerName: "Created", width: 90 },
    { field: "Deadline", headerName: "Deadline", width: 160 },
    {
      field: "View",
      headerName: "Applications",
      width: 140,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          startIcon={<VisibilityIcon />}
          size="small"
          onClick={() => handleApplicationVacancies(params.id)}
        >
          View
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          size="small"
          onClick={() => handleUpdate(params.id)}
          sx={{ 
            borderColor: '#2196f3',
            color: '#2196f3',
            '&:hover': {
              borderColor: '#0d47a1',
              backgroundColor: '#e3f2fd'
            }
          }}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Remove",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={() => handleDeleteClick(params.id)}
          sx={{ 
            borderColor: '#f44336',
            color: '#f44336',
            '&:hover': {
              borderColor: '#d32f2f',
              backgroundColor: '#ffebee'
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Card sx={{ maxWidth: 275 }} className="mb-6">
          <CardContent>
            <Typography variant="h5" component="div" className="flex justify-start">
              Total Vacancies
            </Typography>
            <Typography variant="h5" component="div" className="flex justify-start pt-3">
              {rows.length}
            </Typography>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={2} className="mr-36 mt-5">
          <Button
            onClick={handleAddVacancy}
            variant="contained"
            color="success"
            className="h-9 bg-green-500"
            startIcon={<AddIcon />}
          >
            Add Vacancies
          </Button>
        </Stack>
      </div>
      
      <div style={{ height: 450, width: "90%" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <CircularProgress style={{ color: "#4CAF50" }} />
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 6 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#d32f2f" }}>
          Delete Vacancy
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the vacancy "{vacancyToDelete?.JobName}"? 
            This action cannot be undone and will also remove all associated applications.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained" 
            autoFocus
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}






















// import React, { useEffect, useState } from "react";
// import {useTheme } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
// import { DataGrid } from "@mui/x-data-grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export default function Vacancies() {
//   const [vacancies, setVacancies] = useState([]);
//   const [rows, setRows] = useState([]);
//   const theme = useTheme();
//   const navigate = useNavigate();

//   // Fetch all vacancies
//   const getVacancies = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}vacancies/Vview`);
//       const formattedVacancies = response.data.map((vacancy, index) => ({
//         id: vacancy._id, // Use MongoDB _id as the unique identifier
//         JobName: vacancy.jobTitle,
//         JobType: vacancy.hireType,
//         Department: vacancy.department,
//         Created: vacancy.postedDate,
//         Deadline: vacancy.deadline,
//         // Store all vacancy data for potential updates
//         originalData: vacancy
//       }));
//       setRows(formattedVacancies);
//       setVacancies(response.data);
//     } catch (error) {
//       console.error("Error fetching vacancies:", error);
//       alert("Error fetching vacancies: " + error.message);
//     }
//   };

//   useEffect(() => {
//     getVacancies();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       // Find the original vacancy data
//       const vacancyToDelete = rows.find(row => row.id === id);
//       if (!vacancyToDelete) return;

//       // Make DELETE request to backend
//       await axios.delete(`${API_BASE_URL}vacancies/Vdelete/${vacancyToDelete.id}`);
      
//       // Update local state after successful deletion
//       setRows(prevRows => prevRows.filter(row => row.id !== id));
//       alert("Vacancy deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting vacancy:", error);
//       alert("Error deleting vacancy: " + error.message);
//     }
//   };

//   const handleUpdate = (id) => {
//     // Find the vacancy data to update
//     const vacancyToUpdate = rows.find(row => row.id === id);
//     if (!vacancyToUpdate) return;

//     // Store the vacancy data in localStorage for use in the update form
//     localStorage.setItem('vacancyToUpdate', JSON.stringify(vacancyToUpdate.originalData));
    
//     // Navigate to update page
//     navigate("/vacanciesUpdate");
//   };

//   const handleAddVacancy = () => {
//     navigate("/vacanciesAdd");
//   };

//   const handleApplicationVacancies = (id) => {
//     navigate(`/vacancies/${id}`);
//   };

//   const columns = [
//     // { field: "id", headerName: "ID", width: 70 },
//     { field: "JobName", headerName: "Job Name", width: 130 },
//     { field: "JobType", headerName: "Job Type", width: 130 },
//     { field: "Department", headerName: "Department", width: 130 },
//     { field: "Created", headerName: "Created", width: 90 },
//     { field: "Deadline", headerName: "Deadline", width: 160 },
//     {
//       field: "View",
//       headerName: " ",
//       width: 180,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => handleApplicationVacancies(params.id)}
//         >
//           Applications
//         </Button>
//       ),
//     },

//     {
//       field: "delete",
//       headerName: " ",
//       width: 130,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="success"
//           onClick={() => handleDelete(params.id)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//     {
//       field: "update",
//       headerName: " ",
//       width: 130,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="success"
//           onClick={() => handleUpdate(params.id)}
//         >
//           Update
//         </Button>
//       ),
//     },
    
//   ];

//   return (
//     <div>
//       <div className="flex justify-between">
//         <Card sx={{ maxWidth: 275 }} className="mb-6">
//           <CardContent>
//             <Typography variant="h5" component="div" className="flex justify-start">
//               Total Vacancies
//             </Typography>
//             <Typography variant="h5" component="div" className="flex justify-start pt-3">
//               {rows.length}
//             </Typography>
//           </CardContent>
//         </Card>
//         <Stack direction="row" spacing={2} className="mr-36 mt-5">
//           <Button
//             onClick={handleAddVacancy}
//             variant="contained"
//             color="success"
//             className="h-9 bg-green-500"
//             startIcon={<AddIcon />}
//           >
//             Add Vacancies
//           </Button>
//         </Stack>
//       </div>
      
//       <div style={{ height: 450, width: "90%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 6 },
//             },
//           }}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//         />
//       </div>
//     </div>
//   );
// }
