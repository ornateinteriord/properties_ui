import {  Button, Card, CardContent, CircularProgress, Menu, MenuItem, Typography } from "@mui/material"
import DataTable from 'react-data-table-component';
import { getAllProperties } from "../../api/product";
import { Product } from "../../types";
import { ActionMenyItems, getFormattedName, getRelativeTime } from "../../utils/constant";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateProperty } from './../../api/product/index';

const ReviewProperty = () => {
      const {data : products , isLoading} = getAllProperties()

      const columns = [
        {
          name: 'User ID',
          cell: (row:Product) => row.userid,
          sortable: true,
        },
        {
          name: 'Title',
          cell: (row:Product) => row.title,
          sortable: true,
        },
        {
          name: 'Created At',
          cell: (row:Product) => getRelativeTime(row.createdAt),
          sortable: true,
        },
        {
          name: 'Status',
          cell: (row:Product) => <Typography variant="body2" sx={{color: row.status === "active" ? "success.main" : "warning.main"}}>{getFormattedName(row.status)}</Typography>,
          sortable: true,
        },
        {
          name: 'Pramote',
          cell: (row:Product) => <Typography variant="body2" sx={{color: row.pramote === "active" ? "success.main" : "warning.main"}}>{getFormattedName(row.pramote)}</Typography>,
          sortable: true,
        },
        {
          name: 'Action',
          cell: (row:Product | any) => (
            <ActionMenuComponent row={row} />
          ),
          center : true
        },
      ];
    
  return (
    <Card sx={{mt:8,width:"100%"}}>
        <CardContent sx={{p:10,mb:12}}>
          <DataTable
            title="Properties"
            columns={columns}
            data={products}
            progressComponent={<CircularProgress />}
            progressPending={isLoading}
            pagination
            highlightOnHover
          />
        </CardContent>
    </Card>
  )
}

export default ReviewProperty

const ActionMenuComponent = ({row}:any) => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log(row)
  const updateProperty = useUpdateProperty(row._id)
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateProperty = (action: any) => {
    updateProperty.mutate({ [action.payload]: action.value });
  };

  const filteredActions = ActionMenyItems.filter((action) => {
    if (row.status === "active" && action.label === "Active") return false;  // Don't show 'Active' if status is active
    if (row.pramote === "active" && action.label === "Promote") return false;  // Don't show 'Promote' if pramote is active
    return true;  // Otherwise, show the action
  });

  return (
    <>
    <Button 
      aria-controls="action-menu"
      aria-haspopup="true"
      onClick={handleClick}
      endIcon={<ChevronDown />}
      variant="outlined"
      style={{fontFamily : "Bogle-Regular" , color:"#000"}}
      >
      Action
    </Button>
    <Menu
      id="action-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        '&.MuiPaper-root': {
          minWidth :120
        }
      }}
    >
      {filteredActions.map((action) => (
        <MenuItem onClick={()=>handleUpdateProperty(action)}>{action.label}</MenuItem>
      ))}
    </Menu>
    </>
  )
}