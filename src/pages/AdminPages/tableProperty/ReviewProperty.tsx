import { Button, Card, CardContent, CircularProgress, Menu, MenuItem, Typography, Box, Grid, Dialog, DialogContent, IconButton, DialogActions } from "@mui/material";
import DataTable from 'react-data-table-component';
import { getAllProperties, useDeleteProperty } from "../../../api/product";
import { Product } from "../../../types";
import { ActionPropertyMenuItems, DASHBOARD_CUTSOM_STYLE, getFormattedName, getRelativeTime } from "../../../utils/constant";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateProperty } from '../../../api/product/index';
import { useUpdateUser } from "../../../api/user";
import DeleteConfirmationDialog from "../../../components/ui/DeletePopup";
import PropertyForm from "../../../components/property/card/PropertyForm";
import { ArrowBack, ArrowForward } from "@mui/icons-material";


const ReviewProperty = () => {
  const { data: products, isLoading } = getAllProperties();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Product | null>(null);

  const handleDialogToggle = useCallback((property: Product | null = null) => {
    setSelectedProperty(property);
    setIsDialogOpen((prev) => !prev);
  }, []);


  const columns = [
    {
      name: 'User ID',
      cell: (row: Product) => row.userid,
      sortable: true,
    },
    {
      name: 'Title',
      cell: (row: Product) => row.title,
      sortable: true,
    },
    {
      name: 'Created At',
      cell: (row: Product) => getRelativeTime(row.createdAt),
      sortable: true,
    },
    {
      name: 'Updated At',
      cell: (row: Product) => getRelativeTime(row.updatedAt),
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row: Product) => (
        <Typography variant="body2" sx={{ color: row.status === "active" ? "success.main" : "warning.main" }}>
          {getFormattedName(row.status)}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: 'Promote',
      cell: (row: Product) => (
        <Typography variant="body2" sx={{ color: row.pramote === "active" ? "success.main" : "warning.main" }}>
          {getFormattedName(row.pramote)}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: 'Images',
      cell: (row: Product) => (
       <ViewImagesComponent images={row.images} />
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: Product) => (
        <ActionMenuComponent 
          row={row} 
          ActionMenuItems={ActionPropertyMenuItems} 
          onEditClick={() => handleDialogToggle(row)}
        />
      ),
      center: true,
    },
  ];

  return (
    <Box sx={{ mt: 8, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ mb: 4,mt:4 }}>
        Properties
      </Typography>
      <Card sx={{ width: "100%", maxWidth: "1200px", overflowX: "auto" }}>
      <Grid container justifyContent="flex-end" sx={{pr :2}}>
      <Button variant="outlined" onClick={()=>setIsDialogOpen(true)}>Add Property</Button>
      </Grid>
        <CardContent>
          <DataTable
            columns={columns}
            data={products}
            progressComponent={<CircularProgress />}
            progressPending={isLoading}
            customStyles={DASHBOARD_CUTSOM_STYLE}
            pagination
            highlightOnHover
            responsive 
          />
        </CardContent>
      </Card>
      <PropertyForm 
        open={isDialogOpen} 
        onClose={() => handleDialogToggle(null)} 
        property={selectedProperty}
        mode={selectedProperty ? "update" : "post"} 
      />
    </Box>
  );
};0

export default ReviewProperty;

export const ViewImagesComponent = ({ images }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);  // To control dialog visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // To track current image in the dialog

  // Open and close the dialog
  const handleDialogToggle = () => setDialogOpen(!dialogOpen);

  // Go to next image
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Go to previous image
  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <>
      {/* "View" button */}
      <Button variant="outlined" onClick={handleDialogToggle}>
        View
      </Button>

      {/* Dialog to show images */}
      <Dialog open={dialogOpen} onClose={handleDialogToggle} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: 1, sm: 2, md: 3 }, }}>
        {images && images.length > 0 ? ( 
          <Box sx={{ position: 'relative',width: '100%', textAlign: 'center'  }}>
            {/* Display current image */}
            <img
              src={images[currentImageIndex]}
              alt={`property-image-${currentImageIndex}`}
              style={{  maxHeight: '70vh', // Use viewport height for scaling
                width: 'auto',
                maxWidth: '100%', // Ensure image doesn't overflow
                borderRadius: '8px', }}
            />

            {/* Navigation buttons */}
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                top: '50%',
                left: "2px",
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
              }}
              disabled={currentImageIndex === 0}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: "2px",
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
              }}
              disabled={currentImageIndex === images.length - 1}
            >
              <ArrowForward />
            </IconButton>
          </Box>
            ) : (
              <Typography>No images available</Typography> // Fallback if images is empty or undefined
            )}
        </DialogContent>
        <DialogActions sx={{ padding: { xs: 1, sm: 2 } }}>
          <Button onClick={handleDialogToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ActionMenuComponent = ({ row, ActionMenuItems ,onEditClick  }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const updateProperty = useUpdateProperty(row._id);
  const deleteProperty = useDeleteProperty(row._id);
  const updateUser = useUpdateUser(row?.username);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Open the delete confirmation dialog
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  // Close the delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Handle the delete action
  const handleDeleteProperty = () => {
    deleteProperty.mutate();
    setIsDeleteDialogOpen(false); // Close the dialog after deletion
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdatePropertyActions = (action: any) => {
    if (action.payload === "edit") {
      onEditClick(row)
    } else if (action.payload === "delete") {
      handleOpenDeleteDialog(); // Open the delete confirmation dialog
    } else if (action.payload === "role") {
      if (row?.role === "admin") {
        updateUser.mutate({ role: "user" });
      } else {
        updateUser.mutate({ role: "admin" });
      }
    } else {
      updateProperty.mutate({ [action.payload]: action.value });
    }
    handleClose();
  };

  const filteredActions = ActionMenuItems.filter((action: any) => {
    if (action.payload === 'status') {
      // Show "De-Active" if status is 'active', otherwise show "Active"
      return row.status === 'active' ? action.label === 'De-Active' : action.label === 'Active';
    } else if (action.payload === 'pramote') {
      // Show "De-Promote" if pramote is 'active', otherwise show "Promote"
      if(row.status === 'pending') return false; // Don't show promote/de-promote if status is pending
      return row.pramote === 'active' ? action.label === 'De-Promote' : action.label === 'Promote';
    }
    // Always show other actions (Edit, Delete)
    return true;
  });

  return (
    <>
      <Button
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={
          <ChevronDown
            style={{
              transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        }
        variant="outlined"
        sx={{
          width: "auto",
          fontFamily: "Bogle-Regular",
          color: "#000",
          whiteSpace: "nowrap",
          textTransform: "none",
          borderColor: "#150b83c1",
        }}
      >
        Action
      </Button>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: { xs: 110 },
          },
        }}
      >
        {filteredActions.map((action: any) => (
          <MenuItem key={action.label} onClick={() => handleUpdatePropertyActions(action)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProperty}
      />
    </>
  );
};