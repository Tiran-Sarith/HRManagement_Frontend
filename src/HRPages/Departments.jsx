import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [employeeCounts, setEmployeeCounts] = useState({});
    const [projectCounts, setProjectCounts] = useState({});

    useEffect(() => {
        // Fetch departments
        axios.get('http://localhost:8070/departments/Dview')
            .then(response => {
                setDepartments(response.data);
                fetchEmployeeCounts(response.data);
                fetchProjectCounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    const fetchEmployeeCounts = (departments) => {
        const employeePromises = departments.map(department =>
            axios.get(`http://localhost:8070/employees/countByDepartment/${department._id}`)
                .then(response => ({ departmentId: department._id, count: response.data.count }))
        );

        Promise.all(employeePromises)
            .then(results => {
                const counts = {};
                results.forEach(result => {
                    counts[result.departmentId] = result.count;
                });
                setEmployeeCounts(counts);
                console.log("Employee Counts: ", counts); // Add this line to debug
            })
            .catch(error => {
                console.error('Error fetching employee counts:', error);
            });
    };

    const fetchProjectCounts = (departments) => {
        const projectPromises = departments.map(department =>
            axios.get(`http://localhost:8070/projects/countByDepartment/${department._id}`)
                .then(response => ({ departmentId: department._id, count: response.data.count }))
        );

        Promise.all(projectPromises)
            .then(results => {
                const counts = {};
                results.forEach(result => {
                    counts[result.departmentId] = result.count;
                });
                setProjectCounts(counts);
                console.log("Project Counts: ", counts); // Add this line to debug
            })
            .catch(error => {
                console.error('Error fetching project counts:', error);
            });
    };

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
                                <span style={{ fontWeight: 'bold' }}>Number of employees:</span> {employeeCounts[department._id] || 0}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>Ongoing projects:</span> {projectCounts[department._id] || 0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Departments;
