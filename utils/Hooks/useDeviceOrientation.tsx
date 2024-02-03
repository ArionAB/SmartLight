import { useCallback, useEffect, useState } from 'react';

interface DeviceOrientation {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}

interface UseDeviceOrientationData {
    orientation: DeviceOrientation | null;
    error: Error | null;
    requestAccess: () => Promise<boolean>;
    revokeAccess: () => Promise<void>;
}

export const useDeviceOrientation = (): UseDeviceOrientationData => {
    const [error, setError] = useState<Error | null>(null);
    const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);

    const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
        setOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
        });
    };

    const revokeAccessAsync = async (): Promise<void> => {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
        setOrientation(null);
    };

    const requestAccessAsync = async (): Promise<boolean> => {
        if (!DeviceOrientationEvent) {
            setError(new Error('Device orientation event is not supported by your browser'));
            return false;
        }

        window.addEventListener('deviceorientation', onDeviceOrientation);
        return true;
    };

    const requestAccess = useCallback(requestAccessAsync, []);
    const revokeAccess = useCallback(revokeAccessAsync, []);

    useEffect(() => {
        return (): void => {
            revokeAccess();
        };
    }, [revokeAccess]);

    return {
        orientation,
        error,
        requestAccess,
        revokeAccess,
    };
};