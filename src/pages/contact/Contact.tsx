import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Contact = () => {
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
    setErrors({ ...errors, [e.target.name]: false }); // Reset errors on input
  };

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
      alert("Thank you! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 8, py: 6, bgcolor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h3" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}>
          Have any questions? Fill out the form below and our team will get in touch with you.
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                helperText={errors.email ? "Enter a valid email address" : ""}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone ? "Enter a valid 10-digit phone number" : ""}
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
              <Button type="submit" variant="contained" color="primary" sx={{ py: 1.5 }}>
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
    <Box sx={{width:"100%",height:"100vh",marginTop:"60px",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <h1>coming soon ...</h1>
   </Box>
  

export default Contact;
