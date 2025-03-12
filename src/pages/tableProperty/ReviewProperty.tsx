import {  Button, Card, CardContent } from "@mui/material"
import DataTable from 'react-data-table-component';

const ReviewProperty = () => {
    const data = [
        {
          id: 1,
          userId: 'user123',
          title: 'Property 1',
          createdAt: '2023-10-01',
          status: 'Pending',
        },
        {
          id: 2,
          userId: 'user456',
          title: 'Property 2',
          createdAt: '2023-10-02',
          status: 'Approved',
        },
        {
          id: 3,
          userId: 'user789',
          title: 'Property 3',
          createdAt: '2023-10-03',
          status: 'Rejected',
        },
      ];


      const columns = [
        {
          name: 'User ID',
          selector: (row:any) => row.userId,
          sortable: true,
        },
        {
          name: 'Title',
          selector: (row:any) => row.title,
          sortable: true,
        },
        {
          name: 'Created At',
          selector: (row:any) => row.createdAt,
          sortable: true,
        },
        {
          name: 'Status',
          selector: (row:any) => row.status,
          sortable: true,
        },
        {
          name: 'Action',
          cell: (row:any) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAction(row.id)}
            >
              Edit
            </Button>
          ),
        },
      ];


      const handleAction = (id:any)=> {
        console.log(`Action clicked for row with id: ${id}`);
    
      };
    
  return (
    <Card sx={{mt:8,width:"100%"}}>
        <CardContent sx={{p:10,mb:12}}>
        <DataTable
        title="Review Properties"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
        </CardContent>
    </Card>
  )
}

export default ReviewProperty
