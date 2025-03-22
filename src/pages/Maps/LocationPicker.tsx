import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<[number, number] | null>(null); // For showing toast notifications

    const defaultCenter: LatLngExpression = [12.9716, 77.5946]; // Default center for Karnataka

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

    return (
        <div style={{ padding: '16px' }}>
            {/* Map */}
            <Paper elevation={3} style={{ height: '50vw', width: '100%' }}>
                <MapContainer center={defaultCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {position && (
                        <>
                            <Marker position={position} />
                            <UpdateMapView center={position} /> {/* Update map view to the selected location */}
                        </>
                    )}
                    <MapClickHandler />
                </MapContainer>
            </Paper>

        </div>
    );
};

export const LocationDialog = ({ open, onClose, onLocationSelect }: any) => {
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
            fullWidth // Make the dialog take up the full width allowed by maxWidth
        >
            <DialogTitle>Select Location</DialogTitle>
            <DialogContent sx={{ width: '100%', minWidth: '800px' }}> {/* Set a minimum width for the content */}
                <LocationPicker onLocationSelect={handleLocationSelect} />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm} color="primary" disabled={!selectedLocation}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};