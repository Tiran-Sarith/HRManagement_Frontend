import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeePopup from "../Components/EmployeePopup";

function Employees() {

  
    useEffect(() => {
        axios
          .get(`http://localhost:8070/vacancies/Vview`)
          .then((res) => {
            const formattedVacancies = res.data.map((vacancy, index) => ({
              id: index + 1,
              JobName: vacancy.jobTitle,
              JobType: vacancy.hireType,
              Department: vacancy.department,
              Created: vacancy.postedDate,
              Deadline: vacancy.deadline,
            }));
            setRows(formattedVacancies);
          })
          .catch((err) => {
            alert(err.message);
          });
      }, []);
    
    const columns = [
      { field: "id", headerName: "id", width: 70 },
      { field: "JobName", headerName: "Name", width: 130 },
      { field: "JobType", headerName: "E-mail", width: 130 },
      { field: "Department", headerName: "Department", width: 130 },
      { field: "Created", headerName: "Employee ID", type: "number", width: 90 },
      { field: "Deadline", headerName: "Project ID", width: 160 },
      { field: "Deadline", headerName: "Designation", width: 160 },
      
    ];
    
    const initialRows = [
      { id: 1, JobType: "Snow", JobName: "Jon", Department: "Software", Created: 35, Deadline: "10/04/2025" },
      { id: 2, JobType: "Lannister", JobName: "Cersei", Department: "DevOps", Created: 42, Deadline: "10/04/2025" },
      { id: 3, JobType: "Lannister", JobName: "Jaime", Department: "QA", Created: 45, Deadline: "10/04/2025" },
      { id: 4, JobType: "Stark", JobName: "Arya", Department: "UI/UX", Created: 16, Deadline: "10/04/2025" },
      { id: 5, JobType: "Targaryen", JobName: "Daenerys", Department: "Cyber Security", Created: 66, Deadline: "10/04/2025" },
      { id: 6, JobType: "Melisandre", JobName: "Executive", Department: "Networking", Created: 15, Deadline: "10/04/2025" },
      { id: 7, JobType: "Clifford", JobName: "Ferrara", Department: "AI", Created: 44, Deadline: "10/04/2025" },
      { id: 8, JobType: "Frances", JobName: "Rossini", Department: "ML", Created: 36, Deadline: "10/04/2025" },
      { id: 9, JobType: "Roxie", JobName: "Harvey", Department: "DL", Created: 65, Deadline: "10/04/2025" },
    ];
    
    const theme = useTheme();
    const [rows, setRows] = useState(initialRows);
    const [showMyModel, setShowMyModel] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null)
  
    const navigate = useNavigate();
  
    const handleAddEmployee = () => {
      navigate("/AddEmployee");
    };
  
    const handleDelete = (id) => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };
  
    const handleUpdate = (id) => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      navigate("/vacanciesUpdate")
    };

 

    const handleOnClose = () => setShowMyModel(false);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setShowMyModel(true);
      };

    return (
        <div>
          <div className="flex justify-between">
            <Card sx={{ maxWidth: 400 }} className="mb-6">
              <CardContent>
                <Typography variant="h5" component="div" className="flex justify-start">
                  Total Employees
                </Typography>
                <Typography variant="h5" component="div" className="flex justify-start pt-3">
                  {rows.length}
                </Typography>
                <AvatarGroup total={24} className=" ml-40">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </CardContent>
            </Card>
            <Stack direction="row" spacing={2} className="mr-36 mt-5">
              <Button
                onClick={handleAddEmployee}
                variant="contained"
                color="success"
                className="h-9 bg-green-500"
                startIcon={<AddIcon />}
              >
                Add Employees
              </Button>
            </Stack>
          </div>
          <Stack spacing={3} sx={{ width: 550 }} className="mb-5 rounded-xl pl-2 pb-1">
            <Autocomplete
              multiple
              id="tags-standard"
              options={rows}
              getOptionLabel={(option) => option.JobName}
              defaultValue={[rows[0]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Filter by employee name"
                  placeholder="Favorites"
                  className="text-green-500 bg-[#F4F3FF]"
                />
              )}
            />
          </Stack>
          <div style={{ height: 450, width: 850 }}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            onRowClick={handleRowClick}
            />
            <EmployeePopup onClose={handleOnClose} visible={showMyModel} data={selectedRow} />
        </div>
        </div>
      );
}

export default Employees