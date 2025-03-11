import { Box, Typography, Card, CardContent, Button, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRef, useEffect, useState } from "react";
import './AllProperties.scss'

const agents = [
  {
    id: 1,
    name: "Asshvi",
    company: "Asshvi Estates",
    operatingSince: 2000,
    buyersServed: "500+",
    propertiesForSale: 117,
    propertiesForRent: 8,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  {
    id: 2,
    name: "Amit Kumar",
    company: "Realtap",
    operatingSince: 2008,
    buyersServed: "2000+",
    propertiesForSale: 92,
    propertiesForRent: 31,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  {
    id: 3,
    name: "Granesh",
    company: "Rich Source Realty",
    operatingSince: 2009,
    buyersServed: "4000+",
    propertiesForSale: 19,
    propertiesForRent: 3,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  {
    id: 4,
    name: "Vinuraj",
    company: "Homeniva Ventures",
    operatingSince: 2009,
    buyersServed: "5500+",
    propertiesForSale: 75,
    propertiesForRent: 31,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  {
    id: 4,
    name: "Vinuraj",
    company: "Homeniva Ventures",
    operatingSince: 2009,
    buyersServed: "5500+",
    propertiesForSale: 75,
    propertiesForRent: 31,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  {
    id: 4,
    name: "Vinuraj",
    company: "Homeniva Ventures",
    operatingSince: 2009,
    buyersServed: "5500+",
    propertiesForSale: 75,
    propertiesForRent: 31,
    rating: "CRISIL Rated",
    image: "https://via.placeholder.com/150", // Add image URL
  },
  // Add more agents as needed
];

const AgentCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
   const isMobile = useMediaQuery("(max-width:850px)");

  // Function to handle scrolling
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobile && !isHovered && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll) {
          // If at the end, scroll back to the start
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise, scroll forward
          scroll(300);
        }
      }
    }, 3000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isHovered]);

  return (
    <Box className="property-card-container" sx={{ p: 3, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box className="property-heading-box">
        <Typography   className="property-heading" variant="h4" sx={{ mb: 2, fontWeight: "bold" ,fontSize:{xs:"25px"}}}>
          Well Preferred Agents
        </Typography>
      </Box>
      <Box
       className="property-card-box"
        sx={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        onMouseEnter={() => setIsHovered(true)} // Pause auto-scroll on hover
        onMouseLeave={() => setIsHovered(false)} // Resume auto-scroll on mouse leave
      >
         {!isMobile && (
        <IconButton
          onClick={() => scroll(-300)}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ArrowBack />
        </IconButton>
         )}
        <Box
       
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {agents.map((agent) => (
            <Card    className="card" key={agent.id} sx={{ minWidth: 280, maxWidth: 300, borderRadius: 2, boxShadow: 3, flexShrink: 0 }}>
              <CardContent sx={{ display: "flex",width:"100%",flexDirection:"column", alignItems: "center" }}>
                <Box>
              <Avatar
                  src={agent.image}
                  sx={{ width: 80, height: 80, borderRadius: "50%" }} // Circular image
                />
                </Box>
                <Box sx={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {agent.name}
                  </Typography>
                  <Typography variant="body2">{agent.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Operating Since {agent.operatingSince}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Buyers Served {agent.buyersServed}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      {agent.propertiesForSale} Properties for Sale
                    </Typography>
                    <Typography variant="body2">
                      {agent.propertiesForRent} Properties for Rent
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, color: "green", fontWeight: "bold" }}>
                    {agent.rating}
                  </Typography>
                  <Button sx={{mt:2,backgroundColor:"#150b83c1",width:"110px",borderRadius:"30px",color:"#fff",textTransform:"none"}}>More info</Button>
                </Box>
              
                
              </CardContent>
            </Card>
          ))}
        </Box>
        {!isMobile && (
        <IconButton
          onClick={() => scroll(300)}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ArrowForward />
        </IconButton>
        )}
      </Box>

      <Box sx={{width:"100%",display:"flex",  justifyContent: { xs: "center", md: "flex-end" },}}>
      <Button
        variant="text"
        sx={{ mt: 2, color: "red", fontWeight: "bold", float: "right" }}
        endIcon={<ArrowForward />}
      >
        See all Agents
      </Button>
      </Box>
    </Box>
  );
};

export default AgentCards;