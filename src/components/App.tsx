import React, { useEffect, useMemo, useState } from 'react'
import Weather from './Weather'
import Dashboard from './Dashboard'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getStorageData, setStorageData, StorageFuncTarget } from '../utils/storageUtils'
import classes from './App.module.css'
import Alert from '../UI/Alert/Alert'
import { selectBackground } from '../utils/selectBackground'
import { createLocationsList } from '../utils/createLocationsList'
import ErrorBoundary from './ErrorBoundary'


export type Location = {
    name : string;
    lat : number;
    lon : number;
    temp? : number;
}

export type WeatherType = {
    dt : number,
    sunrise : number,
    sunset : number,
    main : {
        temp : number,
        temp_min : number,
        temp_max : number,
        pressure : number 
    },
    weather : {
        main : string,
        description : string
    },
    clouds : {
        all : number
    },
    wind : {
        speed : number,
        deg : number
    },
    uvi : number
}

export type WeatherApiResponse = {
    cod : string,
    list : WeatherType[],
    lon : number,
    lat : number,
    time_offset : number,
    city : {
        name : string
    }
}

export type WeatherDataObject = {
    [cityName : string] : WeatherApiResponse
}

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataObject>({});
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<number>( Date.now() );

    const [fetchWeather, isWeatherLoading, errorWeather] = useLoading(async ({signal}) => {
        
        const data = getStorageData(StorageFuncTarget.location) as Location[] ;
        if ( !data.length ) {
            setStorageData('', StorageFuncTarget.current);
            return;
        }

        computeCurrentLocation();
        let weather : WeatherDataObject = await WeatherService.getAllData(data, signal) as WeatherDataObject;
        setWeatherData( weather );
    });
    
    /* Fetching weather first */
    useEffect(() => {
        const controller = new AbortController();
        fetchWeather({signal : controller.signal});
        return () => {
            controller.abort()
        }
    }, []);
    /* Update time on display */
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentTime(Date.now())
        }, 60000);
        return () => {
            clearTimeout(timeout)
        }
    }, [currentTime]);
    /* Update weather data after 15m */
    useEffect(() => {
        const controller = new AbortController();
        const timeout = setTimeout(async () => {
            fetchWeather({signal : controller.signal});
        }, 900000);
        return () => {
            controller.abort();
            clearTimeout(timeout);
        }    
    }, [])

    const resetAppData = () : void => {
        setStorageData([], StorageFuncTarget.location);
        setStorageData('', StorageFuncTarget.current);
        setWeatherData({});
        setCurrentLocation('');
    }

    const changeCurrentLocation = (newLoc : string) : void => {
        setStorageData(newLoc, StorageFuncTarget.current);
        setCurrentLocation(newLoc);
};

    const computeCurrentLocation = () : void => {
        const locationId = getStorageData(StorageFuncTarget.current) as string;
        setCurrentLocation(locationId)
    }



    const setNewLocationData = (newData : WeatherApiResponse) : void  => { 
                newData = Object.assign({}, newData);
                setWeatherData( {...weatherData, [newData.city.name] : newData} );
            };

    const addLocation = (locationWeather : WeatherApiResponse) : void => {
            const locName = locationWeather.city.name;
            const locInfo : Location = {name : locName, lat : locationWeather.lat, lon : locationWeather.lon};
            if (weatherData.hasOwnProperty(locName)) return

            const locations = createLocationsList(weatherData);
            locations.push(locInfo);
            setStorageData(locations, StorageFuncTarget.location);
            if (currentLocation === '') {
                setStorageData(locName, StorageFuncTarget.current);
                computeCurrentLocation()
            }
            setNewLocationData(locationWeather);
        }

    const deleteLocation = (locationName : string) : void => {
        if (Object.keys(weatherData).length === 1) {
            resetAppData();
            return
        }

        const locations = createLocationsList(weatherData);
        const newList = locations.filter((item) => item.name !== locationName);
        setStorageData(newList, StorageFuncTarget.location);

        const newWeatherData : WeatherDataObject = {};
        for (let location in weatherData) {
            if (location !== locationName) newWeatherData[location] = weatherData[location];
        }
        if (currentLocation === locationName) {
            const newCurrentLocation = Object.keys(newWeatherData)[0];
            setStorageData(newCurrentLocation, StorageFuncTarget.current);
            changeCurrentLocation(newCurrentLocation);
        }
        setWeatherData(newWeatherData);
    }
    

    const tempArray = useMemo(() => () => {
        let temperature = {};
        for (let location in weatherData) {
            const locationName = weatherData[location].city.name;
            temperature[locationName] = weatherData[location].list[0].main.temp;
        }
        const locations = createLocationsList(weatherData);
        const result = locations.map((location) => {
            let { name } = location;
            
            return ({...location, 
            temp : temperature[name]})}) 
        return result
    }, [weatherData]);

    return ( 
                <div className={classes.appContainer}>
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                    <main className={`${classes.app} ${!isWeatherLoading 
    && classes[ selectBackground( Object.keys(weatherData).length ? {
                                                                        sunrise : weatherData[currentLocation].list[0].sunrise,
                                                                        sunset : weatherData[currentLocation].list[0].sunset,
                                                                     } : null) ]}`}>
                        { (!isWeatherLoading && !Object.keys(weatherData).length) ?
                            (<ErrorBoundary>
                                <div className={classes.fallback}>
                                    <h2 className={classes.fallbackMessage}>Locations list is empty</h2>
                                </div>
                                <Dashboard list={[]} addLocation={addLocation} deleteLocation={deleteLocation} 
                                                                changeCurrentLocation={changeCurrentLocation} currentLocation='' />
                            </ErrorBoundary>) :
                            isWeatherLoading ? 
                                                <Spinner />
                                            :   <ErrorBoundary>
                                                    <Weather  data={ weatherData[currentLocation] } 
                                                                location={currentLocation} currentTime={currentTime} />
                                                    <Dashboard list={tempArray()} addLocation={addLocation} deleteLocation={deleteLocation} 
                                                                changeCurrentLocation={changeCurrentLocation} currentLocation={currentLocation} />
                                                </ErrorBoundary>                    
                        } 
                                            
                    </main>
                </div>
            
    )
}

export default App

