import { Button, Card, CardContent, CircularProgress, Menu, MenuItem, Typography, Box } from "@mui/material";
import DataTable from 'react-data-table-component';
import { getAllProperties, useDeleteProperty } from "../../../api/product";
import { Product } from "../../../types";
import { ActionMenyItems, getFormattedName, getRelativeTime } from "../../../utils/constant";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateProperty } from '../../../api/product/index';
import CreateProperty from "../../../components/property/card/CreateProperty";


const ReviewProperty = () => {
  const { data: products, isLoading } = getAllProperties();

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
      cell: (row: Product | any) => <ActionMenuComponent row={row} />,
      center: true,
    },
  ];

  return (
    <Box sx={{ mt: 8, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4,mt:4 }}>
        Properties
      </Typography>
      <Card sx={{ width: "100%", maxWidth: "1200px", overflowX: "auto" }}>
        <CardContent>
          <DataTable
            columns={columns}
            data={products}
            progressComponent={<CircularProgress />}
            progressPending={isLoading}
            pagination
            highlightOnHover
            responsive 
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReviewProperty;

const ActionMenuComponent = ({ row }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const updateProperty = useUpdateProperty(row._id);
  const deleteProperty = useDeleteProperty(row._id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleDialogToggle = useCallback(() => {
      setIsDialogOpen((prev) => !prev);
    }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateProperty = (action: any) => {
   if(action.payload === 'edit'){
    setIsDialogOpen(true)
   }else if(action.payload === "delete"){
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty.mutate();
    }
   }else{
     updateProperty.mutate({ [action.payload]: action.value });
   }
   handleClose()
  };

  const filteredActions = ActionMenyItems.filter((action) => {
    if (row.status === "active" && action.label === "Active") return false; 
    if (row.pramote === "active" && action.label === "Promote") return false; 
    return true; 
  });

  return (
    <>
      <Button
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ChevronDown  style={{
          transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }} />}
        variant="outlined"
        sx={{width:"auto",fontFamily:"Bogle-Regular",color:"#000",whiteSpace:"nowrap",textTransform:"none",borderColor:"#150b83c1"}}
      >
        Action
      </Button>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            minWidth:{xs:110},
          },
        }}
      >
        {filteredActions.map((action) => (
          <MenuItem key={action.label} onClick={() => handleUpdateProperty(action)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
      <CreateProperty open={isDialogOpen} onClose={handleDialogToggle}/>
    </>
  );
};