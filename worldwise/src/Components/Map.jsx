import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/CitiesContext';
import City from './City';
import { useGeolocation } from '../Hooks/UseGeolocation';
import Button from './Button';
import { UseUrlPosition } from '../Hooks/UseUrlPosition';

function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {
        isLoading: isLoadingPosition, 
        position: geolocationPostion, 
        getPosition} = useGeolocation();
        const [MapLat, MapLng] = UseUrlPosition();
    
    useEffect(function(){
        if(MapLat && MapLng) 
        setMapPosition([MapLat, MapLng]);
    }, [MapLat, MapLng]);

    useEffect(function(){
        if(geolocationPostion) 
        setMapPosition(
            [geolocationPostion.lat, 
            geolocationPostion.lng])
    },[geolocationPostion]);
    return (
        <div className={styles.mapContainer}>
        {!geolocationPostion && <Button type='position' onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>}
        <MapContainer 
            center={mapPosition} 
            // center={[MapLat, MapLng]}
            zoom={16} 
            scrollWheelZoom={true} 
            className={styles.map}>

            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
            
                <Marker 
                    position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                    <span>{city.emoji}</span> <span>{city.cityName}</span>
                    </Popup>
                </Marker>
            ))}

            <ChangeCenter position={mapPosition} />
            <DetectClick />
        </MapContainer>
        </div>
    );
}

function ChangeCenter({position}){
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}
export default Map;
