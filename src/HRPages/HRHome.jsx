import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


function HRHome() {

    const navigate = useNavigate();

    const handleAddVacancy = () => {
        navigate("/vacancies");
    };
    const handleEmployee = () => {
        navigate("/employee");
    };

return (
    <div>

        <Button
            onClick={handleAddVacancy}
            variant="contained"
            color="success"
            className="h-9 bg-green-500"
          >
             Vacancies
          </Button>
        <Button
            onClick={handleEmployee}
            variant="contained"
            color="success"
            className="h-9 bg-green-500"
          >
             Employee
          </Button>
    </div>
  )
}

export default HRHome