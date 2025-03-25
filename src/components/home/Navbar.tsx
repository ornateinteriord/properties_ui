import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Container,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,
  Menu,
  Divider,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  Dashboard,
} from "@mui/icons-material";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/UseAuth";
import logo from "../../assets/images/logo.png";
import { ChevronDown, HousePlus, LogOutIcon, MapPin, Settings, User } from "lucide-react";
import TokenService from "../../api/token/TokenService";
import { useGetuserDetails } from "../../api/user";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { data: user } = useGetuserDetails();
  const isRole = TokenService.getRole()

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/signin");
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = !isLoggedIn? [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> },
    { name: "Properties", path: "/properties", icon: <BusinessIcon /> },
    { name: "Contact", path: "/contact", icon: <PhoneIcon /> },
  ]:[
    { name: "Help & Support", path: "/help-support", icon: <InfoIcon /> },
    { name: "Contact", path: "/contact", icon: <PhoneIcon /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width:{xs:250,md:290} }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          p: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{ width: "100px", height: "40px", objectFit: "contain" }}
          />
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: "#150b83c1" }} />
        </IconButton>
      </Box>
      <List >
        { menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 1,
                "&:hover": {
                  bgcolor: "#f0f0f0",
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "#150b83c1",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: "auto", borderTop: 1, borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary">
          © 2024 SK Properties
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" className="app-bar">
        <Container  sx={{maxWidth:"1400px"}} maxWidth={false}>
          <Toolbar disableGutters  className="tool-bar" >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width:"100%",
              }}
            >
               <Link to="/">
              <img
               
                className="nav-img"
                src={logo}
                style={{
                  width: "150px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
              </Link>
            </Box>

            {/* Desktop Menu */}

            {!isLoggedIn &&!isMobile && (
              <Box
                sx={{
                  width: "100%",
                  marginRight: "-100px",
                  display: "flex",
                  ml: "auto",
                  gap: 4,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {menuItems.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      position: "relative",
                      "&:hover": {
                        "&::after": {
                          transform: "scaleX(1)",
                        },
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -7,
                        left: 0,
                        width: "100%",
                        height: 2,
                        bgcolor: "#fff",
                        transform: "scaleX(0)",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <Typography
                      component={Link}
                      to={item.path}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#fff",
                        textDecoration: "none",
                        "&:hover": {
                          color: "#fff",
                        },
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Box className="menu-btn-container">
              <Box sx={{ marginRight: 0 }}>
                {isLoggedIn ? (
                  <Box
                    className="profile-panel-content"
                    onClick={handleMenuOpen}
                  >
                    <Avatar
                      className="user-avatar"
                      alt="User Avatar"
                      src={user?.profileImage || ''}
                      sx={{
                        width: { xs: "40px", md: "40px", xl: "60px" },
                        height: { xs: "40px", md: "40px", xl: "60px" },
                        margin: "0%",
                      }}
                    >
                      {user?.profileImage || user?.fullname?.charAt(0).toUpperCase() || ""}
                    </Avatar>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {user?.fullname || "profile"}
                    </Typography>
                    <ChevronDown
                      color="white"
                      size={22}
                      style={{
                        transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                ) : (
                  <Button
                    component={Link}
                    to="/signin"
                    className="nav-signin-btn"
                  >
                    Sign in
                  </Button>
                )}
              </Box>

              {/* Mobile Menu Button */}
              {(isLoggedIn || isMobile) &&(
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* profile-panel ---------- */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          className: Boolean(anchorEl) ? "custom-menu open" : "custom-menu",
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/my-properties");
          }}
        >
          <User size={18} style={{ marginRight: "8px" }} />
          My Property
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-profile");
            setAnchorEl(null);
          }}
        >
          <Settings size={18} style={{ marginRight: "8px" }} />
          profile Setting
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/properties", { state: { openDialog: true } });
            setAnchorEl(null);
          }}
        >
          <HousePlus size={18} style={{ marginRight: "8px" }} />
          post Property
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/properties-map");
            setAnchorEl(null);
          }}
        >
          <MapPin size={18} style={{ marginRight: "8px" }} />
          Map
        </MenuItem>

        {isRole === "admin" && (
        <MenuItem
          onClick={() => {
            navigate("/admin/dashboard");
            setAnchorEl(null);
          }}
        >
          <Dashboard sx={{ marginRight: "8px" ,fontSize:"19px"}} />
          Dashboard
        </MenuItem>
        )}
        <Divider />
        <Box>
          <MenuItem onClick={handleLogout}>
            <LogOutIcon
              size={18}
              style={{ marginRight: "4px", color: "red" }}
            />
            Logout
          </MenuItem>
        </Box>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": { 
            width: 250,
            '@media (min-width: 600px)': {
              width: 300
            }
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
