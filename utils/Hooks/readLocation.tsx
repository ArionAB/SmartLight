import { LocationModel } from "../Store/Models/Location/LocationModel";

const readLocation = (
    setLocation: (location: LocationModel) => void,
    setError: (errorMessage: string) => void,
    setAccuracy: (acc: number) => void
) => {
    if (navigator.geolocation) {
        const geoId = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLocation({ lat, lng });
                setAccuracy(position.coords.accuracy);
                console.log({ lat, lng }, position.coords.accuracy);
                if (position.coords.accuracy > 10) {
                    console.log("The GPS accuracy isn't good enough");
                }
            },
            (e) => {
                console.log(e.message);
                setError(e.message);
            },
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
        return () => {
            console.log('Clear watch called');
            window.navigator.geolocation.clearWatch(geoId);
        };
    }

    return;
};