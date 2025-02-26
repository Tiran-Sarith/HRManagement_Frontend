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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  // Fetch all vacancies
  const getVacancies = async () => {
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
      alert("Error fetching vacancies: " + error.message);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Find the original vacancy data
      const vacancyToDelete = rows.find(row => row.id === id);
      if (!vacancyToDelete) return;

      // Make DELETE request to backend
      await axios.delete(`http://localhost:8070/vacancies/Vdelete/${vacancyToDelete.id}`);
      
      // Update local state after successful deletion
      setRows(prevRows => prevRows.filter(row => row.id !== id));
      alert("Vacancy deleted successfully!");
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      alert("Error deleting vacancy: " + error.message);
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

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "JobName", headerName: "Job Name", width: 130 },
    { field: "JobType", headerName: "Job Type", width: 130 },
    { field: "Department", headerName: "Department", width: 130 },
    { field: "Created", headerName: "Created", width: 90 },
    { field: "Deadline", headerName: "Deadline", width: 160 },
    {
      field: "View",
      headerName: " ",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleApplicationVacancies(params.id)}
        >
          Applications
        </Button>
      ),
    },

    {
      field: "delete",
      headerName: " ",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "update",
      headerName: " ",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleUpdate(params.id)}
        >
          Update
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
      </div>
    </div>
  );
}
