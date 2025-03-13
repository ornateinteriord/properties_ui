import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material"
import DataTable from "react-data-table-component"
import { getAllUserDetails } from "../../../api/user"
import { profile } from "../../../types"
import { getRelativeTime } from "../../../utils/constant"
import TokenService from "../../../api/token/TokenService"


const UsersTable = () => {
const {data:users,isLoading}=getAllUserDetails()

const userData=users?.filter((user:profile)=>user.username !== TokenService.getuserId())

 const columns = [
    {
      name: 'User Id',
      cell: (row: profile) => row.username,
      sortable: true,
    },
    {
      name: 'Full Name',
      cell: (row: profile) => row.fullname,
      sortable: true,
    },
    {
      name: 'Email',
      cell: (row: profile) => row.email,
      sortable: true,
    },
    {
      name: 'Mobile No',
      cell: (row: profile) => row.mobileno,
      sortable: true,
    },
    {
      name: 'Gender',
      cell: (row: profile) => row.gender,
      sortable: true,
    },
    {
      name: 'Role',
      cell: (row: profile) => row.role,
      sortable: true,
    },
    {
      name: 'Created At',
      cell: (row: profile) => getRelativeTime(row.createdAt),
      sortable: true,
    },
]
  return (
    <Box sx={{ mt: 8, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4,mt:4 }}>
        Users
      </Typography>
      <Card sx={{ width: "100%", maxWidth: "1200px", overflowX: "auto" }}>
        <CardContent>
          <DataTable
            columns={columns}
            data={userData}
            progressComponent={<CircularProgress />}
            progressPending={isLoading}
            pagination
            highlightOnHover
            responsive 
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default UsersTable
