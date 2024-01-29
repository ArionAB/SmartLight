import { useMap } from "react-leaflet";
import { Map } from "leaflet";
import { FC } from "react";

interface FlyToLocationProps {
    lat: number;
    lng: number;
}

export const flyToLocation = (map: Map, lat: number, lng: number): void => {

    map.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.5,
    });

};

const FlyToLocationButton: FC<FlyToLocationProps> = ({ lat, lng }) => {
    const map = useMap();

    const handleButtonClick = () => {
        flyToLocation(map, lat, lng);
    };

    return <button onClick={handleButtonClick}>Go to Location</button>;
};

export default FlyToLocationButton;