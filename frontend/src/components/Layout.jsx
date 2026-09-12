import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, CssBaseline,
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Divider, Box, Avatar, useTheme, styled
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon       from '@mui/icons-material/Menu';
import DashboardIcon  from '@mui/icons-material/Dashboard';
import SchoolIcon     from '@mui/icons-material/School';
import PeopleIcon     from '@mui/icons-material/People';
import BookIcon       from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 260;

const Main = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.mixins.toolbar.minHeight,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `100%`,
    [theme.breakpoints.up('md')]: {
      marginLeft: open ? drawerWidth : 0,
      width: open
        ? `calc(100% - ${drawerWidth}px)`
        : `100%`,
    },
  })
);

export default function Layout({ children }) {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Programs',  icon: <SchoolIcon />,    path: '/programs' },
    { text: 'Faculty',   icon: <PeopleIcon />,    path: '/faculty' },
    { text: 'Courses',   icon: <BookIcon />,      path: '/courses' },
    { text: 'Students',  icon: <PeopleIcon />,    path: '/students' },
    { text: 'Attempts',  icon: <AssignmentIcon />,path: '/attempts' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" color="primary" elevation={1}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start" onClick={() => setOpen(!open)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>A</Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`
          },
          display: { xs: open ? 'block' : 'none', md: 'block' }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ ml: 1 }}>
            StudentMgmt
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ mt: 1 }}>
          {navItems.map(({ text, icon, path }) => (
            <ListItemButton
              key={text}
              component={RouterLink}
              to={path}
              selected={location.pathname === path}
              sx={{
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: theme.palette.action.selected,
                  '&:hover': { bgcolor: theme.palette.action.hover }
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
}
