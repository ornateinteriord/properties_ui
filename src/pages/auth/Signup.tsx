import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useSignupMutation } from "../../api/auth";
import { LoadingComponent } from "../../App";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [genderError, setGenderError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({
    gender:""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
    setGenderError(false);
  };

  const SignupMutation = useSignupMutation();
  const { mutate, isPending } = SignupMutation;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.gender) {
      setGenderError(true);
      return;
    }
    if (formData.password.length <= 5) {
      setErrorMessage("Password must be atleast 6 character*");
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      mutate(formData);
      navigate('/signin')
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.7)",
            backgroundColor: "#fff",
            mt: 12,
            mb: 5,
          }}
        >
          <CardContent sx={{ padding: "2rem" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#150b83c1", mb: 3, textAlign: "center" }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <TextField
                required
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="mobileno"
                label="Mobileno"
                name="mobileno"
                autoComplete="mobileno"
                autoFocus
                placeholder="Mobileno."
                value={formData.mobileno}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="confirmpassword"
                label="confirmpassword"
                type="password"
                id="password"
                autoComplete="confirmpasswordrd"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
                error={!!errorMessage} 
                helperText={errorMessage} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
                error={!!genderError}
                // className="form-control"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  sx={{
                    color: "#150b83c1 !important",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <WcIcon sx={{ color: "#150b83c1 " }} />
                  Gender:
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleRadioChange}
                  className="radio-grp"
                >
                  <FormControlLabel
                    value="Male"
                    className="form-control-label"
                    control={
                      <Radio sx={{ "&.Mui-checked": { color: "#150b83c1" } }} />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    className="form-control-label"
                    value="Female"
                    control={
                      <Radio sx={{ "&.Mui-checked": { color: "#150b83c1" } }} />
                    }
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              {genderError && (
                   <FormHelperText sx={{color:"#d32f2f",marginTop:"-20px"}}>  Please select your gender*</FormHelperText>
                  )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#150b83c1",
                  "&:hover": { backgroundColor: "#4136bcc1" },
                }}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {isPending && <LoadingComponent />}
    </Container>
  );
};

export default Signup;
