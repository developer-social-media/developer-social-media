import {
  AppBar,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Grid,
  Box,
  TableBody,
  TableRow,
  TableCell,
  } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Flag, Settings, Logout } from "@mui/icons-material";
import { IoMdSearch } from "react-icons/io";
import React from "react";
import { Container } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../app/store";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import theme from "../../app/theme";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.is_admin);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const profilePic = useSelector((state) => state.auth.me.img_url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.me.id);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <nav>
        {isBanned ? (
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" theme={theme} color="primary">
                <Container maxWidth="xl" spacing={2} theme={theme} color='primary'>
                  <Grid item xs={12} container color='primary'>
                    <Grid item xs={0.5} />
                    <Link to='/'>Banned</Link>
                    <Grid item xs={0.5} />
                    <Link to='/contactUs'>Contact Us</Link>
                    </Grid>
                  </Container>
                </AppBar>
              </Box>
            </div>
        ) : isAdmin ? (
          <div>
            <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static"  theme={theme} color="primary">
              <Container maxWidth="xl" spacing={2} theme={theme} color='primary'>
                <Grid item xs={12} container color='primary'>
                  <Link to='/'>
                  <img style={{height: '50px'}} src='devupsocialnavbar.png' />
                  </Link>
                  <Tooltip title="Account Settings" display="flex">
                    <IconButton
                      onClick={handleClick}
                      sx={{marginLeft:'auto'}}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      theme={theme} color="primary"
                    >
                      <Stack direction="row" spacing={2}
                      theme={theme} color="primary">
                        <StyledBadge

                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",

                          }}

                          variant="dot"
                        >
                           <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginRight: '10px'}} 
                src={profilePic} 
                />
                        </StyledBadge>
                      </Stack>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to={`/users/${user}`}>
                      <MenuItem>
                      <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginRight: '10px'}} 
                src={profilePic} 
                />Profile
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/EditUser">
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    </Link>
                    <Link to ="/project">
                      <MenuItem>
                      <ListItemIcon>
                        <FolderIcon fontSize="small" />
                      </ListItemIcon>
                      All Projects
                      </MenuItem>
                    </Link>
                        <Link to="/support">
                      <MenuItem>
                        <ListItemIcon>
                          <Flag fontSize="small" />
                        </ListItemIcon>
                        Support
                      </MenuItem>
                    </Link>
                    <Link to="/notifications">
                      <MenuItem>
                        <ListItemIcon>
                          <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        Notifications
                      </MenuItem>
                    </Link>
                    <Link to="/reportInbox">
                      <MenuItem>
                        <ListItemIcon>
                          <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        Report Inbox
                      </MenuItem>
                    </Link>
                    <Link to="/supportTickets">
                      <MenuItem>
                        <ListItemIcon>
                          <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        Support Tickets
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logoutAndRedirectHome}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Grid>
              </Container>
            </AppBar>
            </Box>
          </div>
        ) : isLoggedIn ? (
          <div>
            <AppBar position="static" theme={theme} color="primary">
              <Container maxWidth="xl" theme={theme} color="primary">
                <Grid item xs={12} container>
                <Link to='/'>
                  <img style={{height: '50px'}} src='devupsocialnavbar.png' />
                  </Link>
                  <Tooltip title="Account Settings" display="flex" >
                    <IconButton
                      sx={{marginLeft:'auto'}}
                      onClick={handleClick}
                      theme={theme} color="primary"
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}


                    >
                      <Stack direction="row" spacing={2}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                           <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginRight: '10px'}} 
                src={profilePic} 
                />
                        </StyledBadge>
                      </Stack>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to={`/users/${user}`}>
                      <MenuItem>
                        <Avatar src={profilePic} /> Profile
                      </MenuItem>
                    </Link>
                    <Link to="/friendrequests">

                      <MenuItem>
                      <ListItemIcon>
                      <PersonAddIcon fontSize ="small"/>
                      </ListItemIcon>
                      Friend Requests
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/EditUser">
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    </Link>
                    <Link to="/support">
                      <MenuItem>
                        <ListItemIcon>
                          <Flag fontSize="small" />
                        </ListItemIcon>
                        Support
                      </MenuItem>
                    </Link>
                    <Link to="/notifications">
                      <MenuItem>
                        <ListItemIcon>
                          <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        Notifications
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logoutAndRedirectHome}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Grid>
              </Container>
            </AppBar>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <AppBar position="static">
              <Container maxWidth="xl">
                <Grid item xs={12} container>
                  <Grid item xs={0.5} />
                  <Link to="/login">Login</Link>
                  <Grid item xs={0.5} />
                  <Link to="/signup">Sign Up</Link>
                  <Grid item xs={0.5} />
                </Grid>
              </Container>
            </AppBar>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
