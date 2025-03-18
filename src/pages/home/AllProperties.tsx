import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useRef, useEffect, useState } from "react";
import "./AllProperties.scss";
import { getAllProperties } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types";

const AllPropertiesCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 300;
  const gap = 16;

  const { data: properties, isLoading } = getAllProperties();
  const navigate = useNavigate();

  // Filter properties with "active" status and "pramote" set to "active"
  const filteredProperties = properties?.filter(
    (property: Product) => property.status === "active" && property.pramote === "active"
  ) || [];

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
      setActiveIndex(Math.min(newIndex, filteredProperties.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateActiveIndexOnScroll);
    }
    return () => container?.removeEventListener("scroll", updateActiveIndexOnScroll);
  }, [filteredProperties]); // Depend on filtered properties

  if (isLoading) {
    return <CircularProgress />;
  }

  if (filteredProperties.length === 0) {
    return <Typography m={4} p={2}>Properties coming soon</Typography>;
  }

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
          sx={{ mb: 2, fontWeight: "bold", fontSize: { xs: "25px" } }}
        >
          Modern Living, Elevated Comfortable Properties
        </Typography>
      </Box>

      <Box
        className="property-card-box"
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: "800px", md: "1000px", xl: "1200px" },
          margin: "0 auto",
        }}
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
          className="allproperty-card"
        >
          {filteredProperties.map((property: Product , idx : number) => (
            <Card
              className="card"
              key={`${property.property_id}-${idx}`}
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
                image={property.images[0]}
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
                  {property.price}
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
                  View More
                </Button>
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
          {filteredProperties.map((_x: Product, index: number) => (
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
          onClick={() => navigate("/properties")}
        >
          See All Properties
        </Button>
      </Box>
    </Box>
  );
};

export default AllPropertiesCards;
