import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyMap = ({ userLat, userLng, searchRadius }: { userLat: number; userLng: number; searchRadius: number }) => {
    const [properties, setProperties] = useState<{ lat: number; lng: number; title: string }[]>([]);

    useEffect(() => {
        axios
            .get('/product/properties', { params: { lat: userLat, lng: userLng, radius: searchRadius } })
            .then((res) => setProperties(res.data))
            .catch((err) => console.error(err));
    }, [userLat, userLng, searchRadius]);

    return (
        <MapContainer center={[userLat, userLng]} zoom={12} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle center={[userLat, userLng]} radius={searchRadius * 1000} fillColor="blue" />
            {properties.map((property, idx) => (
                <Marker key={idx} position={[property.lat, property.lng]} />
            ))}
        </MapContainer>
    );
};

export default PropertyMap;
