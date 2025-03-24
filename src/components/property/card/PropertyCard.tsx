import { Card, CardMedia, Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import useFormatPrice from "../../../hook/formatedprice/FormattedPrice";
import TokenService from "../../../api/token/TokenService";
import PropertyForm from "./PropertyForm";
import { Edit, MapPin, MoreVertical, Share2 } from "lucide-react";
import { toast } from "react-toastify";

interface PropertyCardProps {
  property: any;
  isShowEdit: boolean;
  isAnimate?: boolean;
  showMenu?:boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isAnimate,
  showMenu,
}) => {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);
  const [isCopied, setIsCopied] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const images = property.images || [];
  const userId = TokenService.getuserId();
  const handleDialogClose = useCallback(() => {
    setIsEdit(false);
  }, []);
 

  const shareableLink = `${window.location.origin}/property/${property.property_id}`;
  
  const handleShareClick = async () => {
    if (navigator.share ) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: shareableLink, 
        });
      
      } catch (error) {
        console.error("Error sharing:", error);
      }finally{
        setAnchorEl(null);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareableLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  useEffect(() => {
    if (images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [images?.length]);

  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigateToPropertyMap = (lat: number, lng: number) => {
      // Check if lat and lng are valid numbers
      if (isNaN(lat) || isNaN(lng)) {
        toast.info('Location not available for this property');
        return; // Exit the function if location is invalid
      }
      const url = `/properties-map?lat=${lat}&lng=${lng}`;
      navigate(url);
      setAnchorEl(null);
    };

    const handlePropertyClick = (propertyId:any) => {
      navigate(`/property/${propertyId}`);
    };

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
      {showMenu &&(
      <Box sx={{textAlign:"end"}}>
          <MoreVertical
            size={20} 
            color="#303030"
            style={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
          />
          <Menu
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleMenuClose} 
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Menu Item 1: View Map */}
        <MenuItem onClick={() => navigateToPropertyMap(property.location.coordinates[1], property.location.coordinates[0])}>
          <MapPin size={16} style={{ marginRight: "8px" }} /> 
          <Typography variant="body2">View Map</Typography>
        </MenuItem>

        {/* Menu Item 2: Edit */}
       {userId === property.userid &&(
        <MenuItem onClick={() => (setIsEdit(true), setAnchorEl(null))}  >
          <Edit size={16} style={{ marginRight: "8px" }} /> 
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        )}
        {/* Menu Item 3: Share */}
        <MenuItem onClick={handleShareClick} >
          <Share2 size={16} style={{ marginRight: "8px" }} /> 
          <Typography variant="body2">{isCopied ? "Link Copied!" : "Share"}</Typography>
        </MenuItem>
      </Menu>
      </Box>
      )}
      <Box
        sx={{
          width: "100%",
          height: { xs: "50vh", sm: "60vh", md: "70vh" },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",

            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
          }}
          src={isAnimate ? images[currentImageIndex] : images[0]}
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
              mt: "auto",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#303030",
              textDecoration: "underline",
              mb: 0.5,
            }}
          >
            {property.title}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "0.9rem", mt: "auto" }}
          >
            {property?.property_type},{" "}
            {property?.district ? `${property.district}.` : ""}
          </Typography>
          <Typography
            sx={{
              mt: "auto",
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
            {property.description?.length > 34
              ? `${property.description.slice(0, 34)}....`
              : property.description}
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
          flexDirection: { xs: "column", md: "column", sm: "row" }, // Column on small screens, row on larger screens
          justifyContent: "flex-end",
          gap: 2,
          mt: "auto",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handlePropertyClick(property.property_id)}
          sx={{
            borderRadius: 5,
            textTransform: "none",
            color: "#150b83c1",
            borderColor: "#150b83c1",
            "&:hover": {
              borderColor: "#150b83c1",
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
            width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto width on larger screens
          }}
        >
          View More
        </Button>
      </Box>
      {isEdit && (
        <PropertyForm
          property={property}
          open={isEdit}
          onClose={handleDialogClose}
          mode="update"
        />
      )}
    </Card>
  );
};
