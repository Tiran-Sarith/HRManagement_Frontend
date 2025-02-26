import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Departments() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get(`${API_BASE_URL}departments/Dview`)
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    return (
        <Grid container spacing={3} sx={{ padding: 3, marginBottom: 18 }}>
            {departments.map((department, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ minHeight: 200, boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                {department.departmentName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>Chief Manager:</span> {department.departmentHead}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>Number of employees:</span> {department.Numberofemployees}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>Ongoing projects:</span> {department.Numberodprojects}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Departments;
