import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useLoginMutation } from "../../api/auth";
import { LoadingComponent } from "../../App";

const Signin = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginMutation = useLoginMutation();
  const { mutate, isPending } = loginMutation;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
          }}
        >
          <CardContent sx={{ padding: "2rem" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#150b83c1", mb: 3, textAlign: "center" }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <TextField
                required
                id="username"
                label="Username"
                name="identifier"
                autoComplete="username"
                autoFocus
                placeholder="Username/Phone no/Email"
                value={formData.identifier}
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
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
               <Typography variant="body2" sx={{ textAlign: "left" }}>
                forgot password?{" "}
                <Link
                  to="/reset-password"
                  style={{
                    color: "#150b83c1",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Reset
                </Link>
              </Typography>
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
              <Typography variant="body2" sx={{ textAlign: "center",}}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#150b83c1",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {isPending && <LoadingComponent />}
    </Container>
  );
};

export default Signin;
