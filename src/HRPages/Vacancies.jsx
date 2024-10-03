// import React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
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
// import AddVacancies from "./AddVacancies";

// const columns = [
//   { field: "id", headerName: "id", width: 70 },
//   { field: "JobName", headerName: "JobName", width: 130 },
//   { field: "JobType", headerName: "JobType", width: 130 },
//   { field: "Department", headerName: "Department", width: 130 },
//   {
//     field: "Created",
//     headerName: "Created",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "Deadline",
//     headerName: "Deadline",
//     width: 160,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     JobType: "Snow",
//     JobName: "Jon",
//     Department: "Software",
//     Created: 35,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 2,
//     JobType: "Lannister",
//     JobName: "Cersei",
//     Department: "DevOps",
//     Created: 42,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 3,
//     JobType: "Lannister",
//     JobName: "Jaime",
//     Department: "QA",
//     Created: 45,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 4,
//     JobType: "Stark",
//     JobName: "Arya",
//     Department: "UI/UX",
//     Created: 16,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 5,
//     JobType: "Targaryen",
//     JobName: "Daenerys",
//     Department: "Cyber Security",
//     Created: 66,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 6,
//     JobType: "Melisandre",
//     JobName: "Executive",
//     Department: "Networking",
//     Created: 15,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 7,
//     JobType: "Clifford",
//     JobName: "Ferrara",
//     Department: "AI",
//     Created: 44,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 8,
//     JobType: "Frances",
//     JobName: "Rossini",
//     Department: "ML",
//     Created: 36,
//     Deadline: "10/04/2025",
//   },
//   {
//     id: 9,
//     JobType: "Roxie",
//     JobName: "Harvey",
//     Department: "DL",
//     Created: 65,
//     Deadline: "10/04/2025",
//   },
// ];

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

// export default function Vacancies() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const navigate = useNavigate();

//   // const addVacancy= () => {
//   //     navigate('/AddVacancies');
//   // }
//   const handleAddVacancy = () => {
//     navigate("/add"); // Make sure this route is defined in your router
//   };

//   return (
//     <div>
//       <div className="flex justify-between">
//         <Card sx={{ maxWidth: 275 }} className="mb-6">
//           <CardContent>
//             <Typography
//               variant="h5"
//               component="div"
//               className="flex justify-start"
//             >
//               Total Vacancies
//             </Typography>
//             <Typography
//               variant="h5"
//               component="div"
//               className="flex justify-start pt-3"
//             >
//               {rows.length}
//             </Typography>
//           </CardContent>
//         </Card>
//         <Stack direction="row" spacing={2} className="mr-36 mt-5">
//           {/* <Button onClick={<AddVacancies/>} variant="contained" color="success" className='h-9 bg-green-500' startIcon={<AddIcon />}>
//                         Add Vacancies
//                     </Button> */}

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
//       <Stack
//         spacing={3}
//         sx={{ width: 550 }}
//         className="mb-5 rounded-xl pl-2 pb-1"
//       >
//         <Autocomplete
//           multiple
//           id="tags-standard"
//           options={rows}
//           getOptionLabel={(option) => option.JobName}
//           defaultValue={[rows[0]]}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="standard"
//               label="Filter by Job name"
//               placeholder="Favorites"
//               className="text-green-500 bg-[#F4F3FF]"
//             />
//           )}
//         />
//       </Stack>
//       <div style={{ height: 450, width: "90%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//         />
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "id", width: 70 },
  { field: "JobName", headerName: "JobName", width: 130 },
  { field: "JobType", headerName: "JobType", width: 130 },
  { field: "Department", headerName: "Department", width: 130 },
  { field: "Created", headerName: "Created", type: "number", width: 90 },
  { field: "Deadline", headerName: "Deadline", width: 160 },
  {
    field: "delete",
    headerName: " ",
    width: 130,
    renderCell: (params) => (
      <Button
        variant="contained"
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
        onClick={() => handleDelete(params.id)}
      >
        Update
      </Button>
    ),
  },
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

export default function Vacancies() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);

  const handleAddVacancy = () => {
    navigate("/add");
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

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
              label="Filter by Job name"
              placeholder="Favorites"
              className="text-green-500 bg-[#F4F3FF]"
            />
          )}
        />
      </Stack>
      <div style={{ height: 450, width: "90%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
