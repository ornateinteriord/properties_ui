import { Button, Card, CardContent, CircularProgress, Menu, MenuItem, Typography, Box, Grid } from "@mui/material";
import DataTable from 'react-data-table-component';
import { getAllProperties, useDeleteProperty } from "../../../api/product";
import { Product } from "../../../types";
import { ActionPropertyMenuItems, DASHBOARD_CUTSOM_STYLE, getFormattedName, getRelativeTime } from "../../../utils/constant";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateProperty } from '../../../api/product/index';
import UpdateProperty from "../../../components/property/card/UpdateProperty";
import { useUpdateUser } from "../../../api/user";
import DeleteConfirmationDialog from "../../../components/ui/DeletePopup";
import CreateProperty from "../../../components/property/card/CreateProperty";


const ReviewProperty = () => {
  const { data: products, isLoading } = getAllProperties();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogToggle = useCallback(() => {
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
      name: 'Action',
      cell: (row: Product) => <ActionMenuComponent row={row} ActionMenuItems={ActionPropertyMenuItems} />,
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
      <CreateProperty open={isDialogOpen} onClose={handleDialogToggle} />
    </Box>
  );
};0

export default ReviewProperty;

export const ActionMenuComponent = ({ row, ActionMenuItems }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const updateProperty = useUpdateProperty(row._id);
  const deleteProperty = useDeleteProperty(row._id);
  const updateUser = useUpdateUser(row?.username);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleDialogToggle = useCallback(() => {
    setIsDialogOpen((prev) => !prev);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdatePropertyActions = (action: any) => {
    if (action.payload === "edit") {
      setIsDialogOpen(true);
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

      {/* Update Property Dialog */}
      <UpdateProperty open={isDialogOpen} onClose={handleDialogToggle} property={row} />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProperty}
      />
    </>
  );
};