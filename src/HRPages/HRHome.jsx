import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


function HRHome() {

    const navigate = useNavigate();

    const handleAddVacancy = () => {
        navigate("/vacancies");
    };

return (
    <div>
        HRHome

        <Button
            onClick={handleAddVacancy}
            variant="contained"
            color="success"
            className="h-9 bg-green-500"
          >
            Vacancies
          </Button>
    </div>
  )
}

export default HRHome