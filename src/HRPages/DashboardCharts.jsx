//DashboardCharts.jsx
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import axios from 'axios';

const DashboardCharts = () => {
  // const [projectData, setProjectData] = useState({ xAxis: [], series: [] });
  const [departmentData, setDepartmentData] = useState({ xAxis: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project data
        // const projectResponse = await axios.get('http://localhost:8070/projects/Pview');
        // const projects = projectResponse.data;

        // Group projects by department
        // const projectsByDept = projects.reduce((acc, project) => {
        //   const deptName = project.departmentID.departmentName;
        //   if (!acc[deptName]) {
        //     acc[deptName] = 0;
        //   }
        //   acc[deptName]++;
        //   return acc;
        // }, {});

        // Transform project data for bar chart
        // const departments = Object.keys(projectsByDept);
        // const projectCounts = Object.values(projectsByDept);

        // setProjectData({
        //   xAxis: [{ data: departments, scaleType: 'band' }],
        //   series: [{ data: projectCounts, label: 'Number of Projects' }]
        // });

        // Fetch department data
        const deptResponse = await axios.get('http://localhost:8070/departments/Dview');
        
        setDepartmentData({
          xAxis: [{ 
            data: deptResponse.data.map(dept => dept.departmentName),
            scaleType: 'band'
          }],
          series: [{
            data: deptResponse.data.map(dept => dept.Numberofemployees),
            label: 'Number of Employees'
          }]
        });

      } catch (err) {
        console.error('Failed to fetch chart data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Projects by Department Chart */}
      {/* <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-green-700">Projects by Department</h2>
        {projectData.xAxis[0]?.data.length > 0 && (
          <BarChart
            width={600}
            height={300}
            series={projectData.series}
            xAxis={projectData.xAxis}
            sx={{
              '.MuiBarElement-root': {
                fill: '#00a36d',
              },
            }}
          />
        )}
      </div> */}

      {/* Employees by Department Chart */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Employees by Department</h2>
        {departmentData.xAxis[0]?.data.length > 0 && (
          <BarChart
            width={600}
            height={300}
            series={departmentData.series}
            xAxis={departmentData.xAxis}
            sx={{
              '.MuiBarElement-root': {
                fill: '#1c8552',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;