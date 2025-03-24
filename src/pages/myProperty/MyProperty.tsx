import { Box, Typography } from "@mui/material";
import { PropertyCard } from "../../components/property/card/PropertyCard";
import { getUserProperties } from "../../api/product";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../App";
import usePagination from "../../hook/pagination/Pagination";
import { CustomPagination } from "../../hook/pagination/CustomPagination";

const MyProperty = () => {
  const { data: properties, isError, error, isLoading } = getUserProperties();

  useEffect(() => {
    if (isError) {
      const err = error as any;
      toast.error(err?.response?.data?.message);
    }
  }, [isError, error]);

  const itemsPerPage = 10;
  const { currentPage, totalPages, getCurrentData, handlePageChange } =
    usePagination(properties || [], itemsPerPage);

  if (!properties || properties.length === 0) {
    return (
      <Box
        sx={{
          mt: 15,
          mb: 12,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
        }}
      >
        <Typography variant="h6" fontWeight={500} color="textSecondary">
          No properties found
        </Typography>
      </Box>
    );
  }

  const currentProperties = getCurrentData();

  return (
    <>
      <Box
        sx={{
          mt: 12,
          textAlign: "center",
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" fontWeight={600} color="primary">
          Your Properties
        </Typography>
      </Box>
      
      <Box
        sx={{
          display: "grid",
          mt: 3,
          minHeight: "100vh",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
          p: 2,
        }}
      >
        {currentProperties?.map((property: any, idx: any) => (
          <PropertyCard key={`${property.id}-${idx}`} property={property} isShowEdit  showMenu={true} />
        ))}
        {isLoading && <LoadingComponent />}
      </Box>
      
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          previousLabel="Prev"
          nextLabel="Next"
        />
      </Box>
    </>
  );
};

export default MyProperty;
