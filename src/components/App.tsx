import React, { lazy, Suspense, useEffect, useState } from 'react'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getStorageData, setStorageData } from '../utils/useStorage'
import { WeatherApiResponse } from './Weather'
import classes from './App.module.css'
import Alert from '../UI/Alert/Alert'

//ToDo
//Create main layout and styles
//Create dropbox with text UI component
//Create input UI component
//Create addLocation UI button
//Create modal component
//Create components locations
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

const WeatherLazy = lazy(() => import('./Weather'));
const DashboardLazy = lazy(() => import('./Dashboard'));

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
                        {errorLoc ? (<Alert text={errorLoc} />) : null}
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                    <main className={classes.app}>
                        {isWeatherLoading || currentLocation === '' || weatherData?.Mars === null ? <Spinner /> : 
                        <Suspense fallback={<Spinner />}>
                            <WeatherLazy location={currentLocation} data={weatherData[currentLocation]} />
                        </Suspense> 
                        }                        
                        {isLocationsLoading ? <Spinner /> : 
                        <Suspense fallback={<Spinner />}>
                            <DashboardLazy list={locations} addLocation={addLocation} deleteLocation={deleteLocation} weatherData={weatherData[currentLocation]} />
                        </Suspense>
                        }                        
                    </main>
                </div>
    )
}

export default App

