// HRHome.jsx
// export default HRHome
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";

// Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import LaunchIcon from "@mui/icons-material/Launch";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Styled component for progress bars
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#09d9ab",
  },
}));

// Dashboard Header Component
const DashboardHeader = ({ refreshData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        mt: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, color: "#2e7d32" }}
      >
        Admin Dashboard
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<RefreshIcon />}
          onClick={refreshData}
          sx={{ mr: 2 }}
        >
          Refresh Data
        </Button>
        <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}>A</Avatar>
      </Box>
    </Box>
  );
};

// Stats Overview Component
const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: <PeopleAltIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
    {
      title: "Total Vacancies",
      value: stats.totalVacancies,
      icon: <WorkIcon sx={{ fontSize: 40, color: "#00a36d" }} />,
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: <InsertDriveFileIcon sx={{ fontSize: 40, color: "#1a8754" }} />,
    },
    {
      title: "Active Projects",
      value: stats.totalProjects,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#218838" }} />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: "#757575", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#1c8552", mb: 1 }}
                  >
                    {item.value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#e8f5e9", width: 56, height: 56 }}>
                  {item.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Project Summary Card Component
const ProjectSummaryCard = ({ projectDataProp, projectStatsProp }) => {
  const [projectStats, setProjectStats] = useState(
    projectStatsProp || {
      pending: 0,
      inProgress: 0,
      finished: 0,
    }
  );
  const [loading, setLoading] = useState(!projectDataProp);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(projectDataProp || []);

  useEffect(() => {
    // If props are provided, use them instead of fetching
    if (projectDataProp && projectStatsProp) {
      setProjectData(projectDataProp);
      setProjectStats(projectStatsProp);
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        // Fixed API URL with correct prefix
        const response = await axios.get(`${API_BASE_URL}projects/Pview`);
        console.log("ProjectSummaryCard fetched data:", response.data);
        const projects = response.data;
        setProjectData(projects);

        // Calculate project statistics
        const stats = projects.reduce(
          (acc, project) => {
            if (project.projectStatus) {
              const status = project.projectStatus.toLowerCase();
              if (status === "pending") {
                acc.pending++;
              } else if (status === "in progress" || status === "inprogress") {
                acc.inProgress++;
              } else if (status === "finished" || status === "completed") {
                acc.finished++;
              }
            }
            return acc;
          },
          { pending: 0, inProgress: 0, finished: 0 }
        );

        console.log("Calculated project stats:", stats);
        setProjectStats(stats);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load project data");
        setLoading(false);
      }
    };
    fetchProjects();
  }, [projectDataProp, projectStatsProp]);

  if (loading) return <div className="p-4">Loading project data...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  // Calculate additional statistics
  const totalProjects = projectData.length;
  const totalBudget = projectData.reduce(
    (sum, project) => sum + (project.projectBudget || 0),
    0
  );
  const avgDuration =
    totalProjects > 0
      ? projectData.reduce(
        (sum, project) => sum + (project.projectDuration || 0),
        0
      ) / totalProjects
      : 0;

  // Prepare data for the pie chart
  const pieChartData = [
    { name: "Pending", value: projectStats.pending, color: "#FFB74D" },
    { name: "In Progress", value: projectStats.inProgress, color: "#42A5F5" },
    { name: "Finished", value: projectStats.finished, color: "#66BB6A" },
  ];

  return (
    <CardContent className="h-full">
      <h1 className="font-sans text-3xl font-semibold text-green-700 text-start mb-6">
        Project Summary
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="flex mb-10 justify-evenly">
            <div>
              <p className="text-5xl font-bold font-sans mx-2 mt-4 text-[#00a36d]">
                {projectStats.pending}
              </p>
              <p className="text-lg font-semibold font-sans text-[#1c8552]">
                Pending Projects
              </p>
            </div>

            <div>
              <p className="text-5xl font-bold font-sans mx-2 mt-4 text-[#00a36d]">
                {projectStats.inProgress}
              </p>
              <p className="text-lg font-semibold font-sans text-[#1c8552]">
                Inprogress Projects
              </p>
            </div>

            <div>
              <p className="text-5xl font-bold font-sans mx-2 mt-4 text-[#00a36d]">
                {projectStats.finished}
              </p>
              <p className="text-lg font-semibold font-sans text-[#1c8552]">
                Finished Projects
              </p>
            </div>
          </div>

          <div className="px-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 mb-5 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-xl font-bold text-[#00a36d]">{totalProjects}</p>
              </div>
              <div className="p-4 mb-5 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-xl font-bold text-[#00a36d]">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="p-4 mb-5 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Avg Duration (months)</p>
                <p className="text-xl font-bold text-[#00a36d]">
                  {avgDuration.toFixed(1)}
                </p>
              </div>
              <div className="p-4 mb-5 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-xl font-bold text-[#00a36d]">
                  {totalProjects > 0
                    ? ((projectStats.finished / totalProjects) * 100).toFixed(1)
                    : "0.0"}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        {/* Right Column */}
        <div className="flex-1 mt-6 mb-6">
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c8552", mb: 2 }}>
            Project Status Distribution
          </Typography>
          <Box sx={{ height: 300, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value, name) => [`${value} Projects`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </div>

      </div>
    </CardContent>
  );
};

// Fixed Vacancy vs Applications Chart Component
const VacancyApplicationsChart = ({ vacancies, applications }) => {
  // Process the data to show vacancy name and number of applications
  const processChartData = () => {
    if (!Array.isArray(vacancies) || !Array.isArray(applications)) {
      return [];
    }

    return vacancies.map(vacancy => {
      const applicationsCount = applications.filter(
        app => app.vacancyId === vacancy._id
      ).length;

      return {
        name: vacancy.jobTitle || "Unnamed Vacancy",
        applications: applicationsCount
      };
    });
  };

  const chartData = processChartData();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c8552" }}>
            Applications per Vacancy
          </Typography>
        </Box>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip formatter={(value, name) => [`${value}`, 'Applications']} />
              <Legend />
              <Bar
                dataKey="applications"
                name="Applications"
                fill="#00a36d"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};


const RecentApplicationsTable = ({ applications, vacancies }) => {
  // Get vacancy name by ID
  const getVacancyName = (application) => {
    // Check if application has vacancyId property
    if (application.vacancyId) {
      const vacancy = vacancies.find(v => v._id === application.vacancyId);
      return vacancy ? vacancy.jobTitle : "Unknown Position";
    }

    // If no direct vacancyId, try to find the vacancy that this application belongs to
    // by checking if this application's ID exists in any vacancy's applications array
    for (const vacancy of vacancies) {
      if (vacancy.applications && vacancy.applications.includes(application._id)) {
        return vacancy.jobTitle || "Unknown Position";
      }
    }

    return "Unknown Position";
  };


  // Prepare data - sort by date and take the 5 most recent
  const recentApplications = [...applications]
    .filter(app => app && app._id && typeof app.cvScore === 'number') // Ensure cvScore exists
    .sort((a, b) => b.cvScore - a.cvScore)
    .slice(0, 5);


};

// NEW COMPONENT: Vacancy Fill Rate Gauge
const VacancyFillRateGauge = ({ vacancies, applications }) => {
  // Calculate how many vacancies have at least one application
  const vacanciesWithApplications = vacancies.filter(vacancy =>
    applications.some(app => app.vacancyId === vacancy._id)
  ).length;

  const totalVacancies = vacancies.length;
  const fillRate = totalVacancies > 0 ? (vacanciesWithApplications / totalVacancies) * 100 : 0;

  // Calculate metrics for display
  const vacanciesWithoutApplications = totalVacancies - vacanciesWithApplications;

  // Function to determine gauge color based on fill rate
  const getGaugeColor = (rate) => {
    if (rate < 30) return "#f44336"; // Red
    if (rate < 70) return "#ff9800"; // Orange
    return "#4caf50"; // Green
  };

  const gaugeColor = getGaugeColor(fillRate);

  
};

// NEW COMPONENT: Application to Vacancy Ratio Trend
const ApplicationVacancyRatioTrend = ({ vacancies, applications }) => {
  // We need to simulate time-series data since we don't have actual historical data
  // For this simulation, we'll create monthly data points for the last 6 months

  const generateTimeSeriesData = () => {
    const today = new Date();
    const data = [];

    // Create monthly data points for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });

      // For demo purposes, filter applications that would have been submitted in this month
      // In a real scenario, you would use actual timestamps from the database
      const monthlyApplications = applications.length > 0 ?
        Math.round(applications.length / 6 * (1 + Math.sin(i / 2))) : 0;

      const monthlyVacancies = vacancies.length > 0 ?
        Math.round(vacancies.length / 6 * (1 + Math.cos(i / 3))) : 0;

      // Calculate the ratio (avoid division by zero)
      const ratio = monthlyVacancies > 0 ?
        (monthlyApplications / monthlyVacancies).toFixed(1) : 0;

      data.push({
        month: monthName,
        applicationCount: monthlyApplications,
        vacancyCount: monthlyVacancies,
        ratio: parseFloat(ratio)
      });
    }

    return data;
  };

  const timeSeriesData = generateTimeSeriesData();

  // Calculate the overall ratio for the indicator
  const totalApplications = applications.length;
  const totalVacancies = vacancies.length;
  const overallRatio = totalVacancies > 0 ?
    (totalApplications / totalVacancies).toFixed(1) : 0;

  // Calculate the current month's ratio for comparison
  const currentMonthData = timeSeriesData[timeSeriesData.length - 1];
  const changeFromLastMonth = timeSeriesData.length > 1 ?
    (currentMonthData.ratio - timeSeriesData[timeSeriesData.length - 2].ratio).toFixed(1) : 0;

  const showIncreaseIcon = changeFromLastMonth > 0;

  return (
    <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c8552", mb: 3 }}>
          Application to Vacancy Ratio Trend
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current Ratio
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#1c8552" }}>
                  {overallRatio}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    color: showIncreaseIcon ? "#4caf50" : "#f44336",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {showIncreaseIcon ? "↑" : "↓"} {Math.abs(changeFromLastMonth)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Applications
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#1c8552" }}>
                {totalApplications}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timeSeriesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip
                formatter={(value, name) => {
                  if (name === "ratio") return [value, "Apps per Vacancy"];
                  if (name === "applicationCount") return [value, "Applications"];
                  if (name === "vacancyCount") return [value, "Vacancies"];
                  return [value, name];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="ratio"
                name="Ratio"
                stroke="#00a36d"
                fill="#00a36d20"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="applicationCount"
                name="Applications"
                stroke="#42A5F5"
                dot={{ stroke: '#42A5F5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="vacancyCount"
                name="Vacancies"
                stroke="#FFB74D"
                dot={{ stroke: '#FFB74D', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};


// Main Dashboard Component
const HRHome = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalVacancies: 0,
    totalApplications: 0,
    totalProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({
    pending: 0,
    inProgress: 0,
    finished: 0,
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch employees data
      const employeesResponse = await axios.get(`${API_BASE_URL}employee/Eview`);
      setEmployees(employeesResponse.data);

      // Fetch vacancies data
      const vacanciesResponse = await axios.get(`${API_BASE_URL}vacancies/Vview`);
      setVacancies(vacanciesResponse.data);

      // Fetch applications data
      const applicationsResponse = await axios.get(
        `${API_BASE_URL}applications/Aview`
      );
      setApplications(applicationsResponse.data);

      // Fetch projects data
      const projectsResponse = await axios.get(`${API_BASE_URL}projects/Pview`);
      const projects = projectsResponse.data;
      setProjects(projects);

      // Calculate project statistics
      const pStats = projects.reduce(
        (acc, project) => {
          if (project.projectStatus) {
            const status = project.projectStatus.toLowerCase();
            if (status === "pending") {
              acc.pending++;
            } else if (status === "in progress" || status === "inprogress") {
              acc.inProgress++;
            } else if (status === "finished" || status === "completed") {
              acc.finished++;
            }
          }
          return acc;
        },
        { pending: 0, inProgress: 0, finished: 0 }
      );
      setProjectStats(pStats);

      // Update overall statistics
      setStats({
        totalEmployees: employeesResponse.data.length,
        totalVacancies: vacanciesResponse.data.length,
        totalApplications: applicationsResponse.data.length,
        totalProjects: projects.length,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress color="success" />
        <Typography sx={{ mt: 2, color: "#1c8552" }}>
          Loading dashboard data...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h6" sx={{ color: "error.main", mb: 2 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={fetchDashboardData}
          startIcon={<RefreshIcon />}
        >
          Retry
        </Button>
      </Box>
    );

  return (
    <Box sx={{ mb: 6 }}>
      {/* Dashboard Header */}
      <DashboardHeader refreshData={fetchDashboardData} />

      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Main Dashboard Content */}
      <Grid container spacing={3}>

        {/* Applications per Vacancy Chart - 6 columns on medium screens */}
        <Grid item xs={12} md={6}>
          <VacancyApplicationsChart
            vacancies={vacancies}
            applications={applications}
          />
        </Grid>

        {/* Application to Vacancy Ratio Trend - 6 columns on medium screens */}
        <Grid item xs={12} md={6}>
          <ApplicationVacancyRatioTrend
            vacancies={vacancies}
            applications={applications}
          />
        </Grid>


        {/* Project Summary Card - 8 columns on medium screens */}
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
            <ProjectSummaryCard
              projectData={projects}
              projectStats={projectStats}
            />
          </Card>
        </Grid>

        {/* Vacancy Fill Rate Gauge - 4 columns on medium screens */}
        <Grid item xs={12} md={5}>
          <VacancyFillRateGauge
            vacancies={vacancies}
            applications={applications}
          />

        </Grid>



        {/* Recent Applications Table - 6 columns on medium screens */}
        <Grid item xs={12} md={7}>
          <RecentApplicationsTable
            applications={applications}
            vacancies={vacancies}
          />
        </Grid>

        {/* Recent Activity Feed - 6 columns on medium screens */}
        {/* <Grid item xs={12} md={6}>
          <RecentActivityFeed 
            applications={applications}
            vacancies={vacancies}
            projects={projects}
            employees={employees}
          />
        </Grid> */}

        {/* Project Timeline - 12 columns (full width) */}
        {/* <Grid item xs={12}>
          <ProjectTimeline projects={projects} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HRHome;