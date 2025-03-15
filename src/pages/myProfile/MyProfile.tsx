import {
  Box,
  Card,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import {  useEffect, useState } from "react";

import { useGetuserDetails, userUpdateDetails } from "../../api/user";

import { getCloudinaryUrl } from "../../api/product";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {data:user} = useGetuserDetails()

  const [formData, setFormData] = useState<Record<string, string>>({
    gender: "",
    profileImage:""
  });
  const cloudinary = getCloudinaryUrl();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      cloudinary.mutate(file, {
        onSuccess: (data) => {
          setFormData((prevData: any) => ({
            ...prevData,
            profileImage: data.secure_url,
          }));
        },
        onError: (err) => {
          toast.error("failed to uplaod image");
          console.log(err);
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        ...user,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      await userUpdateDetails(formData);
    } catch(error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        background: "rgba(216, 220, 223, 0.757)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          mt: { xs: 5, md: -10 },
          width: { xs: "90%", sm: "80%", md: "60%", lg: "100%" },
          display: "flex",
          flexDirection: { xs: "column", md: "column", xl: "row" },
          justifyContent: "center",
          gap: { xs: "25px", md: "10px" },
          p: { xs: 2, sm: 3 },
          paddingTop: { xl: 10 },
          borderRadius: 2,
          boxShadow: 3,
          position: "relative", // Added for positioning the edit button
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "100%", xl: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
          src={user?.profileImage || ""}
            component="img"
            sx={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid black",
            }}
            // Replace with actual image source
          />
          <Button
           component="label"
            variant="contained"
            sx={{
              mt: 2,
              background: "#150b83c1",
              color: "#fff",
              textTransform: "none",
              width: "150px",
            }}
          >
            Upload Image
            <input
              type="file"
              name="profileImage"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column", xl: "row" },
              gap: "20px",
            }}
          >
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                placeholder="password"
                value={formData.password}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#150b83c1" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
            
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: { xs: "10px", md: "20px", xl: "20px" },
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
                  className="radio"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={
                      <Radio sx={{ "&.Mui-checked": { color: "#150b83c1" } }} />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio sx={{ "&.Mui-checked": { color: "#150b83c1" } }} />
                    }
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </form>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end", xl: "flex-end" },
            }}
          >
            <Button
              type="submit"
              sx={{
                background: "#150b83c1",
                color: "#fff",
                textTransform: "none",
                width: "100px",
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Card>
      {/* {isPending && <LoadingComponent />} */}
    </Box>
  );
};

export default MyProfile;
