import React from 'react'
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
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import Vacancies from './Vacancies';
import AddVacancies from './AddVacancies';
import { Routes } from 'react-router-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Link } from 'react-router-dom';
import UpdateVacancies from './UpdateVacancy';
import HRHome from './HRHome';

<ListItemButton component={Link} to="/Vacancy">
    <ListItemIcon><WorkIcon /></ListItemIcon>
    <ListItemText primary="Vacancies" />
</ListItemButton>

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
    }),
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


        

    export default function MainHR() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }} >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon className="bg-[#1A7A08]"/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" className='text-[#1A7A08]'>
                Admin Panel
            </Typography>
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
            <p className='text-[#1A7A08] font-bold text-xl text-right mr-28'>LOGO</p>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Home', 'Employee', 'Projects', 'Departments','Vacancies','Applications'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon component={Link} to={text === 'Vacancies' ? "/vacancy" : "#"}>
                    {   index % 6 === 0 ? <HomeIcon /> : 
                        index % 6 === 1 ? <PeopleAltIcon /> : 
                        index % 6 === 2 ? <AccountTreeIcon /> : 
                        index % 6 === 3 ? <BackupTableIcon /> : 
                        index % 6 === 4 ? <WorkIcon /> : <InsertDriveFileIcon /> 
                    }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List >
            {['Support', 'Settings'].map((text, index) => (
                <ListItem key={text} disablePadding >
                <ListItemButton >
                    <ListItemIcon className='fill-green-500'>
                    {index % 2 === 0 ? <HelpCenterIcon /> : <SettingsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Card sx={{ display: 'flex' }} className='mt-40'>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div">
                        Username
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Designation
                    </Typography>
                    </CardContent>
                </Box>
                <img src="" alt="Profile pic" className='rounded-full w-14 h-14 bg-green-500 mt-3' />
            </Card>
        </Drawer>

        <Main open={open}>
            <DrawerHeader />
            <Router>
                <Routes>
                    <Route path="/" element={<HRHome/>} />
                    <Route path="/vacancies" element={<Vacancies/>} />
                    <Route path="/vacanciesAdd" element={<AddVacancies/>} />
                    <Route path="/vacanciesUpdate" element={<UpdateVacancies/>}/>
                </Routes>
            </Router>

            {/* <UpdateVacancies/> */}
        </Main>

        </Box>
    );
    }
