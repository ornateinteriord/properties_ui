import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { TrendingUp, Calculate, LocationOn, Insights, } from "@mui/icons-material"; // Import MUI icons

const AdviceAndTools = () => {
  const tools = [
    {
      title: "Rates & Trends",
      description: "Know all about Property Rates & Trends in your city",
      action: "View now →",
      icon: <TrendingUp fontSize="large" sx={{ color: "primary.main" }} />, // Add icon
    },
    {
      title: "EMI Calculator",
      description: "Know how much you'll have to pay every month on your loan",
      action: "View now →",
      icon: <Calculate fontSize="large" sx={{ color: "primary.main" }} />, // Add icon
    },
    {
      title: "Investment Hotspot",
      description: "Discover the top localities in your city for investment",
      action: "View now →",
      icon: <LocationOn fontSize="large" sx={{ color: "primary.main" }} />, // Add icon
    },
    {
      title: "Research Insights",
      description: "Get experts insights and research reports on real estate",
      action: "View now →",
      icon: <Insights fontSize="large" sx={{ color: "primary.main" }} />, // Add icon
    },
  ];

  return (
 
    <Box sx={{ p: 3,ml:-3,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", backgroundColor: "#e5e3e3c1" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        Advice & Tools
      </Typography>
      <Grid container spacing={4} sx={{ml:-6}}>
        {tools.map((tool, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  {tool.icon} {/* Display icon */}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                  {tool.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
                  {tool.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="text"
                  sx={{ color: "red", fontWeight: "bold" }}
                  endIcon={""}
                >
                  {tool.action}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  
  );
};

export default AdviceAndTools;