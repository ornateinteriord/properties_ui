import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { getAllProperties } from "../../api/product";
import { Product } from "../../types";
import "./AllProperties.scss";
import { PropertyCard } from "../../components/property/card/PropertyCard";

const AllPropertiesCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 300; 
  const gap = 16;

  // Fetch properties data
  const { data: properties, isLoading } = getAllProperties();
  const navigate = useNavigate();

  // Filter properties with "active" status and "pramote" set to "active"
  const filteredProperties = React.useMemo(() => {
    return Array.isArray(properties)
      ? properties.filter(
          (property: Product) =>
            property.status === "active" && property.pramote === "active"
        )
      : [];
  }, [properties]);
  

  // Scroll to a specific index
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft } = container;
      const newIndex = Math.floor((scrollLeft + cardWidth / 2) / (cardWidth + gap));
      const virtualIndex = newIndex % filteredProperties.length;
      setActiveIndex(virtualIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProperties]);

  const renderNavigationDots = () => {
    const dots = [];
    const totalDots = 4; 
    
    for (let i = 0; i < totalDots; i++) {
      const isActive = activeIndex % totalDots === i;
      
      dots.push(
        <Box
          key={i}
          onClick={() => {
            const targetIndex = Math.floor(activeIndex / totalDots) * totalDots + i;
            scrollToIndex(targetIndex);
          }}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isActive ? "#150b83c1" : "#ccc",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#150b83c1",
            },
            margin: "0 4px",
          }}
        />
      );
    }
    
    return dots;
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Show a message if no properties are available
  if (filteredProperties.length === 0) {
    return (
      <Typography m={4} p={2} textAlign="center">
        Properties are coming soon
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ml:{xs:1,sm:0}, mb:{xs:0,sm:2}, fontWeight: "bold",textAlign:"center",width:{xs:"360px",sm:"700px",md:"100%",} }}>
         Comfortable Properties
      </Typography>

      {/* Card Carousel */}
      <Box  className="allproperty-card-container" >
        <Box
        className="allproperty-card-content"
          ref={scrollRef}
        >
          {filteredProperties.map((property: Product, idx: number) => (
            <Box
            key={`${property.property_id}-${idx}`}
            className="property-card"
            sx={{
              flex: "0 0 auto", // Ensure cards don't shrink
              width:"25%", // Responsive card width
            }}
          >
            <PropertyCard  key={`${property.property_id}-${idx}`} property={property} isShowEdit={false} />
            </Box>
          ))}
        </Box>

        {/* Navigation Dots */}
        <Box 
        className="navigation-dots"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {renderNavigationDots()}
      </Box>
      </Box>

      {/* See All Properties Button */}
      <Box  sx={{width:{xs:"700px",sm:"700px",md:"100%",},display:"flex",justifyContent:{xs:"center",sm:"flex-end",md:"flex-end"}}}>
      <Button
        variant="text"
        sx={{ mt: 2, color: "red", fontWeight: "bold" }}
        endIcon={<ArrowForward />}
        onClick={() => navigate("/properties")}
      >
        See All Properties
      </Button>
      </Box>
    </Box>
  );
};

export default AllPropertiesCards;
