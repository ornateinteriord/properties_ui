import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./HomePage.scss";
import AllPropertiesCards from "./AllProperties";
import AdviceAndTools from "./Tools";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const images = [
    "https://wallpapercave.com/wp/wp7406688.jpg",
    "https://assets.cntraveller.in/photos/612350165ee2ad4060e8cb54/master/w_1600%2Cc_limit/Xanadu%2520exterior.jpg",
    "https://c4.wallpaperflare.com/wallpaper/640/463/638/nature-landscape-green-water-wallpaper-preview.jpg",
    "https://wallpapers.com/images/hd/apartment-interior-during-sunset-8q4dk0825mqxychg.jpg",
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const duplicatedImages = [images[images.length - 1], ...images, images[0]]; 
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideNext = () => {
      setIndex((prevIndex) => (prevIndex + 1));
    };

    const timeout = setTimeout(slideNext, 4000); 

    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({
        left: index * slider.clientWidth,
        behavior: "smooth",
      });
    }
    if (index === duplicatedImages.length - 1) {
      setTimeout(() => {
        setIndex(1); 
        if (slider) {
          slider.scrollTo({ left: slider.clientWidth, behavior: "instant" });
        }
      }, 500); 
    }
  }, [index]);
  return (
    <Box>
      <Box className="hero-section" >
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="motion-div"
          style={{
            textAlign: "center",
            color: "white",
            position: "absolute", 
            top: "12%", 
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Find Your Dream Property
          </Typography>
          <Typography variant="h5">
            Discover the perfect place to call home
          </Typography>
          <Box sx={{ width: "100%", marginTop: "10px" }}>
            {/* <PropertySearch /> */}
            <Button
              component={Link}
              to="/properties"
              sx={{
                mt: 2,
                backgroundColor: { md: "#150b83c1", xs: "#150b83" },
                width: "150px",
                borderRadius: "30px",
                color: "#fff",
                textTransform: "none",
              }}
            >
              Find Property
            </Button>
          </Box>
        </motion.div>
        <Box
          className="slider-container"
          ref={sliderRef}
          sx={{
            display: "flex",
            width: "100vw",
            overflow: "hidden", 
            position: "relative", 
            scrollBehavior: "smooth",
          }}
        >
         
          {[...images,...images].map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              sx={{
                width: "100vw",
                height: "100vh",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          ))}
         
          
        </Box>
       

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 20 }}
          transition={{ duration: 2 }}
          className="apartment-cards"
        >
          <Box>
            {" "}
            <AllPropertiesCards />
          </Box>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 20 }}
        transition={{ duration: 2 }}
        className="advicetool-cards"
      >
        <Box>
          <AdviceAndTools />
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomePage;
