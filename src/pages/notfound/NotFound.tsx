import { Link } from "react-router-dom";
import  notfound from '../../assets/images/notfound.png'
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
        background:"linear-gradient(90deg, rgba(222, 218, 237, 0.95), rgba(41, 18, 136, 0.76))"
      }}
    >
      <img src={notfound} style={{width:"400px"}} alt="" />
      <p style={{ fontSize: "1.5em", marginBottom: "30px" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          fontSize: "1em",
          borderRadius: "5px",
          backgroundColor: "#150b83c1",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go to Home
      </Link>
    </Box>
  );
};

export default NotFound;