import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeePopup from "../Components/EmployeePopup";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    { field: "name", headerName: "Name", width: 160 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "projectId", headerName: "Project ID", width: 130 },
    { field: "designation", headerName: "Designation", width: 130 },
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
  ];

  const handleAddEmployee = () => {
    navigate("/AddEmployee");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}employee/Edelete/${id}`);
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

  //for future edits

  //  const handleUpdate = (id) => {
  //   const vacancyToUpdate = rows.find((row) => row.id === id);
  //   if (!vacancyToUpdate) return;
  //   localStorage.setItem(
  //     "vacancyToUpdate",
  //     JSON.stringify(vacancyToUpdate.originalData)
  //   );
  //   navigate("/vacanciesUpdate");
  // };

  const handleOnClose = () => setShowMyModel(false);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setShowMyModel(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Card sx={{ minWidth: 275 }} className="shadow-md w-full md:w-1/3 mb-4 md:mb-0">
          <CardContent>
            <Typography marginBottom={2} variant="h5" fontWeight={700} className="text-gray-700  mb-4 font-bold mb-2 text-left">
              Total Employees
            </Typography>
            <Typography variant="h4" fontWeight={500} className="text-green-600 font-bold mb-4 text-left pl-2">
              {rows.length}
            </Typography>
            
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
              <Avatar alt="Travis Howard" src="https://i.pravatar.cc/150?img=2" />
              <Avatar alt="Agnes Walker" src="https://i.pravatar.cc/150?img=3" />
              <Avatar alt="Trevor Henderson" src="https://i.pravatar.cc/150?img=4" />
            </AvatarGroup>
            {/* <AvatarGroup max={4}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>RS</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>TH</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.success.main }}>AW</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.error.main }}>TH</Avatar>
            </AvatarGroup> */}
          </CardContent>
        </Card>

        <Button
          onClick={handleAddEmployee}
          variant="contained"
          color="success"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
        {/* <Typography variant="h6" className="text-gray-700 mb-4 font-semibold">
        Employee List
      </Typography> */}
        <div style={{ height: 500, width: '100%', }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 8 } },
            }}
            pageSizeOptions={[5, 10]}
            onRowClick={handleRowClick}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1f2937', // Tailwind gray-100
                color: '#1f2937',           // Tailwind gray-800
                fontWeight: '600',
                fontSize: '1rem',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: "#1b5e20",
              },
              '& .MuiDataGrid-cell': {
                fontSize: '0.95rem',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#f9fafb',
              },
            }}
          />
        </div>
      </div>

      <EmployeePopup
        onClose={handleOnClose}
        visible={showMyModel}
        data={selectedRow}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Employees;
