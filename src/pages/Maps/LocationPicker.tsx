import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Locate } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation ?: { type: string; coordinates: [number, number] }; // Add initialLocation prop
}

const LocationPicker = ({ onLocationSelect, initialLocation }: LocationPickerProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null); // Store user's location

  const defaultCenter: LatLngExpression = [12.9716, 77.5946]; // Default center for Karnataka

  // Set initial position if initialLocation is provided
  useEffect(() => {
    if (initialLocation && initialLocation.coordinates) {
      const [lng, lat] = initialLocation.coordinates; // Note: MongoDB stores coordinates as [lng, lat]
      setPosition([lat, lng]); // Set position to the initial location
    }
  }, [initialLocation]);

  // Component to handle map click
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
        const isInKarnataka = await validateLocationInKarnataka(newPos[0], newPos[1]);

        if (isInKarnataka) {
          setPosition(newPos);
          onLocationSelect(e.latlng.lat, e.latlng.lng);
        } else {
          setPosition(null); // Remove the pointer
          toast.error('Selected location is not in Karnataka.'); // Show toast notification
        }
      },
    });
    return null;
  };

  // Component to update map view
  const UpdateMapView = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    map.setView(center, 15); // Zoom level 15 (adjust as needed)
    return null;
  };

  // Component to zoom to the user's location
  const ZoomToUserLocation = () => {
    const map = useMap();

    const handleZoomToUserLocation = (e: React.MouseEvent) => {
      e.stopPropagation(); // Stop event propagation
      if (userLocation) {
        map.setView(userLocation, 15); // Zoom to the user's location
      }
    };

    return (
      <IconButton
        onClick={handleZoomToUserLocation}
        sx={{
          position: 'absolute', // Position the button absolutely
          top: 16, // Adjust top position
          right: 16, // Adjust right position
          zIndex: 1000, // Ensure the button is above the map
          backgroundColor: '#fff', // White background
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Add a shadow
          '&:hover': {
            backgroundColor: '#f5f5f5', // Light gray background on hover
          },
        }}
      >
        <Locate color="blue" size={25} /> {/* Use the Locate icon */}
      </IconButton>
    );
  };

  // Validate if the location is in Karnataka using reverse geocoding
  const validateLocationInKarnataka = async (lat: number, lng: number) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon: lng,
          format: 'json',
        },
      });

      const address = res.data.address;
      return address.state?.toLowerCase() === 'karnataka'; // Check if the state is Karnataka
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return false;
    }
  };

  // Fetch the user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); // Store user's location
        },
        (err) => {
          toast.error('Unable to retrieve your location. Please enable location access.');
          console.error(err);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      {/* Map */}
      <Paper elevation={3} style={{ height: '50vw', width: '100%' }}>
        <MapContainer
          center={position || defaultCenter} // Use initial position or default center
          zoom={position ? 15 : 10} // Zoom in if position is set
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {position && (
            <>
              <Marker position={position} />
              <UpdateMapView center={position} /> {/* Update map view to the selected location */}
            </>
          )}
          {userLocation && <ZoomToUserLocation />} {/* Render the zoom button */}
          <MapClickHandler />
        </MapContainer>
      </Paper>
    </div>
  );
};

export const LocationDialog = ({ open, onClose, onLocationSelect, initialLocation }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Handle location selection
  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  // Handle confirm button click
  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng); // Pass the selected location to the parent
    }
    onClose(); // Close the dialog
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg" // Increase the max width of the dialog
      fullWidth 
      sx={{
        '& .MuiDialog-paper': {
          width: '100%', 
          maxWidth: '1200px', 
          margin: '16px', 
          '@media (max-width: 600px)': {
            margin: '8px', 
          },
        },
      }}
    >
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent sx={{
      width: '100%',
      minWidth: '800px', 
      '@media (max-width: 900px)': {
        minWidth: '600px',
      },
      '@media (max-width: 600px)': {
        minWidth: 'unset', 
        padding: '8px',
      },
    }}> 
        <LocationPicker
          onLocationSelect={handleLocationSelect}
          initialLocation={initialLocation} 
        />
      </DialogContent>
      <DialogActions sx={{
      padding: '16px',
      '@media (max-width: 600px)': {
        padding: '8px', 
      },
    }}>
        <Button variant="text" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} color="primary" disabled={!selectedLocation}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};