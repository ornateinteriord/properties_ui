import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import {
  Apartment as Building2,
  People as Users2,
  EmojiEvents as Trophy,
  Diamond as Gem,
  Place as MapPin,
} from "@mui/icons-material";

const About = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
        url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", px: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.75rem" },
              }}
            >
              Welcome to SK Properties
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "grey.200", maxWidth: "800px", mx: "auto" }}
            >
              Building Dreams, Creating Homes
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ "& > *": { mb: 3 } }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Our Legacy of Excellence
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  At SK Properties, we've been transforming the real estate
                  landscape for over two decades. Our commitment to quality,
                  innovation, and customer satisfaction has made us a trusted
                  name in the industry.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: "grey.50",
                        "&:hover": { boxShadow: 3 },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary"
                        fontWeight="bold"
                      >
                        500+
                      </Typography>
                      <Typography color="text.secondary">
                        Projects Completed
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: "grey.50",
                        "&:hover": { boxShadow: 3 },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary"
                        fontWeight="bold"
                      >
                        2000+
                      </Typography>
                      <Typography color="text.secondary">
                        Happy Clients
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 400,
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Building"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 4 }, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 6,
            }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: Building2,
                title: "Residential Properties",
                desc: "Find your perfect home from our extensive portfolio of residential properties.",
              },
              {
                icon: Users2,
                title: "Property Management",
                desc: "Professional property management services for landlords and tenants.",
              },
              {
                icon: Trophy,
                title: "Investment Advisory",
                desc: "Expert guidance on real estate investments and market analysis.",
              },
            ].map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: "100%",
                    "&:hover": { boxShadow: 6 },
                    transition: "all 0.3s ease",
                  }}
                >
                  <service.icon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: "medium", mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary">{service.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 6,
            }}
          >
            Why Choose SK Properties
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: Gem,
                title: "Quality Assurance",
                desc: "Highest standards in construction and materials",
              },
              {
                icon: Users2,
                title: "Expert Team",
                desc: "Experienced professionals at your service",
              },
              {
                icon: MapPin,
                title: "Prime Locations",
                desc: "Properties in the most sought-after areas",
              },
              {
                icon: Trophy,
                title: "Award Winning",
                desc: "Recognized for excellence in real estate",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 4,
                    "&:hover": { bgcolor: "grey.50" },
                    transition: "all 0.3s ease",
                  }}
                >
                  <feature.icon
                    color="primary"
                    sx={{ fontSize: 40, mb: 2, mx: "auto" }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "medium", mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">{feature.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
