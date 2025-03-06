import { useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  SelectChangeEvent,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { PropertyCard } from "./card/PropertyCard";
import { PropertyFilter } from "./filter/PropertyFilter";
import { ApartmentData, landData, siteData, villaData } from "./data/PropertyData";
import { useLocation } from "react-router-dom";
import { Property } from "../../types";
import CreateProperty from "./card/CreateProperty";


const AllPropertyPages = () => {
const location = useLocation()
  const [tab, setTab] = useState(0);
  const [bhk, setBhk] = useState("all");
  const [price, setPrice] = useState("all");
  const [sqft, setSqft] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleBhkChange = (event: SelectChangeEvent) => {
    setBhk(event.target.value);
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value);
  };

  const handleSqftChange = (event: SelectChangeEvent) => {
    setSqft(event.target.value);
  };

  const filterProperties = (properties: any[]) => {
    return properties.filter((property) => {
      // Filter by BHK
      if (bhk !== "all" && property.bhk !== parseInt(bhk)) {
        return false;
      }

      // Filter by Square Feet
      if (sqft !== "all") {
        const [minSqft, maxSqft] = sqft.split("-").map(Number);
        if (maxSqft && property.sqft > maxSqft) return false;
        if (minSqft && property.sqft < minSqft) return false;
      }

      return true;
    });
  };

  const sortProperties = (properties: any[]) => {
    if (price === "low_to_high") {
      return properties.sort((a, b) => a.price - b.price);
    } else if (price === "high_to_low") {
      return properties.sort((a, b) => b.price - a.price);
    }
    return properties;
  };

  const getFilteredProperties = (): Property[] => {
    let properties:Property[] = [];
    if (location.pathname.includes("apartment-properties")) {
      properties = ApartmentData;
    } else if (location.pathname.includes("land-properties")) {
      properties = landData;
    } else if (location.pathname.includes("site-properties")) {
      properties = siteData;
    } else if (location.pathname.includes("villa-properties")) {
      properties = villaData;
    }

    const filteredProperties = filterProperties(properties);
    return sortProperties(filteredProperties);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{width:"100%", bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      <Container sx={{ width: "100%", padding: 0 }} maxWidth={false}>
        <Container
         maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", xl:"row" },
            gap: 3,
          }}
        >
          {/* Left Side - Navigation */}
          <Box sx={{width:{xs:"100%",md:"20%"}, display:"flex",flexDirection:"column",gap:3}}>
          <Box
            sx={{
              width:"100%",
              flexShrink: 0,
            }}
          >
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                orientation={isMobile ? "horizontal" : "vertical"}
                variant="fullWidth"
                sx={{
                  ".MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    py: 2,
                  },
                }}
              >
                <Tab
                  label={
                    <Box>
                      <Typography
                        variant="button"
                        sx={{ fontWeight: 600, display: "block" }}
                      >
                        Properties
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        56,010 listings
                      </Typography>
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box>
                      <Typography
                        variant="button"
                        sx={{ fontWeight: 600, display: "block" }}
                      >
                        Top Agents
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2,450 agents
                      </Typography>
                    </Box>
                  }
                />
              </Tabs>
            </Paper>
            </Box>
            <Box
              sx={{
                width: "100%",
                flexShrink: 0,
              }}
            >
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                  Filters
                </Typography>
                <PropertyFilter
                  bhk={bhk}
                  price={price}
                  sqft={sqft}
                  onBhkChange={handleBhkChange}
                  onPriceChange={handlePriceChange}
                  onSqftChange={handleSqftChange}
                />
              </Paper>
            </Box>

            <Box sx={{textAlign:"center"}}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Button   onClick={handleOpenDialog} sx={{backgroundColor:"#150b83c1",width:"200px",borderRadius:"30px",color:"#fff",textTransform:"none"}}>Create Property</Button>
            </Paper>
            </Box>
          </Box>
          <CreateProperty open={isDialogOpen} onClose={handleCloseDialog} />
          {/* Center - Content */}
          <Box sx={{ flex: 1,width:"90" }}>
            {tab === 0 && (
                <>
                 {location.pathname.includes("apartment-properties") && (
              <Box>
                {getFilteredProperties().map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </Box>
               )}
                {location.pathname.includes("land-properties") && (
              <Box>
                {getFilteredProperties().map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </Box>
               )}
                {location.pathname.includes("site-properties") && (
              <Box>
                {getFilteredProperties().map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </Box>
               )}
                {location.pathname.includes("villa-properties") && (
              <Box>
                {getFilteredProperties().map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </Box>
               )}
              </>
            )}

            {tab === 1 && (
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Top Agents Coming Soon
                </Typography>
              </Paper>
            )}
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default AllPropertyPages;
