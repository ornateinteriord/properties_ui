import { Box, Typography, Card, CardContent, Button,  Avatar, } from "@mui/material";
import {  ArrowForward } from "@mui/icons-material";
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

   const [activeIndex, setActiveIndex] = useState(0);
   const cardWidth = 300;
   const gap = 16;


 
   const scrollToIndex = (index: number) => {
      if (scrollRef.current) {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 300; 
        scrollRef.current.scrollTo({
          left: index * (cardWidth + 16), 
          behavior: "smooth",
        });
        setActiveIndex(index); 
      }
    };
  
    const updateActiveIndexOnScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft } = scrollRef.current;
        const newIndex = Math.floor((scrollLeft + cardWidth / 2) / (cardWidth + gap));
        setActiveIndex(Math.min(newIndex, agents.length - 1));
      }
    };
  
    useEffect(() => {
      const container = scrollRef.current;
      if (container) {
        container.addEventListener("scroll", updateActiveIndexOnScroll);
      }
      return () => container?.removeEventListener("scroll", updateActiveIndexOnScroll);
    }, []);




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
       
      >
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
                 <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  {agents.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: activeIndex === index ? "#150b83c1" : "#ccc",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#150b83c1",
                        },
                      }}
                    />
                  ))}
                </Box>

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