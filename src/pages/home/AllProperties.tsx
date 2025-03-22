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
  const cardWidth = 300; // Width of each card
  const gap = 16; // Gap between cards

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

  // Handle scroll events to update the active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft } = container;
      const newIndex = Math.floor((scrollLeft + cardWidth / 2) / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, filteredProperties.length - 1));
    };

    container.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
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
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Modern Living, Elevated Comfortable Properties
      </Typography>

      {/* Card Carousel */}
      <Box sx={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {filteredProperties.map((property: Product, idx: number) => (
            <PropertyCard key={`${property.property_id}-${idx}`} property={property} isShowEdit={false} />
          ))}
        </Box>

        {/* Navigation Dots */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          {filteredProperties.map((_ : any, index : number) => (
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

      {/* See All Properties Button */}
      <Button
        variant="text"
        sx={{ mt: 2, color: "red", fontWeight: "bold" }}
        endIcon={<ArrowForward />}
        onClick={() => navigate("/properties")}
      >
        See All Properties
      </Button>
    </Box>
  );
};

export default AllPropertiesCards;
