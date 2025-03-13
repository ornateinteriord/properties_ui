import { Paper, Typography, Box, Grid, Divider, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Import the Person icon
import './Dashboard.scss';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: 'center', margin: '12px 0' }}>Welcome to Admin Dashboard</h1>
      <Grid container spacing={3} className="grid">
        {/* First Card */}
        <Grid item xs={12} sm={6} md={6} className="grid-item">
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1 }} /> {/* Person icon on the left */}
                <Typography variant="h6">Total Users</Typography>
              </Box>
              <Typography variant="h6">1,234</Typography> {/* Number of users on the right */}
            </Box>
            <Divider sx={{ my: 2 }} /> {/* Divider inside the card */}
            <Box display="flex" justifyContent="center">
              <Button component={Link} to="/admin/users"  variant="outlined" sx={{borderColor:"#150b83c1",color:"#150b83c1"}}>
                View Users
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} sm={6} md={6} className="grid-item">
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1 }} /> {/* Person icon on the left */}
                <Typography variant="h6">Total Properties</Typography>
              </Box>
              <Typography variant="h6">567</Typography> {/* Number of active users on the right */}
            </Box>
            <Divider sx={{ my: 2 }} /> {/* Divider inside the card */}
            <Box display="flex" justifyContent="center">
              <Button component={Link} to="/admin/properties"   variant="outlined" sx={{borderColor:"#150b83c1",color:"#150b83c1"}} >
                View Properties
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;