import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { MenuIcon } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import useAuth from "../../../hook/UseAuth";
import TokenService from "../../../api/token/TokenService";

const AdminNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {isLoggedIn} = useAuth()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
     
      navigate("/signin");
      TokenService.removeToken();
      window.dispatchEvent(new Event("storage"));
    };
  return (
    <>
      <AppBar position="fixed"  className="app-bar">
        <Toolbar disableGutters className="tool-bar">
          <IconButton sx={{ ml: 2 }} onClick={toggleSidebar}>
            <MenuIcon color="#150b83c1" />
          </IconButton>
          <Box
            component={Link}
            to="/"
            sx={{
              ml: 10,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              className="nav-img"
              src={logo}
              style={{
                width: "150px",
                height: "80px",
                objectFit: "contain",
              }}
            />
          </Box>
          {isLoggedIn && (
          <Box sx={{mr:{xs:2,md:10,xl:20},}}>
            <Button   onClick={handleLogout}   className="nav-signin-btn">
              Sign Out
            </Button>
          </Box>
          )}
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default AdminNavbar;
