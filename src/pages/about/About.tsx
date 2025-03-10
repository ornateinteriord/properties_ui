import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
<<<<<<< HEAD
   <Box sx={{width:"100%",marginTop:"60px",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <h1>coming soon ...</h1>
   </Box>
  )
}
=======
    <Box
      sx={{
        width: "100%",
        mt: 8,
        py: 10,
        bgcolor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better readability
        backgroundImage: `url('https://vijay-villa-private-guesthouse-natures-homestay-hills.hotelsintamilnadu.com/data/Pics/OriginalPhoto/14601/1460183/1460183359/vijay-villa-private-guesthouse-natures-homestay-hills-yelagiri-pic-1.JPEG')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white", 
        opacity: 0.9,
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - About Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, color: "white" }}
            >
              Welcome to SK Properties
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              At SK Properties, we help you find <strong>your dream home</strong> and the best
              investment opportunities. With years of experience in <strong>real estate
              development and property consulting</strong>, we specialize in <strong>residential,
              commercial, and luxury properties</strong>.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Our expert team ensures that every property meets the <strong>highest
              standards of quality and value</strong>, giving you the <strong>best deals</strong> in the
              market.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/properties")}
              sx={{ textTransform: "none", px: 4, py: 1, fontWeight: "bold" }}
            >
              Explore Properties
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
>>>>>>> 6c2244ce5e020041b924b8f657cd241442cdf925

export default About;
