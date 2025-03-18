import { Box } from "@mui/material";
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
          color: "#000",
        }}
      >
        No properties found
      </Box>
    );
  }

 
  const currentProperties = getCurrentData();

  return (
    <>
      <Box
        sx={{
          mt: 15,
          mb: 12,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ml: 2,
          mr: 2,
        }}
      >
        {currentProperties?.map((property: any, idx: any) => (
          <PropertyCard key={`${property.id}-${idx}`} property={property} />
        ))}
        {isLoading && <LoadingComponent />}
      </Box>
      <Box
  sx={{
    m: 2,
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "12px",
  }}
>
   <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          sx={{ marginTop: '20px' }} // Custom styles
          previousLabel="Prev" // Custom labels
          nextLabel="Next"
          />
</Box>
    </>
  );
};

export default MyProperty;
