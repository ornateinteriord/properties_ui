import { useState, useEffect } from 'react';
import { Button, CardContent, Typography, Box, Card } from '@mui/material';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import { useNavigate } from 'react-router-dom';


const LocationPermissionHandler = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate()

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
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          alert('Please enable location permissions in your browser settings.');
        } else {
          navigator.geolocation.getCurrentPosition(
            () => setPermissionDenied(false),
            () => setPermissionDenied(true)
          );
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        () => setPermissionDenied(false),
        () => setPermissionDenied(true)
      );
    }
  };

  // Render the error UI if permission is denied
  if (permissionDenied) {
    return (
      <Card sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: 10,
        textAlign: 'center',
        padding: 3,
        backgroundColor: "white",
      }}>
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
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            <strong>Instructions:</strong>
            <ul>
              <li>Chrome: Go to Settings → Privacy and Security → Site Settings → Location.</li>
              <li>Firefox: Go to Preferences → Privacy & Security → Permissions → Location.</li>
              <li>Safari: Go to Preferences → Websites → Location.</li>
            </ul>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTryAgain}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={()=>navigate(-1)}
            sx={{ mt: 2  , ml :2 }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
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