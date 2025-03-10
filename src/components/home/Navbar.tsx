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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hook/UseAuth";
import logo from "../../assets/images/logo.png";


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn, logout } = useAuth();

  const menuItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> },
    { name: "Properties", path: "/properties", icon: <BusinessIcon /> },
    { name: "Contact", path: "/contact", icon: <PhoneIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          p:1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{ width: "100px", height: "40px", objectFit: "contain" ,}}
          />
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: "#150b83c1" }} />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
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
          © 2024 RealEstate
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" className="app-bar">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box  component={Link} 
                to="/"  sx={{ display: "flex", alignItems: "center" ,marginLeft:{xs:"0",md:"0",xl:"-100px"} }}>
              <img
              className="nav-img"
                src={logo}
                style={{
                  width: "150px",
                  height: "80px",
                  objectFit: "contain"
                 
                }}
              />

            </Box>

            {/* Desktop Menu */}

            {!isMobile && (
              <>
              <Box
                sx={{
                  width:"100%",
                  marginRight:"-100px",
                  display: "flex",
                  ml: "auto",
                  gap: 4,
                  alignItems: "center",
                  justifyContent:"center"
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
              <Box sx={{marginRight:0}}>
                  {isLoggedIn ? (
                    <Button onClick={logout} className="nav-signin-btn">
                      Logout
                    </Button>
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
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <Box>
                  {isLoggedIn ? (
                    <Button onClick={logout} className="nav-signin-btn">
                      Logout
                    </Button>
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
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
