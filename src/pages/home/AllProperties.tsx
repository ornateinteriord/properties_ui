import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { getAllProperties } from "../../api/product";
import { Product } from "../../types";
import "./AllProperties.scss";
import { PropertyCard } from "../../components/property/card/PropertyCard";

const AllPropertiesCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
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

  // Scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Show/hide arrows based on scroll position
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    };

    container.addEventListener("scroll", handleScroll);
    
    // Initial check for arrows
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProperties]);

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
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" , userSelect : 'none'}}>
      <Typography variant="h4" sx={{ml:{xs:1,sm:0}, mb:{xs:0,sm:2}, fontWeight: "bold",textAlign:"center",width:{xs:"360px",sm:"700px",md:"100%",} }}>
         Comfortable Properties
      </Typography>

      {/* Card Carousel */}
      <Box className="allproperty-card-container">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: { xs: 0, sm: -40 },
              top: "50%",
              display : 'flex',
              justifyContent : 'center',
              alignItems : 'center',
              backgroundColor: "#A5A0CF",
              boxShadow: 1,
              zIndex: 1,
              "&:hover": {
                backgroundColor: "#A5A0CF",
              },
            }}
          >
            <ArrowBack sx={{color : '#000'}}/>
          </IconButton>
        )}

        <Box
          className="allproperty-card-content"
          ref={scrollRef}
        >
          {filteredProperties.map((property: Product, idx: number) => (
            <Box
              key={`${property.property_id}-${idx}`}
              className="property-card"
              sx={{
                flex: "0 0 auto",
                width: "25%",
              }}
            >
              <PropertyCard property={property} isShowEdit={false} />
            </Box>
          ))}
        </Box>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: { xs: 0, sm: -40 },
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#A5A0CF",
              boxShadow: 1,
              zIndex: 1,
              "&:hover": {
                backgroundColor: "#A5A0CF",
              },
            }}
          >
            <ArrowForward sx={{color : '#000'}} />
          </IconButton>
        )}
      </Box>

      {/* See All Properties Button */}
      <Box sx={{width:{xs:"700px",sm:"700px",md:"100%",},display:"flex",justifyContent:{xs:"center",sm:"flex-end",md:"flex-end"}}}>
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