import React, { useEffect, useState } from 'react'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getStorageData, setStorageData } from '../utils/useStorage'
import Dashboard from './Dashboard'
import Weather, { WeatherApiResponse } from './Weather'
import classes from './App.module.css'
import Alert from '../UI/Alert/Alert'

//ToDo
//Create main layout and styles
//Create dropbox with text UI component
//Create input UI component
//Create addLocation UI button
//Create modal component
//Create components forecast, locations, weather
//Refactor - create alert component for errors

export type Location = {
    name : string;
    lat : string;
    lon : string;
    notEarth? : boolean
}

export type WeatherDataObject = {
    [cityName : string] : WeatherApiResponse
} 

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataObject>({});
    const [locations, setLocationsList] = useState<Location[]>([]);
    const [currentLocation, setCurrentLocation] = useState('');

    const computeCurrentLocation = () => {
        if (currentLocation.length === 0) setCurrentLocation('Mars')
    }

    const [fetchWeather, isWeatherLoading, errorWeather] = useLoading(async () => {
        const weather : WeatherDataObject = await WeatherService.getAllData() as WeatherDataObject;
        setWeatherData( weather );
    });

    const [fetchLocation, isLocationsLoading, errorLoc] = useLoading( async () => {
        const data = getStorageData();
        computeCurrentLocation();
        setLocationsList(data);
    });
    

    useEffect(() => {
        fetchLocation();
        fetchWeather();
    }, []);

    const addLocation = (location : Location) : void => {
        const newData = [...locations, location];
        setLocationsList(newData);
        setStorageData(newData);
    }

    const deleteLocation = (locationName : string) : void => {
        const newData = locations.filter((item) => item.name !== locationName);
        setLocationsList(newData);
        setStorageData(newData);

    }

    return (
                <div className={classes.appContainer}>
                    <main className={classes.app}>
                        {errorLoc ? (<Alert text={errorLoc} />) : null}
                        {isLocationsLoading ? <Spinner /> : <Dashboard list={locations} addLocation={addLocation} deleteLocation={deleteLocation} />}
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                        {isWeatherLoading || currentLocation === '' || weatherData?.Mars === null ? <Spinner /> : <Weather location={currentLocation} data={weatherData[currentLocation]} /> }
                    </main>
                </div>
    )
}

export default App

