import { useEffect, useState } from "react";
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
import CreateProperty from "./card/CreateProperty";
import { toast } from "react-toastify";

import { getAllProperties,} from "../../api/product";
import { LoadingComponent } from "../../App";


const AllPropertyPages = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedType, setSelectedType] = useState<string>("all");
const [selectedSubtype, setSelectedSubtype] = useState<string>("all");
const [selectedBudget, setSelectedBudget] = useState<string>("all");
const [selectedSquareFeet, setSelectedSquareFeet] = useState<string>("all");
 const {data:properties,isError,error,isLoading } = getAllProperties();
 console.log(properties,"all")

 useEffect(() => {
  if (isError) {
    const err = error as any;
    toast.error(
      err?.response.data.message 
    );
  }
}, [isError, error]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
    setSelectedSubtype("all");
  };
  
  const handleSubtypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSubtype(event.target.value);
  };
  
  const handleBudgetChange = (event: SelectChangeEvent<string>) => {
    setSelectedBudget(event.target.value);
  };
  
  const handleSquareFeetChange = (event: SelectChangeEvent<string>) => {
    setSelectedSquareFeet(event.target.value);
  };


  const filteredProperties = Array.isArray(properties)? properties.filter((property:any) => {
    const matchesType = selectedType === "all" || property.type === selectedType;
    const matchesSubtype =
      selectedSubtype === "all" || property.subtype === selectedSubtype;

    // Logic to match budget
    const matchesBudget =
      selectedBudget === "all" ||
      (() => {
        const [minBudget, maxBudget] = selectedBudget
          .split(" - ")
          .map((s: string) => parseFloat(s.replace(/[^0-9.]/g, "")));
        const propertyBudget = parseFloat(property.budget.replace(/[^0-9.]/g, ""));
        return propertyBudget >= minBudget && propertyBudget <= maxBudget;
      })();

    // Logic to match square feet
    const matchesSquareFeet =
      selectedSquareFeet === "all" ||
      (() => {
        const [minSqFt, maxSqFt] = selectedSquareFeet
          .split("-")
          .map((s: string) => parseFloat(s));
        const propertySqFt = parseFloat(property.squareFeet);
        return (
          (minSqFt ? propertySqFt >= minSqFt : true) &&
          (maxSqFt ? propertySqFt <= maxSqFt : true)
        );
      })();

    return matchesType && matchesSubtype && matchesBudget && matchesSquareFeet;
  }) : []

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
                  selectedType={selectedType}
                  selectedSubtype={selectedSubtype}
                  selectedBudget={selectedBudget}
                  selectedSquareFeet={selectedSquareFeet}
                  handleTypeChange={handleTypeChange}
                  handleSubtypeChange={handleSubtypeChange}
                  handleBudgetChange={handleBudgetChange}
                  handleSquareFeetChange={handleSquareFeetChange}
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
              <Box>
                {filteredProperties?.map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </Box>
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
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default AllPropertyPages;
