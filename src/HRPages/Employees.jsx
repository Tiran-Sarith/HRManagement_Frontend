import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeePopup from "../Components/EmployeePopup";

function Employees() {
  const [rows, setRows] = useState([]);
  const [showMyModel, setShowMyModel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}employee/Eview`);
      const formattedEmployees = response.data.map((employee, index) => ({
        id: employee._id,
        name: employee.employee_name_with_initials,
        email: employee.employee_email,
        department: employee.employee_department,
        employeeId: employee.employee_id,
        projectId: employee.employee_current_project_id,
        designation: employee.employee_designation,
        // Include all other employee data for the popup
        fullName: employee.employee_full_name,
        firstName: employee.employee_first_name,
        lastName: employee.employee_last_name,
        nic: employee.employee_nic,
        telephone: employee.employee_telephone,
        address: employee.employee_address
      }));
      setRows(formattedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "E-mail", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "projectId", headerName: "Project ID", width: 130 },
    { field: "designation", headerName: "Designation", width: 130 },
  ];

  const handleAddEmployee = () => {
    navigate("/AddEmployee");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/employee/Edelete/${id}`);
      fetchEmployees(); // Refresh the list
      setShowMyModel(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/employeeUpdate/${id}`);
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

      <div style={{ height: 450, width: 850 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 8 } },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
        />
        <EmployeePopup 
          onClose={handleOnClose} 
          visible={showMyModel} 
          data={selectedRow}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Employees;
