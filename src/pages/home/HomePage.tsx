import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./HomePage.scss";
import AllPropertiesCards from "./AllProperties";
import AgentCards from "./AgentsCards";
import AdviceAndTools from "./Tools";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box>
      <Box className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5}}
          style={{
            textAlign: "center",
            color: "white",
            position: "relative",
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
            <Button component={Link} to="/properties"  sx={{mt:2,backgroundColor:"#150b83c1",width:"150px",borderRadius:"30px",color:"#fff",textTransform:"none"}}>Find Property</Button>
            {/* <PropertySearch /> */}
            <Button component={Link} to="/properties"  sx={{mt:2,backgroundColor:{md:"#150b83c1",xs:"#150b83"},width:"150px",borderRadius:"30px",color:"#fff",textTransform:"none"}}>Find Property</Button>
              
          </Box>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 20 }} 
        transition={{ duration: 2}} 
        className="apartment-cards"
      >
        <Box>
          {" "}
          <AllPropertiesCards />
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 2}} 
        className="apartment-cards"
      >
        <Box>
          {" "}
          <AgentCards />
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 20 }} 
        transition={{ duration: 2}} 
      className="advicetool-cards"
      >
        <Box >
         
          <AdviceAndTools />
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomePage;
