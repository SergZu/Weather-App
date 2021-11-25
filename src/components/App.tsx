import React, { useEffect, useMemo, useState } from 'react'
import Weather from './Weather'
import Dashboard from './Dashboard'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getLocationAlias, getStorageData, setStorageData } from '../utils/storageUtils'
import { WeatherApiResponse } from './Weather'
import classes from './App.module.css'
import Alert from '../UI/Alert/Alert'

//ToDo
//Create dropbox with text UI component
//Create input UI component
//Refactor - create alert component for errors

export type Location = {
    name : string;
    lat : string;
    lon : string;
    temp? : number;
    notEarth? : boolean
}

export type WeatherDataObject = {
    [cityName : string] : WeatherApiResponse
}

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataObject>({});
    const [locations, setLocationsList] = useState<Location[]>([]);
    const [currentLocation, setCurrentLocation] = useState(-1);

    const computeCurrentLocation = () => {
        if (currentLocation === -1) setCurrentLocation(0)
    }

    const [fetchWeather, isWeatherLoading, errorWeather] = useLoading(async () => {
        let weather : WeatherDataObject = await WeatherService.getAllData() as WeatherDataObject;
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

    const getNewLocationData = async ({name, lat, lon} : Location, useCoords : boolean)  => {
        if (useCoords) {
            const newData = await WeatherService.getDataByCoords({lat, lon }) as WeatherApiResponse;
            setWeatherData( {...weatherData, [name] : newData} );
        } else {
            const newData = await WeatherService.getDataByName({name}) as WeatherApiResponse;
            setWeatherData( {...weatherData, [name] : newData} ); 
        }
    }

    const addLocation = (location : Location) : void => {
        const newData = location.name === 'My last location' && locations.some((loc) => loc.name === 'My last location') 
                                            ? [...locations.filter((loc) => loc.name !== 'My last location'), location] 
                                            : [...locations, location];
        setLocationsList(newData);
        setStorageData(newData);
    }

    const deleteLocation = (locationName : string) : void => {
        const newData = locations.filter((item) => item.name !== locationName);
        setLocationsList(newData);
        setStorageData(newData);
        const weatherCopy = {...weatherData};
        delete weatherCopy[locationName];
        setWeatherData(weatherCopy);
    }

    const tempArray = useMemo(() => () => {
        let temperature = {};
        for (let location in weatherData) {
            const locationName = weatherData[location].city.name;
            temperature[locationName] = weatherData[location].list[0].main.temp;
        }
        const result = locations.map((location) => {
            let name = '';
            if (location.name === 'My last location'){
                name = getLocationAlias({lat : location.lat, lon : location.lon})
        } else {
            name = location.name
        }
            return ({...location, 
            temp : temperature[name]})}) 
        return result
    }, [weatherData, locations]);

    const selectBackground = (weatherType : string, isMars : boolean) : string => {
        if (isMars) return 'marsBackground'
        let result = '';
        switch (weatherType) {
            case 'clear' : 
                result = 'clearSkyBackground';
                break;
            case 'cloud' : 
                result = 'cloudyBackground';
                break;
            case 'rain' :
                result = 'rainyBackground';
                break;
            case 'snow' :
                result = 'snowyBackground';
                break;
            case 'fog' :
                result = 'foggyBackground';
                break;
            default :
                result = 'defaultBackground'
        }
        return result
    }

    const location = currentLocation !== -1 ? locations[currentLocation].name : '';
    const loadingCondition = isWeatherLoading || isLocationsLoading || currentLocation === -1 || weatherData?.Mars === null;

    return (
                <div className={classes.appContainer}>
                        {errorLoc ? (<Alert text={errorLoc} />) : null}
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                    <main className={`${classes.app} ${!loadingCondition 
    && classes[ selectBackground( weatherData[ location ].list[0].weather.main , !!locations[currentLocation].notEarth ) ]}`}>
                        { loadingCondition 
                                            ? <Spinner /> 
                                            : <>
                                                  <Weather location={location} data={weatherData[ location]} />
                                                  <Dashboard list={tempArray()} addLocation={addLocation} deleteLocation={deleteLocation} 
                                                  weatherData={ weatherData[ locations[currentLocation].name ] } getNewLocationData={getNewLocationData} />
                                              </>
                        }                        
                    </main>
                </div>
    )
}

export default App

