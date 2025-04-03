import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)", // Adjust based on your header height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: { xs: 4, md: 10 },
        bgcolor: "rgba(0, 0, 0, 0.6)",
        backgroundImage: `url('https://vijay-villa-private-guesthouse-natures-homestay-hills.hotelsintamilnadu.com/data/Pics/OriginalPhoto/14601/1460183/1460183359/vijay-villa-private-guesthouse-natures-homestay-hills-yelagiri-pic-1.JPEG')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Creates parallax effect
        color: "white",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - About Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: "bold", 
                mb: 2, 
                color: "white",
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Responsive font size
              }}
            >
              Welcome to SK Properties
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                opacity: 0.9,
                fontSize: { xs: '0.9rem', md: '1rem' } // Responsive font size
              }}
            >
              At SK Properties, we help you find <strong>your dream home</strong> and the best
              investment opportunities. With years of experience in <strong>real estate
              development and property consulting</strong>, we specialize in <strong>residential,
              commercial, and luxury properties</strong>.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                opacity: 0.9,
                fontSize: { xs: '0.9rem', md: '1rem' } // Responsive font size
              }}
            >
              Our expert team ensures that every property meets the <strong>highest
              standards of quality and value</strong>, giving you the <strong>best deals</strong> in the
              market.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/properties")}
              sx={{ 
                textTransform: "none", 
                px: 4, 
                py: 1, 
                fontWeight: "bold",
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
              size="large"
            >
              Explore Properties
            </Button>
          </Grid>
          
          {/* Right Side - Can add image or additional content if needed */}
          <Grid item xs={12} md={6}>
            {/* Optional: Add an image or additional content here */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;