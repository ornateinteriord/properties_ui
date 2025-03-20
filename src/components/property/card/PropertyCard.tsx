import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFormatPrice from "../../../hook/formatedprice/FormattedPrice";

interface PropertyCardProps {
  property: any;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || [];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <Card
      sx={{
        width: { xs: "100%", md: "95%" },
        display: "flex",
        flexDirection: "column",
        height: "400px",
        mb: 2,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        "& .MuiCardMedia-root": {
          borderRadius: 1,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: 200, sm: 220 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
          }}
          src={images[currentImageIndex]}
          alt={`Property Image ${currentImageIndex + 1}`}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mt:"auto",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#303030",
              textDecoration: "underline",
              mb: 0.5,
            }}
          >
            {property.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.9rem", mt:"auto", }}>
            {property?.district ? `${property.district},` : ""}
          </Typography>
          <Typography
            sx={{
              mt:"auto",
              fontSize: "0.9rem",
              color: "#303030",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1, 
              overflow: "hidden",
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap", 
            }}
          >
            {
              property.description.length > 34
                ? `${property.description.slice(0, 34)}....` 
                : property.description 
            }
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "left",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {useFormatPrice(property.price)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "auto",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          component={Link}
          to={`/property/${property.property_id}`}
          state={{ property }}
          sx={{
            borderRadius: 5,
            textTransform: "none",
            color: "#150b83c1",
            borderColor: "#150b83c1",
            "&:hover": {
              borderColor: "#150b83c1",
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          View More
        </Button>
      </Box>
    </Card>
  );
};
