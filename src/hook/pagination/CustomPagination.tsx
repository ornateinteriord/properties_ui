import { Pagination, PaginationItem } from "@mui/material";

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
    sx?: any ; // Optional custom styles
    previousLabel?: string; // Optional custom label for the "Previous" button
    nextLabel?: string; // Optional custom label for the "Next" button
  }

export const CustomPagination: React.FC<CustomPaginationProps> = ({ totalPages, currentPage, handlePageChange, sx, previousLabel, nextLabel }) => {
    return (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_event, page) => handlePageChange(page)}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              borderRadius: "4px",
              border: "1px solid #ccc",
              margin: "0 4px",
              minWidth: "32px",
              height: "32px",
              "&.Mui-selected": {
                backgroundColor: "#150b83c1",
                color: "#fff",
                borderColor: "#150b83c1",
                "&:hover": {
                  backgroundColor: "#150b83c1",
                },
              },
              "&:hover": {
                backgroundColor: "#4136bcc1",
                color:"#fff",
              },
              ...sx, // Merge custom styles
            }}
            components={{
              previous: () => previousLabel || "Prev",
              next: () => nextLabel || "Next",
            }}
          />
        )}
      />
    );
  };