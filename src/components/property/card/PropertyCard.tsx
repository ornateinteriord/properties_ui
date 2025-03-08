import { Heart, Share2, MoreVertical } from "lucide-react";

import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";


interface PropertyCardProps {
  property: any;
}

export const PropertyCard : React.FC<PropertyCardProps> = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          }}
          image={property.image}
          alt={property.title}
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
          <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
            {property.location}
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
              {property.sqft} sqft
            </Typography>
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              {property.status === "READY_TO_MOVE"
                ? "Status"
                : "UNDER CONSTRUCTION"}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {property.possession}
            </Typography>
          </Box>
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
          <Box>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.75rem", mb: 0.5 }}
            >
              BHK
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>{property.bhk}</Typography>
          </Box>
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
          We have crafted a one of a kind universe of 52 acres in Devanahalli.
          It's a place where we have built Life We have crafted a one of a kind
          universe of 52 acres in Devanahalli. It's a place where we have built
          Life
        </Typography>
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
            display: "flex",
            gap: 1,
            mb: 2,
            justifyContent: { xs: "flex-end", md: "flex-end" },
          }}
        >
          <IconButton size="small">
            <Heart size={20} />
          </IconButton>
          <IconButton size="small">
            <Share2 size={20} />
          </IconButton>
          <IconButton size="small">
            <MoreVertical size={20} />
          </IconButton>
        </Box>

        <Box
          sx={{
            textAlign: { xs: "left", md: "right" },
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            ₹{(property.price / 10000000).toFixed(2)} Cr
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
            Get Phone No.
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 5,
              textTransform: "none",
              backgroundColor: "#150b83c1",
              "&:hover": {
                backgroundColor: "#150b83c1",
              },
            }}
          >
            Contact Agent
          </Button>
          <Link
            href="#"
            underline="always"
            sx={{
              color: "#2196f3",
              fontSize: "0.9rem",
              textAlign: "center",
              mt: 1,
            }}
          >
            Check Loan Eligibility
          </Link>
        </Box>

        <Box
          sx={{
            mt: "auto",
            textAlign: { xs: "left", md: "right" },
            pt: { xs: 2, md: 0 },
          }}
        >
          <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
            Agent: Premier
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            4500+ Buyers Served
          </Typography>
        </Box>
      </Box>
     
    </Card>
  );
};
