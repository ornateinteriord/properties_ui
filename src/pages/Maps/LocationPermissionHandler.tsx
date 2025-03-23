import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import LocationOffIcon from '@mui/icons-material/LocationOff';


const LocationPermissionHandler = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Check location permission on component mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Function to check location permission
  const checkLocationPermission = async () => {
    if (navigator.permissions) {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      if (permissionStatus.state === 'denied') {
        setPermissionDenied(true);
      } else {
        setPermissionDenied(false);
      }
    } else {
      // Fallback for browsers that don't support navigator.permissions
      navigator.geolocation.getCurrentPosition(
        () => setPermissionDenied(false),
        () => setPermissionDenied(true)
      );
    }
  };

  // Function to request location permission again
  const handleTryAgain = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setPermissionDenied(false);
      },
      () => {
        setPermissionDenied(true);
      }
    );
  };

  // Render the error UI if permission is denied
  if (permissionDenied) {
    return (
      <Grid sx={{ maxWidth: 400,
        margin: 'auto',
        marginTop: 10,
        textAlign: 'center',
        padding: 3,
        backgroundColor: white,}}>
        <CardContent>
          <Box sx={{ color: 'error.main', mb: 2 }}>
            <LocationOffIcon sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Location Permission Denied
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            We need access to your location to provide the best experience. Please enable location permissions in your browser settings.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTryAgain}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </CardContent>
      </Grid>
    );
  }

  // Render children if permission is granted
  return (
    <Box>
      {/* Your main component content goes here */}
      <Typography variant="h6">Location access granted. You're good to go!</Typography>
    </Box>
  );
};

export default LocationPermissionHandler;