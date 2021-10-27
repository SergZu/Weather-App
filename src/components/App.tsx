import React, { useEffect, useState } from 'react'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getStorageData } from '../utils/useStorage'
import Forecast from './Forecast'
import Locations from './Locations'
import Weather from './Weather'


const App = () => {
    const [weatherData, setWeatherData] = useState({});
    const [locations, setLocationsList] = useState([]);

    const [fetchWeather, isWeatherLoading, errorWeather] = useLoading(async () => {
        const weather = await WeatherService.getAllData();
        setWeatherData( weather );
    })

    const [fetchLocation, isLocationsLoading, errorLoc] = useLoading( async () => {
        const data = getStorageData();
        setLocationsList(data);
    })
    

    useEffect(() => {
        fetchLocation();
        fetchWeather();
    }, []);

    /*const addLocation = (location : Location) : void => {
        const newData = [...data, location];
        setData(newData);
        setStorageData(newData);
    }

    const deleteLocation = (locationName : string) : void => {
        const newData = data.filter((item) => item.name !== locationName);
        setData(newData);
        setStorageData(newData);

        export type Location = {
    name : string;
    lat : string;
    lon : string;
    notEarth? : boolean
}

export type LocationData = {
    locations : Location[]
}
    }*/

    return (
                <div>
                    {errorLoc ? <h3 style={{color : 'red'}}>{errorLoc}</h3> : null}
                    {isLocationsLoading ? <Spinner /> : <Locations list={locations} />}
                    {errorWeather ? <h3 style={{color : 'red'}}>{errorWeather}</h3> : null}
                    {isWeatherLoading ? <Spinner /> : <Weather /> }
                    <Forecast />
                </div>
    )
}

export default App

