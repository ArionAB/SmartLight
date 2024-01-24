import React, { FC } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: "https://icon-library.com/images/location-pin-icon/location-pin-icon-12.jpg",
    iconSize: [35, 35], // Size of the icon
    iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
});

export const MyLocationMarker: FC<{ position: any }> = ({
    position
}) => {
    // const map = useMapEvents({
    //     click() {
    //         map.locate()
    //     },
    //     locationfound(e: any) {
    //         setPosition(e.latlng)
    //         map.flyTo(e.latlng, map.getZoom())
    //     },
    // })


    return position === null ? null : (
        <Marker position={position} icon={customIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

