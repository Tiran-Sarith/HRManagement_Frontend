import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import EmployeePopup from '../Components/EmployeePopup';


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

      <EmployeePopup/>

    </div>
  )
}

export default HRHome