
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

interface PropertyCardProps {
  property: any;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`; // Convert to Crore
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`; // Convert to Lakh
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(2)} K`; // Convert to Thousand
    }
    return `₹${price}`; // If less than 1000, show the exact price
  };

  useEffect(() => {
    if (property.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % property.images.length
        ); // Update image index
      }, 2500); // Change image every 2.5 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [property.images.length]);

  return (
    <Card
      sx={{
        width: { xs: "100%", md: "95%" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mb: 2,
        p: { xs: 1.5, sm: 2 },
        height: isExpanded ? "auto" : "fit-content",
        borderRadius: 2,
        "& .MuiCardMedia-root": {
          borderRadius: 1,
        },
      }}
    >
      {/* Left Column - Image */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: { xs: 200, sm: 220 },
            objectFit: "cover",
            opacity: 1, // Fade effect
            transition: "opacity 0.5s ease-in-out", // Smooth transition
          }}
          src={property.images[currentImageIndex]} // Use current image index
          alt={`Property Image ${currentImageIndex + 1}`}
        />
      </Box>

      {/* Middle Column - Content */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          px: { xs: 0, md: 3 },
          pt: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#303030",
              textDecoration: "underline",
              mb: 0.5,
            }}
          >
            {property.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.9rem", display:"flex",gap:"10px" ,alignItems:"center"}}>
          {property.property_type} <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem",  }}
            >{property.subtype}</Typography> 
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
          {property?.address ? `${property.address},` : ""}  {property?.taluk ? `${property.taluk},` : ""}   {property?.district ? `${property.district},` : ""}   {property?.state ? `${property.state},` : ""}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              Super Area
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
            {`${property.sqft} sqft`}

            </Typography>
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              Property Status
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {property.propertyStatus}
            </Typography>
            {property.propertyStatus === "Under Construction" && (
              <Typography
                color="text.secondary"
                sx={{ fontSize: "0.65rem", mb: 0.5 }}
              >
                Completion by {property.possession}
              </Typography>
            )}
          </Box>
          {property.furnishing && (
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              Furnishing
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {property.furnishing}
            </Typography>
          </Box>
          )}
           {property.bathrooms && (
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              Bathroom
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {property.bathrooms}
            </Typography>
          </Box>
           )}
            {property.bhk && (
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              BHK
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>{property.bhk}</Typography>
          </Box>
            )}
             {property.parking && (
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              Parking
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {property.parking}
            </Typography>
          </Box>
             )}
        </Box>



        <Typography
    sx={{
      fontSize: "0.9rem",
      color: "#303030",
      display: "-webkit-box",
      WebkitLineClamp: isExpanded ? "unset" : 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {property.description && (isExpanded ? property.description : `${property.description.slice(0, 100)}`)}
  </Typography>

             {property.description && property.description.length > 100 && (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  fontSize: "0.8rem",
                  color: "#2196f3",
                  textTransform: "none",
                  p: 0,
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {isExpanded ? "Show Less" : "...more"}
              </Button>
              )}
           
      </Box>

      {/* Right Column - Price and Buttons */}
      <Box
        sx={{
          width: { xs: "100%", md: "25%" },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "stretch", md: "flex-end" },
          mt: { xs: 2, md: 0 },
        }}
      >

        <Box
          sx={{
            textAlign: { xs: "left", md: "right" },
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {formatPrice(property.price)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            ₹{property.pricePerSqft} per sqft
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
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
            Contact
          </Button>
         
        </Box>

      </Box>
    </Card>
  );
};
