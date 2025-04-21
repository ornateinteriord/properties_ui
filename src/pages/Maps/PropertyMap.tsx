import { MapContainer, TileLayer, Marker, Circle, Popup, useMap, Polyline } from 'react-leaflet';
import { memo, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, TextField, Button, Grid, IconButton, Typography } from "@mui/material";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { get } from '../../api/Api';
import { Product } from '../../types';
import { PropertyCard } from '../../components/property/card/PropertyCard';
import { Locate } from 'lucide-react';
import { LoadingComponent } from '../../App';
import logo from "../../assets/images/logo.png";
import { toast } from 'react-toastify';
import LocationPermissionHandler from './LocationPermissionHandler';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons
const userLocationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const buildingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
  iconSize: [38, 38],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Zoom to location component
const ZoomToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 30);
    }
  }, [lat, lng, map]);
  return null;
};

// Zoom to user location component
const ZoomToUserLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  const handleZoomToUserLocation = () => {
    if (lat && lng) {
      map.setView([lat, lng], 30);
    }
  };

  return (
    <IconButton
      onClick={handleZoomToUserLocation}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: '#f5f5f5',
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

// PropertyMarkers component
const PropertyMarkers = ({
  properties,
  handleGetDirections,
  loadingDirections,
}: {
  properties: Product[];
  handleGetDirections: (propertyLat: number, propertyLng: number) => void;
  loadingDirections: boolean;
}) => {

  return (
    <>
      {properties.map((property: Product, idx: number) => (
        <Marker key={idx} position={[property.location.coordinates[1], property.location.coordinates[0]]} icon={buildingIcon}>
          <Popup className="custom-popup">
            <PropertyCard property={property} isShowEdit={false} isAnimate={false} />
            <Button
              variant="contained"
              onClick={() => handleGetDirections(property.location.coordinates[1], property.location.coordinates[0])}
              sx={{ mt: 2, width: '100%' }}
              disabled={loadingDirections}
            >
              {loadingDirections ? 'Loading Directions...' : 'Get Directions'}
            </Button>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// Main PropertyMap component
const PropertyMap = () => {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [properties, setProperties] = useState<Product[]>([]);
  const [loading , setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const [directions, setDirections] = useState<[number, number][] | null>(null);
  const [loadingDirections, setLoadingDirections] = useState<boolean>(false);

  const navigate = useNavigate();

  const [searchRadius, setSearchRadius] = useState<number>(200);
  const [appliedSearchRadius, setAppliedSearchRadius] = useState<number>(200);

  const [searchParams] = useSearchParams();
  const queryLat = searchParams.get('lat');
  const queryLng = searchParams.get('lng');

  const handleApply = (e: any) => {
    e.preventDefault();
    setAppliedSearchRadius(searchRadius);
  };

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

  useEffect(() => {
    const fetchProperties = async () => {
      if (userLat && userLng) {
        try {
          setLoading(true)
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
        } finally {
          setLoading(false)
        }
      }
    };

    fetchProperties();
  }, [userLat, userLng, appliedSearchRadius]);

  const fetchDirections = async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    setLoadingDirections(true);
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeCoordinates = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
        setDirections(routeCoordinates);
      } else {
        toast.error('No route found.');
      }
    } catch (err) {
      console.error('Error fetching directions:', err);
      toast.error('Failed to fetch directions.');
    } finally {
      setLoadingDirections(false);
    }
  };

  const handleGetDirections = (propertyLat: number, propertyLng: number) => {
    if (userLat && userLng) {
      fetchDirections(userLat, userLng, propertyLat, propertyLng);
    }
  };

  if (error) {
    return <LocationPermissionHandler />
  }

  if (!userLat || !userLng) {
    return <LoadingComponent />;
  }

  return (
    <Grid sx={{ minHeight: "100vh" }}>
      <style>{popupStyle}</style>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{ width: "100px", height: "auto", objectFit: "contain", cursor: "pointer" }}
            onClick={() => navigate('/')}
          />
        </Box>
        <Typography sx={{color : "#000"}}>Property Count : <strong style={{color : "green"}}>{properties.length ?? 0}</strong></Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
          component={"form"}
          onSubmit={handleApply}
        >
          <TextField
            variant="outlined"
            placeholder="Search radius..."
            label="Radius"
            type="number"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            sx={{
              width: { xs: "100%", sm: 300 },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#150b83c1",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#0d065f",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
      <MapContainer center={[userLat, userLng]} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {queryLat && queryLng && (
          <ZoomToLocation lat={parseFloat(queryLat)} lng={parseFloat(queryLng)} />
        )}

        {userLat && userLng && (
          <ZoomToUserLocation lat={userLat} lng={userLng} />
        )}

        <Circle
          center={[userLat, userLng]}
          radius={appliedSearchRadius * 1000}
          pathOptions={{ fillColor: '#000', color: '#8d575759' }}
        />

        <Marker position={[userLat, userLng]} icon={userLocationIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Render PropertyMarkers inside MapContainer */}
        <PropertyMarkers
          properties={properties}
          handleGetDirections={handleGetDirections}
          loadingDirections={loadingDirections}
        />

        {directions && (
          <Polyline
            positions={directions}
            pathOptions={{ color: 'blue', weight: 3 }}
          />
        )}
      </MapContainer>
      {loading && (
        <LoadingComponent />
      )}
    </Grid>
  );
};

export default memo(PropertyMap);