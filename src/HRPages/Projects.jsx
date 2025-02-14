import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProjectsPending from '../Components/ProjectsPending';
import InprogressProjects from '../Components/InprogressProjects';
import FinishedProjects from '../Components/FinishedProjects';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Projects() {

  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewProject =() =>{
      navigate("/addProject");
  }
      

  return (
    <div>
       <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs sx={{marginLeft: 45 }} value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Pending Project" {...a11yProps(0)} />
            <Tab label="Inprogress Projects" {...a11yProps(1)} />
            <Tab label="Finished Projects" {...a11yProps(2)} />
            <Stack spacing={2} direction="row" sx={{marginLeft: 15}} >
              <Button variant="outlined" color="success" startIcon={<AddIcon />} onClick={handleNewProject}>New Project</Button>
            </Stack>
          </Tabs>
        </Box>
      <CustomTabPanel value={value} index={0}>
        <ProjectsPending/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InprogressProjects/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FinishedProjects/>
      </CustomTabPanel>
    </Box>
    </div>
  )
}

export default Projects