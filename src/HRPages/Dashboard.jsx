import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, CartesianGrid, LineChart, Line, XAxis, YAxis, BarChart, Bar, Tooltip as RechartsTooltip, Legend } from 'recharts';
// import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import DashboardCharts from './DashboardCharts';

// Styled component for progress bars
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#09d9ab',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

// Monthly Hires Card Component
const MonthlyHiresCard = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const hireData = {
    January: 14, February: 10, March: 8, April: 16, May: 7, June: 12,
    July: 8, August: 10, September: 13, October: 14, November: 11, December: 4
  };

  return (
    <CardContent className='mb-24 w-80'>
      <h1 className='font-sans text-3xl font-semibold text-green-700 text-start'>
        Hire per month
      </h1>
      
      {months.map(month => (
        <div key={month} className='mt-4 ml-4'>
          <div className='flex justify-between'>
            <h2 className='text-green-700 text-start'>{month}</h2>
            <p className='text-green-700 text-start'>{hireData[month]}</p>
          </div>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>     
            <BorderLinearProgress 
              variant="determinate" 
              value={(hireData[month] / Math.max(...Object.values(hireData))) * 100} 
            />
          </Stack>
        </div>
      ))}
    </CardContent>
  );
};

// Department Card Component
const DepartmentCard = () => {
  const [departments, setDepartments] = useState([]);
  const [applicantStats, setApplicantStats] = useState({
    applications: 0,
    technicalInterviews: 0,
    hrInterviews: 0,
    totalHired: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/departments/Dview');
        setDepartments(response.data);
        
        // Calculate total hired from departments
        const totalHired = response.data.reduce((sum, dept) => sum + dept.Numberofemployees, 0);
        
        // Setting mock data for other stats - replace with real API calls when available
        setApplicantStats({
          applications: totalHired * 4, // Assuming 5 applications per hire
          technicalInterviews: totalHired * 3, // Assuming 3 technical interviews per hire
          hrInterviews: totalHired * 2, // Assuming 2 HR interviews per hire
          totalHired: totalHired
        });
        
        setLoading(false);
      } catch {
        setError('Failed to fetch department data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading department data...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <CardContent>
      <h1 className='font-sans text-3xl font-semibold text-green-700 text-start'>
        Employees
      </h1>
      
      <div>
        <h2 className='mt-6 mb-5 ml-4 font-sans text-xl font-semibold text-green-700 text-start'>
          For Departments
        </h2>

        {departments.map((dept) => (
          <div key={dept._id}>
            <div className='flex justify-between mt-3'>
              <p className='text-start ml-4 text-[#018554]'>{dept.departmentName}</p>
              <p className='text-start ml-4 text-[#018554]'>{dept.Numberofemployees}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      
      <div>
        <h2 className='mt-10 mb-5 ml-4 font-sans text-xl font-semibold text-green-700 text-start'>
          Summary of Applicants
        </h2>

        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Applications</p>
          <p className='text-start ml-4 text-[#018554]'>{applicantStats.applications}</p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Technical Interview</p>
          <p className='text-start ml-4 text-[#018554]'>{applicantStats.technicalInterviews}</p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>HR Interview</p>
          <p className='text-start ml-4 text-[#018554]'>{applicantStats.hrInterviews}</p>
        </div>
        <hr />
        <div className='flex justify-between mt-3'>
          <p className='text-start ml-4 text-[#018554]'>Total Hired</p>
          <p className='text-start ml-4 text-[#018554]'>{applicantStats.totalHired}</p>
        </div>
        <hr />
      </div>
    </CardContent>
  );
};


const ProjectSummaryCard = () => {
  const [projectStats, setProjectStats] = useState({
    planning: 0,
    inProgress: 0,
    finished: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8070/projects/Pview');
        const projects = response.data;
        setProjectData(projects);

        // Calculate project statistics
        const stats = projects.reduce((acc, project) => {
          switch (project.projectStatus.toLowerCase()) {
            case 'planning':
              acc.planning++;
              break;
            case 'in progress':
            case 'inprogress':
              acc.inProgress++;
              break;
            case 'finished':
            case 'completed':
              acc.finished++;
              break;
            default:
              break;
          }
          return acc;
        }, { planning: 0, inProgress: 0, finished: 0 });

        setProjectStats(stats);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load project data');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="p-4">Loading project data...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  // Calculate additional statistics
  const totalProjects = projectData.length;
  const totalBudget = projectData.reduce((sum, project) => sum + project.projectBudget, 0);
  const avgDuration = projectData.reduce((sum, project) => sum + project.projectDuration, 0) / totalProjects || 0;

  return (
    <CardContent>
      <h1 className='font-sans text-3xl font-semibold text-green-700 text-start'>
        Project Summary
      </h1>
      
      <div className='flex mb-20 justify-evenly'>
        <div>
          <p className='text-[90px] font-bold font-sans mx-2 mt-4 text-[#00a36d]'>
            {projectStats.planning}
          </p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>
            Planning Projects
          </p>
        </div>
        
        <div>
          <p className='text-[90px] font-bold font-sans mx-2 mt-4 text-[#00a36d]'>
            {projectStats.inProgress}
          </p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>
            Inprogress Projects
          </p>
        </div>
        
        <div>
          <p className='text-[90px] font-bold font-sans mx-2 mt-4 text-[#00a36d]'>
            {projectStats.finished}
          </p>
          <p className='text-lg font-semibold font-sans text-[#1c8552]'>
            Finished Projects
          </p>
        </div>
      </div>

      <div className='px-4 mt-6 mb-20'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='p-4 mb-5 rounded-lg bg-gray-50'>
            <p className='text-sm text-gray-600'>Total Projects</p>
            <p className='text-xl font-bold text-[#00a36d]'>{totalProjects}</p>
          </div>
          <div className='p-4 mb-5 rounded-lg bg-gray-50'>
            <p className='text-sm text-gray-600'>Total Budget</p>
            <p className='text-xl font-bold text-[#00a36d]'>${totalBudget.toLocaleString()}</p>
          </div>
          <div className='p-4 mb-5 rounded-lg bg-gray-50'>
            <p className='text-sm text-gray-600'>Avg Duration (months)</p>
            <p className='text-xl font-bold text-[#00a36d]'>{avgDuration.toFixed(1)}</p>
          </div>
          <div className='p-4 mb-5 rounded-lg bg-gray-50'>
            <p className='text-sm text-gray-600'>Completion Rate</p>
            <p className='text-xl font-bold text-[#00a36d]'>
              {((projectStats.finished / totalProjects) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  );
};


// Monthly Hires Bar Chart
const MonthlyHiresChart = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const hireData = {
      January: 14, February: 10, March: 8, April: 16, May: 7, June: 12,
      July: 8, August: 10, September: 13, October: 14, November: 11, December: 4
    };
  
    const data = months.map(month => ({
      name: month,
      hires: hireData[month],
    }));
  
    return (
      <Card>
        <CardContent>
          <h2 className='mb-10 text-2xl font-semibold text-gray-700'>Monthly Hires Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hires" fill="#f09600" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

// Employee Growth Line Chart
const EmployeeGrowthChart = () => {
    const [employeeData, setEmployeeData] = useState([]);
  
    useEffect(() => {
      const fetchEmployeeData = async () => {
        try {
          const response = await axios.get('http://localhost:8070/departments/Dview');
          const data = response.data.map(dept => ({
            name: dept.departmentName,
            employees: dept.Numberofemployees,
          }));
          setEmployeeData(data);
        } catch (error) {
          console.error('Failed to fetch employee data:', error);
        }
      };
  
      fetchEmployeeData();
    }, []);
  
    return (
      <Card>
        <CardContent>
          <h2 className='mb-10 text-2xl font-semibold text-gray-700'>Employee Growth Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={employeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="employees" stroke="purple" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };  

const generateNudeColors = (length) => {
    const nudeColors = [
      '#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600', '#D5C5B0', '#F4D1B9', '#D8B29E'
    ];
    return Array.from({ length }, (_, i) => nudeColors[i % nudeColors.length]);
  };
  
  const ProjectDistributionChart = () => {
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      const fetchProjectData = async () => {
        try {
          const response = await axios.get('http://localhost:8070/projects/Pview');
          const projects = response.data;
  
          // Group projects by department
          const departmentProjects = projects.reduce((acc, project) => {
            const deptName = project.departmentID.departmentName;
            if (!acc[deptName]) {
              acc[deptName] = 0;
            }
            acc[deptName]++;
            return acc;
          }, {});
  
          // Transform data for pie chart
          const pieData = Object.entries(departmentProjects).map(([dept, count]) => ({
            name: dept,
            value: count
          }));
  
          setChartData(pieData);
        } catch (err) {
          console.error('Failed to fetch project distribution:', err);
        }
      };
  
      fetchProjectData();
    }, []);
  
    if (!chartData.length) return <div>Loading chart...</div>;
  
    return (
      <div className="flex justify-center ">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
              animationDuration={500}
              stroke="#fff" // Adding a white stroke for cleaner separation between slices
              strokeWidth={1.5} // Slightly thicker stroke for a more refined look
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={generateNudeColors(chartData.length)[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#f4f4f4', // Light background for tooltip
                borderRadius: '20px', // Rounded corners
                padding: '20px', // Padding for better spacing
              }}
              labelStyle={{
                color: '#333', // Darker text for the label
                fontWeight: 'bold',
              }}
              itemStyle={{
                color: '#444', // Dark color for the tooltip content
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };


// Main HRHome Component
function HRHome() {

  return (
    <div className="min-w-full overflow-x-auto">
      <div className="min-w-[1400px] p-4">
        <Box>
          <div className='grid grid-cols-2 gap-6'>
            <div className='grid h-[700px] grid-cols-2 gap-4'>
              <div className='w-full '>
                <Card variant="outlined" className='shadow-lg w-80'>
                  <MonthlyHiresCard />
                </Card>
              </div>
              <div className='w-full'>
                <Card variant="outlined" className='ml-3 shadow-lg w-80'>
                  <DepartmentCard />
                </Card>
              </div>
              
              
            </div>
            
            <div className='flex-none ml-3'>
              <Card variant="outlined" className='w-full shadow-lg'>
                <ProjectSummaryCard />
              </Card>

              
            </div>
          </div>

          <div className='grid grid-cols-2 gap-10 mt-16'>
            <div className='w-full '>
            <DashboardCharts />
            
            </div>
            <div className='w-full'>
            <Card>
                    <CardContent>   
                    <div className="mt-1 text-2xl font-semibold text-gray-700">Projects by Department</div>
                    <ProjectDistributionChart />
                        
                    </CardContent>
                </Card>
            
            </div>
          </div>

          {/* New Graph Cards */}
          <div className='grid grid-cols-2 gap-10 mt-16'>
            <div className='w-full'>
              <MonthlyHiresChart />
            </div>
            <div className='w-full'>
              <EmployeeGrowthChart />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );

}

export default HRHome;