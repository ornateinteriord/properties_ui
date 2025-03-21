import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ lat: number; lng: number; display_name: string }[]>([]);

    const defaultCenter: LatLngExpression = [12.9716, 77.5946]; 

    // Handle map click to set location
    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
                setPosition(newPos);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    // Handle search
    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: searchQuery,
                    format: 'json',
                    limit: 5,
                },
            });
            setSearchResults(
                res.data.map((item: any) => ({
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon),
                    display_name: item.display_name,
                }))
            );
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
            />
            <button onClick={handleSearch}>Search</button>

            {/* Show Search Results */}
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                const newPos: [number, number] = [place.lat, place.lng];
                                setPosition(newPos);
                                onLocationSelect(place.lat, place.lng);
                                setSearchResults([]); // Clear results after selection
                            }}
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Map */}
            <MapContainer center={defaultCenter} zoom={10} style={{ height: '500px', width: '50vw' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && <Marker position={position} />}
                <MapClickHandler />
            </MapContainer>
        </div>
    );
};

export default LocationPicker;
