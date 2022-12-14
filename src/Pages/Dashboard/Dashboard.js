import * as React from 'react';
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
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import {useAuthContext} from '../../Providers/AuthProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFormBuilderContext } from '../../Providers/FormBuilderProvider';

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
  height: '50px',
  justifyContent: 'center',
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
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  height: '50px',
  justifyContent: 'flex-end',
}));

const Dashboard = () => {
  const {setMode, setFormId} = useFormBuilderContext();

  const theme = useTheme();
  const { logOut } = useAuthContext();

  const [open, setOpen] = React.useState(false);
  const [openDocs1, setOpenDocs1] = React.useState(false);
  const [openDocs2, setOpenDocs2] = React.useState(false);
  const [openDocs3, setOpenDocs3] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar style={{
          justifyContent: "space-between"}}>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' })}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{fontWeight: "400"}}>
            VeriDocs
          </Typography>
          <IconButton style={{color: "white"}} onClick={() => {
            logOut(
              () => {
                navigate("/");
              }
            );
          }}>
            <Logout/>
          </IconButton>
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
        open={open}>
        <DrawerHeader style={{alignItems: "center",
        justifyContent: "space-between"
    }}>
           <div style={{width: "20px"}}></div>
            <h3 style={{display: "inline", fontWeight: "500"}}>Main Menu</h3>
          <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button onClick={() => {
              navigate("/dashboard/summary");
            }}>
              <ListItemText primary="Summary" />
            </ListItem>

            <ListItem button onClick={() => {
              navigate("/dashboard/forms", {state: {mode: 'create'}});
            }}>
              <ListItemText primary="Forms" />
            </ListItem>

            <ListItem button onClick={() => {
              navigate("/dashboard/assignments");
            }}>
              <ListItemText primary="Assignments" />
            </ListItem>

            <ListItem button onClick={() => {
              setFormId(null);
              setMode('create');
              navigate("/dashboard/formBuilderPage", {state: {mode: 'create'}});
            }}>
              <ListItemText primary="Form Builder" />
            </ListItem>
            <ListItem button onClick={() => {
              setOpenDocs1(!openDocs1);
            }}>
              <ListItemText primary="Documents" />
                {openDocs1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDocs1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 6 }} onClick={() => {
                  navigate("/dashboard/assignment/create")
                }}>
                  <ListItemText primary="Assign" />
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Verify" />
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Verification Type" />
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Proof of Delivery" />
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Status" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => {
              setOpenDocs2(!openDocs2);
            }}>
  
              <ListItemText primary="Field Verifiers" />
                {openDocs2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDocs2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="List" onClick={() => {
                    navigate("/dashboard/fieldVerifierPage", {state: {mode: "view"}});
                  }}/>
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Add" onClick={() => {
                    navigate("/dashboard/addFieldVerifierPage");
                  }}/>
                </ListItem>
              </List>

            </Collapse>
            <ListItem button onClick={() => {
              setOpenDocs3(!openDocs3);
            }}>
      
              <ListItemText primary="Agencies" />
                {openDocs3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDocs3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="List" />
                </ListItem>
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemText primary="Add" />
                </ListItem>
              </List>
            </Collapse>
        </List>
      </Drawer>
      <Main open={open}>
        <div style={{
          marginTop: '4em'
        }}></div>
        <Outlet/>
      </Main>
    </Box>
  );
}

export default Dashboard;