//DashboardCharts.jsx
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const DashboardCharts = () => {
  // const [projectData, setProjectData] = useState({ xAxis: [], series: [] });
  const [departmentData, setDepartmentData] = useState({ xAxis: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        // Fetch department data
        const deptResponse = await axios.get(`${API_BASE_URL}departments/Dview`);
        
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
