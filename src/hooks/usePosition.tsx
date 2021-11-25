import {useState, useEffect } from 'react';

export type Coords = {
    latitude : number;
    longitude : number
}

const usePosition = () => {
    const [position, setPosition] = useState<Coords|null>(null);
    const [error, setError] = useState<string|null>(null);

    const onChangeHandler : PositionCallback = ({coords} ) => {
        setPosition({latitude : coords.latitude, longitude : coords.longitude});
    }

    const onErrorHandler : PositionErrorCallback = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not avalible');
            return null
        }

        const watcher = navigator.geolocation.watchPosition(onChangeHandler, onErrorHandler);

        return () => navigator.geolocation.clearWatch(watcher);
    }, [])

    return {...position, error}
}

export default usePosition
