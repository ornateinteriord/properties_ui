import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRef, useEffect, useState } from "react";
import "./AllProperties.scss";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1565953522043-baea26b83b7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "3 BHK Flat",
    price: "₹4.50 Cr",
    size: "2060 sqft",
    location: "A Block AECS Layout, Bangalore",
    status: "Ready to Move",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1612637968894-660373e23b03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
    title: "2 BHK Flat",
    price: "₹85 Lac",
    size: "1170 sqft",
    location: "BTM Layout, Bangalore",
    status: "Ready to Move",
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/2191979120/photo/large-field-of-soil-in-the-middle-of-the-forest.jpg?s=612x612&w=0&k=20&c=JQT5bm-POEbVRbwvN9LmHPh9iSwxJ35st6aG0Tt5meI=",
    title: "Site",
    price: "₹1.50 Cr",
    size: "1650 sqft",
    location: "Badami Layout, Bangalore",
    status: "Ready to Move",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1657302157898-eda546941dde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
    title: "Villa",
    price: "₹5.75 Cr",
    size: "2874 sqft",
    location: "Rajajinagar, Bangalore",
    status: "Ready to Move",
  },
  {
    id: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1726848085271-f68f93ec20c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wdHklMjBzaXRlfGVufDB8fDB8fHww",
    title: "Land",
    price: "₹5.75 Cr",
    size: "2874 sqft",
    location: "Rajajinagar, Bangalore",
    status: "Ready to Move",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80",
    title: "Villa",
    price: "₹5.75 Cr",
    size: "2874 sqft",
    location: "Rajajinagar, Bangalore",
    status: "Ready to Move",
  },
];

const AllPropertiesCards = () => {
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
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll(300);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Box
      className="property-card-container"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="property-heading-box">
        <Typography
          variant="h4"
          className="property-heading"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Modern Living, Elevated Comfortable Properties
        </Typography>
      </Box>
      <Box
        className="property-card-box"
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          className="allproperty-card"
        >
          {properties.map((property) => (
            <Card
              key={property.id}
              sx={{
                minWidth: 280,
                maxWidth: 300,
                borderRadius: 2,
                boxShadow: 3,
                flexShrink: 0,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={property.image}
                alt={property.title}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {property.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "green" }}
                >
                  {property.price} | {property.size}
                </Typography>
                <Typography variant="body2">{property.location}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.status}
                </Typography>
                <Button
                  sx={{
                    mt: 2,
                    backgroundColor: "#150b83c1",
                    width: "110px",
                    borderRadius: "30px",
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  view more
                </Button>
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
       
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Button
          variant="text"
          sx={{ mt: 2, color: "red", fontWeight: "bold", float: "right" }}
          endIcon={<ArrowForward />}
        >
          See all Properties
        </Button>
      </Box>
    </Box>
  );
};

export default AllPropertiesCards;
