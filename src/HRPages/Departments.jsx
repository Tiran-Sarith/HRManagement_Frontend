import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material'

function Departments() {
  const departments = [
    { name: 'Human Resources',manager:'A.B.C.Perera', employees: '5' },
    { name: 'Software Engineering',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'DevOps Engineering',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'Quality Assurance',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'Cyber Security',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'Networking',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'Database Engineering',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'AI Engineering',manager:'A.B.C.Perera', employees: '5',projects:'6'},
    { name: 'Finance',manager:'A.B.C.Perera', employees: '5'}
  ]

  return (
    <Grid container spacing={3} sx={{ padding: 3, marginBottom: 18 }}>
      {departments.map((department, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ minHeight: 200, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                {department.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <span style={{ fontWeight: 'bold' }}>Chief Manager:</span> {department.manager}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <span style={{ fontWeight: 'bold' }}>Number of employees:</span> {department.employees}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <span style={{ fontWeight: 'bold' }}>Ongoing projects:</span> {department.projects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Departments