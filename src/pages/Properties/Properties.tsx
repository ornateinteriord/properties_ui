import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { PropertyCard } from "../../components/property/card/PropertyCard";
import { PropertyFilter } from "../../components/property/filter/PropertyFilter";
import { toast } from "react-toastify";
import { getAllProperties } from "../../api/product";
import { LoadingComponent } from "../../App";
import useAuth from "../../hook/UseAuth";
import { useNavigate } from "react-router-dom";
import { BUDGET_RANGES, SQUARE_FEET_RANGES } from "../../utils/constant";
import usePagination from "../../hook/pagination/Pagination";
import { CustomPagination } from "../../hook/pagination/CustomPagination";
import PropertyForm from "../../components/property/card/PropertyForm";

const Properties = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: properties, isError, error, isLoading } = getAllProperties();

  const [filters, setFilters] = useState({
    type: "all",
    subtype: "all",
    budget: "all",
    squareFeet: "all",
    sortOrder: "default",
    districtSearchTerm: "",
    talukSearchTerm: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 1️⃣ Add this function inside the `Properties` component:
  const handleClearFilters = useCallback(() => {
    setFilters({
      type: "all",
      subtype: "all",
      budget: "all",
      squareFeet: "all",
      sortOrder: "default",
      districtSearchTerm: "",
      talukSearchTerm: "",
    });
  }, []);

  useEffect(() => {
    if (isError) {
      const err = error as any;
      toast.error(
        err?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  }, [isError, error]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (name: keyof typeof filters, value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handle tab change
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  // Handle dialog open/close
  const handleDialogToggle = useCallback(() => {
    setIsDialogOpen((prev) => !prev);
  }, []);

  const handleButtonClick = useCallback(() => {
    isLoggedIn ? handleDialogToggle() : navigate("/signin");
  }, [isLoggedIn, navigate, handleDialogToggle]);

  // Filtering function
  const matchesFilter = useCallback(
    (property: any) => {
      const matchesType =
        filters.type === "all" || property.property_type === filters.type;

      const matchesSubtype =
        filters.subtype === "all" ||
        property.subtype === filters.subtype ||
        property.bhk === filters.subtype;

      const matchesBudget = (() => {
        if (filters.budget === "all") return true;

        const [min, max] = BUDGET_RANGES[filters.budget] || [0, Infinity];

        const propertyPrice = Number(property.price); // Convert price to number
        return propertyPrice >= min && propertyPrice <= max;
      })();

      // Handling Square Feet Filter
      const matchesSquareFeet = (() => {
        if (filters.squareFeet === "all") return true;

        let propertySqFt = property.sqft;

        if (propertySqFt === undefined || propertySqFt === null) {
          console.warn("Missing sqft for property:", property);
          propertySqFt = 0; // Default to 0
        }

        propertySqFt = Number(propertySqFt);

        if (isNaN(propertySqFt) || propertySqFt < 0) {
          console.warn("Invalid sqft value:", property);
          return false; // Skip invalid values
        }

        const [minSqFt, maxSqFt] = SQUARE_FEET_RANGES[filters.squareFeet] || [
          0,
          Infinity,
        ];

        return propertySqFt >= minSqFt && propertySqFt <= maxSqFt;
      })();

      // District and Taluk Filtering
      const matchesDistrict =
        filters.districtSearchTerm === "" ||
        property.district
          ?.toLowerCase()
          .includes(filters.districtSearchTerm.toLowerCase());

      const matchesTaluk =
        filters.talukSearchTerm === "" ||
        property.taluk
          ?.toLowerCase()
          .includes(filters.talukSearchTerm.toLowerCase());

      const matchesStatus = property.status === "active";

      return (
        matchesType &&
        matchesSubtype &&
        matchesBudget &&
        matchesSquareFeet &&
        matchesDistrict &&
        matchesTaluk &&
        matchesStatus
      );
    },
    [filters]
  );

  const sortedAndFilteredProperties = useMemo(() => {
    let result = Array.isArray(properties)
      ? properties.filter(matchesFilter)
      : [];

    if (filters.sortOrder === "lowToHigh") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sortOrder === "highToLow") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [properties, matchesFilter, filters.sortOrder]);

  const itemsPerPage = 9;
  const { currentPage, totalPages, getCurrentData, handlePageChange } =
    usePagination(sortedAndFilteredProperties || [], itemsPerPage);
  const currentProperties = getCurrentData();
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        py: 3,
        mt:{xs:"60px",md:"80px"},
      }}
    >
      <Container sx={{ width: "100%", padding: 0 }} maxWidth={false}>
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", xl: "row", md: "row" },
            gap: 3,
          }}
        >
          {/* Left Sidebar - Navigation & Filters */}
          <Box
            sx={{
              width: { xs: "100%", md: "20%" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* post Property Button */}
            <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
              <Button
                onClick={handleButtonClick}
                sx={{
                  backgroundColor: "#150b83c1",
                  width: { lg: "200px", md: "150px", sm: "200px", xs: "150px" },
                  borderRadius: "30px",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Post Property
              </Button>
            </Paper>

            {/* Tabs */}
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
                        {!isLoading && sortedAndFilteredProperties.length}
                      </Typography>
                    </Box>
                  }
                />
              </Tabs>
            </Paper>

            {/* Filters */}
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                Filters
              </Typography>
              <PropertyFilter
                selectedType={filters.type}
                selectedSubtype={filters.subtype}
                selectedBudget={filters.budget}
                districtSearchTerm={filters.districtSearchTerm}
                talukSearchTerm={filters.talukSearchTerm}
                selectedSquareFeet={filters.squareFeet}
                selectedSortOrder={filters.sortOrder}
                handleTypeChange={(e: SelectChangeEvent<string>) =>
                  handleFilterChange("type", e.target.value)
                }
                handleSubtypeChange={(e: SelectChangeEvent<string>) =>
                  handleFilterChange("subtype", e.target.value)
                }
                handleBudgetChange={(e: SelectChangeEvent<string>) =>
                  handleFilterChange("budget", e.target.value)
                }
                handleSquareFeetChange={(e: SelectChangeEvent<string>) =>
                  handleFilterChange("squareFeet", e.target.value)
                }
                handleSortOrderChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                handleDistrictChange={(value: string) =>
                  handleFilterChange("districtSearchTerm", value)
                }
                handleTalukChange={(value: string) =>
                  handleFilterChange("talukSearchTerm", value)
                }
                handleClearFilters={handleClearFilters}
              />
            </Paper>
          </Box>

          <PropertyForm
            open={isDialogOpen}
            onClose={handleDialogToggle}
            mode="post"
          />

          {/* Content Area */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              }, 
              gap: 1,
              
            }}
          >
            {tab === 0 &&
              (currentProperties?.length > 0 ? (
                currentProperties?.map((property: any) => (
                  <PropertyCard key={property.id} property={property} isShowEdit={false} />
                ))
              ) : (
                <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    No properties found matching your criteria. Try adjusting
                    the filters.
                  </Typography>
                </Paper>
              ))}
          </Box>
        </Container>
        <Box sx={{ m: 2, display: "flex", justifyContent: "flex-end" }}>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            sx={{ marginTop: "20px" }} // Custom styles
            previousLabel="Prev" // Custom labels
            nextLabel="Next"
          />
        </Box>
      </Container>
      {isLoading && <LoadingComponent />}
    </Box>
  );
};

export default Properties;
