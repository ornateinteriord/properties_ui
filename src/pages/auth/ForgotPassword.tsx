import { Box, Button, Card, CardContent, Container, InputAdornment, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useResetpassword } from "../../api/auth";
import { LoadingComponent } from "../../App";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
   const [formData, setFormData] = useState<Record<string, string>>({});
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "confirmPassword" && value === "") {
      setErrorMessage(""); // Assuming setErrorMessage updates the error state
    }
  };
  const ResetPasswordMutation = useResetpassword();
  const { mutate, isPending } = ResetPasswordMutation;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (step === 1 && formData.email) {
        mutate({ email: formData.email });
        setStep((prev)=>prev+1);
      } else if (step === 2 && otp.length === 6) {
        mutate(
          { email: formData.email, otp },
          {
            onSuccess: () => {
              setStep((prev)=>prev+1);
            },
            onError: () => {
              setOtp("");
              setStep((prev)=>prev-1);
            },
          }
        );
      } else if (step === 3) {
        if (formData.password.length <= 5) {
          setErrorMessage("Password must be at least 6 characters*");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords do not match");
          return;
        }
        
        mutate({ email: formData.email, password: formData.password, otp },
          {
            onSuccess: () => {
              navigate("/signin"); // Navigate only on success
              setFormData({ email: "", password: "", confirmPassword: "" });
              setOtp("");
              setStep(1);
              setErrorMessage("");
            },
            onError: (error) => {
                console.log(error.response?.data?.message) 
            },
          }
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
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
              Reset Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
            {step >= 1 && (
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={step > 1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#150b83c1" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#150b83c1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#150b83c1",
                      },
                    },
                  }}
                />
              )}
              {!isPending && step >= 2 && (
                <MuiOtpInput
                sx={{display:"flex",gap:{xs:1.5,sm:2,md:3}}}
                  value={otp}
                  length={6}
                  onChange={setOtp}
                  autoFocus
                  validateChar={(char) => /^\d+$/.test(char)}
                  TextFieldsProps={{
                    disabled: step > 2,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                      },
                      "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":{
                        p:{xs:0,sm:0},
                        height:"30px",
                        
                      },
                      textAlign: "center",
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": {
                          borderColor: "#150b83c1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#150b83c1",
                        },
                      },
                    },
                  }}
                />
              )}
               {!isPending && step === 3 && (
                <>
                  <TextField
                    required
                    id="password"
                    label="New Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#150b83c1" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#150b83c1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#150b83c1",
                        },
                      },
                    }}
                  />

                  <TextField
                    required
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#150b83c1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#150b83c1",
                        },
                      },
                    }}
                  />
                </>
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
                {step === 1
                  ? "Get OTP"
                  : step === 2
                  ? "Verify OTP"
                  : "Reset Password"}
              </Button>
            </Box>
            </CardContent> 
        </Card>
      </Box>
      {isPending && <LoadingComponent />}
    </Container>
  );
};

export default ForgotPassword;
