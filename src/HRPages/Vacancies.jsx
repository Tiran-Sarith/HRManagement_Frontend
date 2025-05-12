import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getVacancies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}vacancies/Vview`);
      const formattedVacancies = response.data.map((vacancy) => ({
        id: vacancy._id,
        JobName: vacancy.jobTitle,
        JobType: vacancy.hireType,
        Department: vacancy.department,
        Created: vacancy.postedDate,
        Deadline: vacancy.deadline,
        originalData: vacancy,
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

  const handleDeleteClick = (id) => {
    const vacancy = rows.find((row) => row.id === id);
    if (vacancy) {
      setVacancyToDelete(vacancy);
      setDeleteDialogOpen(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setVacancyToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!vacancyToDelete) return;
    try {
      setLoading(true);
      await axios.delete(
        `${API_BASE_URL}vacancies/Vdelete/${vacancyToDelete.id}`
      );
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== vacancyToDelete.id)
      );
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
    const vacancyToUpdate = rows.find((row) => row.id === id);
    if (!vacancyToUpdate) return;
    localStorage.setItem(
      "vacancyToUpdate",
      JSON.stringify(vacancyToUpdate.originalData)
    );
    navigate("/vacanciesUpdate");
  };

  const handleAddVacancy = () => {
    navigate("/vacanciesAdd");
  };

  const handleApplicationVacancies = (id) => {
    navigate(`/vacancies/${id}`);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    { field: "JobName", headerName: "Job Name", flex: 1 },
    { field: "JobType", headerName: "Job Type", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
    { field: "Created", headerName: "Created", flex: 1 },
    { field: "Deadline", headerName: "Deadline", flex: 1 },
    {
      field: "View",
      headerName: "Applications",
      flex: 1,
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
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="success"
          startIcon={<EditIcon />}
          size="small"
          onClick={() => handleUpdate(params.id)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Remove",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={() => handleDeleteClick(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="px-2 py-6 sm:px-4 md:px-6 bg-gray-50 min-h-screen">
        {/* Top section with cards and button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Vacancies Card */}
          <Card className="w-full shadow-md rounded-lg">
            <CardContent>
              <Typography variant="h6" className="text-gray-700 font-semibold">
                Total Vacancies
              </Typography>
              <Typography variant="h4" className="text-green-600 mt-2">
                {rows.length}
              </Typography>
            </CardContent>
          </Card>

          {/* Spacer */}
          <div className="hidden md:block"></div>

          {/* Add Vacancy Button */}
          <div className="flex justify-start md:justify-end items-center">
            <Button
              onClick={handleAddVacancy}
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              className="w-full md:w-auto"
            >
              Add Vacancy
            </Button>
          </div>
        </div>

        {/* DataGrid section with horizontal scroll */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <CircularProgress style={{ color: "#4CAF50" }} />
            </div>
          ) : (
            <div style={{ minWidth: "800px" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10]}
                autoHeight
                // checkboxSelection
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f1f5f9', // Tailwind gray-100
                    color: '#1f2937',           // Tailwind gray-800
                    fontWeight: 600,
                    fontSize: '1rem',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-cell': {
                    fontSize: '0.95rem',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    backgroundColor: '#f9fafb', // Tailwind gray-50
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ color: "#d32f2f" }}>Delete Vacancy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the vacancy "
            {vacancyToDelete?.JobName}"? This will also remove all associated
            applications.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
