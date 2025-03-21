import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFormatPrice from "../../../hook/formatedprice/FormattedPrice";

const PropertyCardView = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation()
  const { property } = location.state ||{}
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property?.images || [];


   useEffect(() => {
      if (images.length > 1) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
          );
        }, 2500); 
        return () => clearInterval(interval); 
      }
    }, [images.length]);

  return (
    <Box sx={{ pl:{xs:1,sm:3}, pr: {xs:1,sm:3}, minHeight: "100vh",display:"flex",justifyContent:"center",alignItems:"center" }}>
      <Card
        sx={{
         mt:{xs:10,sm:13,md:0,},
         mb:{xs:2,md:0},
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: isExpanded ? "auto" : "fit-content",
          p: { xs: 1, sm: 2 },
          borderRadius: 2,
          "& .MuiCardMedia-root": {
            borderRadius: 1,
          },
        }}
      >
        {/* Left Column - Image */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              mb: 2,
              height: { xs: 370, md: 450 },
              objectFit: "contain",
              opacity: 1, // Fade effect
              transition: "opacity 0.5s ease-in-out", // Smooth transition
            }}
              src={images[currentImageIndex]} // Use current image index
              alt={`Property Image ${currentImageIndex + 1}`}
          />
        </Box>

        {/* Middle Column - Content */}
        <Box
          sx={{
            ml: {xs:0,sm:0.5},
            width:{xs:"100%",md:"60%"},
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb:0.5,
              width: "100%",
              px: { xs: 1, md: 2 },
              pt: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#303030",
                  textDecoration: "underline",
                  mb: 0.5,
                }}
              >
                {property?.title}
              </Typography>
              <Typography
                sx={{
                  mb: 0.5,
                  fontSize: "0.9rem",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {property?.property_type}
                <Typography color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                  {property?.subtype}
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                Address
                {property?.address ? `${property.address},` : ""}  {property?.taluk ? `${property.taluk},` : ""}   {property?.district ? `${property.district},` : ""}   {property?.state ? `${property.state},` : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                },
                gap: 2,
                mb: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Super Area
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {`${property?.sqft} sqft`}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Property Status
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {property?.propertyStatus}
                </Typography>
                {property?.propertyStatus === "Under Construction" && (
              <Typography
                color="text.secondary"
                sx={{ fontSize: "0.65rem", mb: 0.5 }}
              >
                Completion by {property?.possession}
              </Typography>
            )}
              </Box>
              {property?.furnishing && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Furnishing
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {property?.furnishing}
                </Typography>
              </Box>
               )} 
              {property?.bathrooms && (
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Bathroom
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {property?.bathrooms}
                </Typography>
              </Box>
              )} 
              {property?.bhk && (
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  BHK
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {property?.bhk}
                </Typography>
              </Box>
               )}
              {property?.parking && (
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Parking
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {property?.parking}
                </Typography>
              </Box>
               )} 
            </Box>
            <Box>
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
                {property?.description && (isExpanded ? property.description : `${property.description.slice(0, 100)}`)}
              </Typography>

              {property?.description && property?.description.length > 100 && (
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
          </Box>

          {/* Right Column - Price and Buttons */}
          <Box
            sx={{
              px: { xs: 1, md: 2 },
              p: 1,
              width:"100%",
              display: "flex",
              flexDirection:"row",
              mt: "auto",
            }}
          >
            <Box
              sx={{
                width: "70%",
                textAlign: "start",
                mb: 2,
              }}
            >
                 <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 0.5 }}
                >
                  Price
                </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                {useFormatPrice(property?.price)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.9rem" }}
              >
                ₹{property?.pricePerSqft}
                1234 per sqft
              </Typography>
            </Box>
            <Box
          sx={{
            display:"flex",
            justifyContent:{xs:"flex-end"},
            alignItems:"center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            // component={Link}
            // to="/property"
            sx={{
             width:{xs:"60%",sm:"70%"},
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
        </Box>
      </Card>
    </Box>
  );
};

export default PropertyCardView;
