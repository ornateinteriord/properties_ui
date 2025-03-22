import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Link,
    IconButton,
  } from "@mui/material";
  import {
    Facebook,
    Instagram,
    LinkedIn,
    YouTube,
  } from "@mui/icons-material"; // Social media icons
  
  const Footer = () => {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#2E3B55",
          color: "white",
          padding: "40px 20px",
          marginTop: "auto",
          marginBottom:"0%" 
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            // Center all items on screens 600px or smaller
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {/* Column 1: About Website */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              About Website
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Our Story
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Mission & Vision
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Team
              </Link>
            </Typography>
          </Grid>
  
          {/* Column 2: Terms & Conditions */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Terms & Conditions
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Terms of Use
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Cookie Policy
              </Link>
            </Typography>
          </Grid>
  
          {/* Column 3: Social Network */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Social Network
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" }, // Center icons on small screens
              }}
            >
              <IconButton
                href="#"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="#"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                href="#"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="#"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
  
          {/* Column 4: Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}>
              Subscribe to our newsletter for updates.
            </Typography>
            <Box
              sx={{
                display: "flex",
               
                flexDirection:{xs:"column",md:"row",xl:"row"},
                gap: 1,
                justifyContent: { xs: "center",md:"center"}, // Center on small screens
                // Center on small screens
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <Box>
              <Button
                variant="contained"
                sx={{
                  width:{xs:"30%",md:"100%"},
                  backgroundColor: "#FF6B6B",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#FF4C4C",
                  },
                }}
              >
                Subscribe
              </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
  
        {/* Footer Bottom */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} SK Properties. All rights reserved.
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default Footer;