import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import WorkIcon from '@mui/icons-material/Work';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate, Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // You might need to install this package
import { Button} from 'antd';


// Import your components
import Vacancies from './Vacancies';
import AddVacancies from './AddVacancies';
import UpdateVacancy from './UpdateVacancy';
import Employees from './Employees';
import AddEmployee from './AddEmployee';
import Applications from './Applications';
import CVs from './CVs';
import Projects from './Projects';
import Departments from './Departments';
import ProjectsPending from '../Components/ProjectsPending';
import AddProject from './AddProject';
import Dashboard from './Dashboard';
import MembersAccounts from './MembersAccounts';
import VacancyApplications from './vacancyApplications';
import Members from './Members';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// Protected Route component to restrict access based on role
const ProtectedRoute = ({ element, allowedRoles }) => {
    const token = localStorage.getItem('token');
    let userRole = '';
    let userName = '';
    
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.role;
            userName = decoded.name;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default function MainHR() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [userDepartment, setUserDepartment] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Decode the token to get user information
        try {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
            setUserName(decoded.name);
            setUserDepartment(decoded.department || 'Department');
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Create a custom Link component that prevents default navigation
    const CustomLink = React.forwardRef((props, ref) => (
        <RouterLink 
            ref={ref} 
            {...props} 
            onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                navigate(props.to); // Use navigate from react-router-dom
            }}
        />
    ));

    // Define menu items based on user role
    const menuItems = [
        { text: 'Home', path: '/dashboard', icon: <HomeIcon />, roles: ['admin','member'] },
        { text: 'Employee', path: '/employee', icon: <PeopleAltIcon />, roles: ['admin','member'] },
        { text: 'Projects', path: '/projects', icon: <AccountTreeIcon />, roles: ['admin','member'] },
        { text: 'Vacancies', path: '/vacancies', icon: <WorkIcon />, roles: ['admin','member'] },
        { text: 'Members Accounts', path: '/membersaccounts', icon: <InsertDriveFileIcon />, roles: ['admin'] }
    ];

    // Filter menu items based on user role
    const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <div>
            <Box sx={{ display: 'flex', backgroundColor: 'rgb(240 253 244)', height: '100vh' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon className="bg-[#1A7A08]" />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" className="text-[#1A7A08]">
                            <span className='font-bold'>ADMIN PANEL</span> 
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button 
                            className="bg-[#1A7A08] text-white hover:bg-[#1A7A08] rounded-lg"
                            variant="contained" 
                            color="error" 
                            onClick={handleLogout}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <p className="text-[#1A7A08] font-bold text-xl text-right mr-28">LOGO</p>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List> 
                        {filteredMenuItems.map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={CustomLink}
                                    to={item.path}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />

                    <Card sx={{ display: 'flex' }} className="mt-[310px]">
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div">{userName}</Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} - {userDepartment}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Drawer>

                <Main open={open} className='bg-green-50 h-full'>
                    <DrawerHeader />
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/vacancies" element={<ProtectedRoute element={<Vacancies />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/vacanciesAdd" element={<ProtectedRoute element={<AddVacancies />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/vacanciesUpdate" element={<ProtectedRoute element={<UpdateVacancy />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/employee" element={<ProtectedRoute element={<Employees />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/AddEmployee" element={<ProtectedRoute element={<AddEmployee />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/applications" element={<ProtectedRoute element={<Applications />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/projects" element={<ProtectedRoute element={<Projects />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/projectsPending" element={<ProtectedRoute element={<ProjectsPending />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/addProject" element={<ProtectedRoute element={<AddProject />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/cvs/:applicationId" element={<ProtectedRoute element={<CVs />} allowedRoles={['admin', 'member']} />} />
                        <Route path="/vacancies/:id" element={<ProtectedRoute element={<VacancyApplications />} allowedRoles={['admin', 'member']} />} />
                        
                        {/* Only admin can access this route */}
                        <Route path="/membersaccounts" element={<ProtectedRoute element={<Members />} allowedRoles={['admin']} />} />
                        <Route path="/addmembersaccounts" element={<ProtectedRoute element={<MembersAccounts />} allowedRoles={['admin']} />} />
                        
                        {/* Redirect to dashboard if no matching route */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        
                        {/* Unauthorized page */}
                        <Route path="/unauthorized" element={<div className="text-center p-5">
                            <h2 className="text-2xl font-bold text-red-600">Unauthorized Access</h2>
                            <p className="mt-3">You don't have permission to access this page.</p>
                            <button 
                                className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" 
                                onClick={() => navigate('/dashboard')}
                            >
                                Return to Dashboard
                            </button>
                        </div>} />
                    </Routes>
                </Main>
            </Box>
        </div>
    );
}