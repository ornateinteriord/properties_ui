import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { Box, TextField, Button, Typography, Grid, IconButton } from "@mui/material";

// Import Leaflet marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { get } from '../../api/Api';
import { Product } from '../../types';
import { PropertyCard } from '../../components/property/card/PropertyCard';
import { Locate } from 'lucide-react';
import { LoadingComponent } from '../../App';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl; // Use type assertion to avoid TypeScript error
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Define a custom icon for the user's location
const userLocationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Example icon URL
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const buildingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619153.png', // Example building icon URL
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

// Component to handle map zooming to a specific location
const ZoomToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 30); // Zoom to the specified location
    }
  }, [lat, lng, map]);
  return null;
};

// Component to zoom to the user's location
const ZoomToUserLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  const handleZoomToUserLocation = () => {
    if (lat && lng) {
      map.setView([lat, lng], 30); // Zoom to the user's location
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
      <Locate color='blue' size={25} />
    </IconButton>
  );
};

// Custom CSS for the popup
const popupStyle = `
  .custom-popup .leaflet-popup-content-wrapper {
    width: 300px; /* Set the width of the popup */
    margin-left: 20px; /* Adjust the position to the right */
  }
  .custom-popup .leaflet-popup-tip {
    display: none; /* Hide the default tip */
  }
`;

const PropertyMap = () => {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [properties, setProperties] = useState<Product[]>([]); // Initialize as empty array
  const [error, setError] = useState<string | null>(null);

  const [searchRadius, setSearchRadius] = useState<number>(200); // Default search radius
  const [appliedSearchRadius, setAppliedSearchRadius] = useState<number>(200); // Applied search radius

  // Use useSearchParams to get query parameters from the URL
  const [searchParams] = useSearchParams();
  const queryLat = searchParams.get('lat');
  const queryLng = searchParams.get('lng');

  // Handle Apply button click
  const handleApply = () => {
    setAppliedSearchRadius(searchRadius); // Update the applied search radius
  };

  // Fetch the user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLng(longitude);
        },
        (err) => {
          setError('Unable to retrieve your location. Please enable location access.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Fetch properties within the search radius when the user's location is available
  useEffect(() => {
    const fetchProperties = async () => {
      if (userLat && userLng) {
        try {
          const data = await get('/product/properties', { lat: userLat, lng: userLng, radius: appliedSearchRadius });
          if (Array.isArray(data)) {
            setProperties(data);
          } else {
            console.error('API response is not an array:', data);
            setProperties([]);
          }
        } catch (err) {
          console.error('API Error:', err);
          setProperties([]);
        }
      }
    };

    fetchProperties();
  }, [userLat, userLng, appliedSearchRadius]);

  // Show a loading or error message if the user's location is not available
  if (error) {
    return <div>{error}</div>;
  }

  if (!userLat || !userLng) {
    return <LoadingComponent />;
  }

  return (
    <Grid sx={{ mt: 12 }}>
      {/* Add custom CSS for the popup */}
      <style>{popupStyle}</style>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        {/* Left Side: Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#150b83c1",
          }}
        >
          All Properties
        </Typography>

        {/* Right Side: Search Textbox and Apply Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
            gap: 2,
            width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search radius..."
            label="Radius"
            type="number"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))} // Update search radius state
            sx={{
              width: { xs: "100%", sm: 300 }, // Full width on small screens, fixed width on larger screens
            }}
          />
          <Button
            variant="contained"
            onClick={handleApply} // Trigger handleApply on click
            sx={{
              backgroundColor: "#150b83c1",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#0d065f",
              },
              width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
      <MapContainer center={[userLat, userLng]} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Zoom to the location if query parameters are provided */}
        {queryLat && queryLng && (
          <ZoomToLocation lat={parseFloat(queryLat)} lng={parseFloat(queryLng)} />
        )}

        {/* Zoom to the user's location */}
        {userLat && userLng && (
          <ZoomToUserLocation lat={userLat} lng={userLng} />
        )}

        {/* Circle to indicate the search radius */}
        <Circle
          center={[userLat, userLng]}
          radius={appliedSearchRadius * 1000}
          pathOptions={{ fillColor: '#000', color: '#8d575759' }} // Use pathOptions for styling
        />

        {/* Marker for the user's location with a label */}
        <Marker position={[userLat, userLng]} icon={userLocationIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Markers for properties */}
        {properties.map((property: Product, idx: number) => (
          <Marker key={idx} position={[property.location.coordinates[1], property.location.coordinates[0]]} icon={buildingIcon}>
            <Popup className="custom-popup"> {/* Apply custom class */}
              <PropertyCard property={property} isShowEdit={false} isAnimate={false} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Grid>
  );
};

export default PropertyMap;