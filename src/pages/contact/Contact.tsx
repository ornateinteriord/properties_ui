import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow,
  Zoom,
} from "@mui/material";
import { useContact } from "../../api/user";
import { LoadingComponent } from "../../App";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Schedule as ClockIcon,
} from "@mui/icons-material";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const sendDetails = useContact();
  const { mutate, isPending } = sendDetails;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      phone: !formData.phone.trim() || !/^\d{10}$/.test(formData.phone),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      mutate(formData, {
        onSuccess: () => {
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
      });
    }
  };

  return (
    <Box sx={{ width: "100%", py: 0 }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          mb: 8,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", px: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
            >
              We're here to help you find your dream property
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="#contact-form"
              sx={{
                backgroundColor:"#150b83C1",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Contact Us Now
            </Button>
          </Box>
        </Fade>
      </Box>

      {/* Contact Content Section */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 8 }} id="contact-form">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <Slide in={true} direction="right" timeout={800}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", mb: 4, color: "#150b83C1" }}
                    >
                      Our Contact Details
                    </Typography>

                    <Box sx={{ "& > div": { mb: 3, display: "flex", gap: 2 } }}>
                      <Box>
                        <LocationIcon
                          sx={{ fontSize: 32, mt: 0.5,color:"#150b83C1" }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Our Office
                          </Typography>
                          <Typography color="text.secondary">
                            123 Property Lane, Real Estate City, RE 12345
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <PhoneIcon
                          
                          sx={{ fontSize: 32, mt: 0.5,color:"#150b83C1" }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Call Us
                          </Typography>
                          <Typography color="text.secondary">
                            +1 (555) 123-4567
                          </Typography>
                          <Typography color="text.secondary">
                            +1 (555) 765-4321
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <EmailIcon
                          
                          sx={{ fontSize: 32, mt: 0.5,color:"#150b83C1" }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Email Us
                          </Typography>
                          <Typography color="text.secondary">
                            info@skproperties.com
                          </Typography>
                          <Typography color="text.secondary">
                            support@skproperties.com
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <ClockIcon
                         
                          sx={{ fontSize: 32, mt: 0.5,color:"#150b83C1" }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold", }}>
                            Open Hours
                          </Typography>
                          <Typography color="text.secondary">
                            Mon-Fri: 9:00 AM - 6:00 PM
                          </Typography>
                          <Typography color="text.secondary">
                            Sat: 10:00 AM - 4:00 PM
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Slide>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Slide in={true} direction="left" timeout={800}>
                <Box>
                  <Paper
                    elevation={3}
                    sx={{ p: 4, borderRadius: 2, bgcolor: "background.paper" }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", mb: 3, color: "#150b83C1" }}
                    >
                      Send Us a Message
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Have questions about our properties or services? Fill out
                      the form below and our team will get back to you within 24
                      hours.
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? "Name is required" : ""}
                        fullWidth
                      />
                      <TextField
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={
                          errors.email ? "Enter a valid email address" : ""
                        }
                        fullWidth
                      />
                      <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        helperText={
                          errors.phone ? "Enter a valid 10-digit phone number" : ""
                        }
                        fullWidth
                      />
                      <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        helperText={errors.message ? "Message is required" : ""}
                        fullWidth
                        multiline
                        rows={4}
                      />
                      <Grow in={true} timeout={1500}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{
                            py: 1.5,
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            bgcolor: "#150b83C1",
                            "&:hover": { bgcolor: "4136bcc1" },
                          }}
                        >
                          Send Message
                        </Button>
                      </Grow>
                    </Box>
                  </Paper>
                </Box>
              </Slide>
            </Grid>
          </Grid>

          {/* Google Maps */}
          <Zoom in={true} timeout={1200}>
            <Box
              sx={{
                mt: 8,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <iframe
                title="SK Properties Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132468!2d-73.9878449241646!3d40.74844097138969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height={isMobile ? 300 : 450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </Box>
          </Zoom>
        </Container>
      </Box>
      {isPending && <LoadingComponent />}
    </Box>
  );
};

export default Contact;