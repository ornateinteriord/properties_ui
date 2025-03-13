import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, Divider, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingComponent } from '../../../App';
import './Dashboard.scss';
import { get } from '../../../api/Api';

const Dashboard = () => {
  const [counts, setCounts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await get('/get-counts');
        
  
        if (response.success && response.count) {
          setCounts(response.count);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
        toast.error('Unable to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: 'center', margin: '12px 0' }}>Welcome to Admin Dashboard</h1>
      <Grid container spacing={3} className="grid">
        {/* First Card */}
        <Grid item xs={12} sm={6} md={6} className="grid-item">
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total Users</Typography>
              </Box>
              <Typography variant="h6">{counts?.totalUsers ?? 0}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="center">
              <Button component={Link} to="/admin/users" variant="outlined" sx={{ borderColor: "#150b83c1", color: "#150b83c1" }}>
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
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total Properties</Typography>
              </Box>
              <Typography variant="h6">{counts?.totalProperties ?? 0}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="center">
              <Button component={Link} to="/admin/properties" variant="outlined" sx={{ borderColor: "#150b83c1", color: "#150b83c1" }}>
                View Properties
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default Dashboard;
