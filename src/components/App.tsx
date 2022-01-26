import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Weather from './Weather'
import Dashboard from './Dashboard'
import WeatherService from '../Api/WeatherService'
import useLoading from '../hooks/useLoading'
import Spinner from '../UI/spinner/Spinner'
import { getStorageData, setStorageData, StorageFuncTarget } from '../utils/storageUtils'
import classes from './App.module.css'
import Alert from '../UI/Alert/Alert'
import { selectBackground } from '../utils/selectBackground'

//ToDo
//Create dropbox with text UI component
//Create input UI component
//Refactor - create alert component for errors

export type Location = {
    name : string;
    lat : string;
    lon : string;
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
    city : {
        name : string
    }
}

export type WeatherDataObject = {
    [cityName : string] : WeatherApiResponse
}

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataObject>({});
    const [locations, setLocationsList] = useState<Location[]>([]);
    const [currentLocation, setCurrentLocation] = useState<number>(-1);

    const computeCurrentLocation = () => {
        const locationId = getStorageData(StorageFuncTarget.user) as number;
        setCurrentLocation(locationId)
    }


    const [fetchWeather, isWeatherLoading, errorWeather] = useLoading(async () => {
        
        const data = getStorageData(StorageFuncTarget.location) as Location[] ;
        if ( !data.length ) return;
        computeCurrentLocation();
        setLocationsList(data);

        let weather : WeatherDataObject = await WeatherService.getAllData(data) as WeatherDataObject;
        setWeatherData( weather );
    });
    

    useEffect(() => {
        fetchWeather();
    }, []);

    const resetAppData = () => {
        setLocationsList([]);
        setStorageData([], StorageFuncTarget.location);
        setStorageData(-1, StorageFuncTarget.user);
        setWeatherData({});
    }

    const getNewLocationData = useCallback((newData : WeatherApiResponse)  => { 
                setWeatherData( {...weatherData, [newData.city.name] : newData} );
            }, []);
    
    const changeCurrentLocation = useCallback((newId : number) : void => {
                setCurrentLocation(newId);
                setStorageData(newId, StorageFuncTarget.user);
        }, []);

    const addLocation = useCallback((location : Location) : boolean => {
            if (!locations.length) {
                setLocationsList([ location ]);
                setStorageData([ location ], StorageFuncTarget.location);
                setCurrentLocation(0);
                setStorageData(0, StorageFuncTarget.user);
            }
            if (locations.some((loc) => (loc.name === location.name) ) ) return false;
            const newData = [...locations, location];
            setLocationsList(newData);
            setStorageData(newData, StorageFuncTarget.location);
            return true
        }, []);

    const deleteLocation = useCallback((locationName : string) : void => {
        if (locations.length === 1) {
            resetAppData()
        }
        const index = locations.findIndex((item) => item.name === locationName);
        const newData = [...locations];
        newData.splice(index, 1);
        setLocationsList(newData);
        setStorageData(newData, StorageFuncTarget.location);
        if (currentLocation === index) {
            const newLocation = index !== 0 ? index - 1 : 0;
            setCurrentLocation(newLocation);
            setStorageData(newLocation, StorageFuncTarget.user);
        }
        const weatherCopy = {...weatherData};
        delete weatherCopy[locationName];
        setWeatherData(weatherCopy);
    }, []);
    

    const tempArray = useMemo(() => () => {
        let temperature = {};
        for (let location in weatherData) {
            const locationName = weatherData[location].city.name;
            temperature[locationName] = weatherData[location].list[0].main.temp;
        }
        const result = locations.map((location) => {
            let { name } = location;
            
            return ({...location, 
            temp : temperature[name]})}) 
        return result
    }, [weatherData, locations]);

    return ( 
                <div className={classes.appContainer}>
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                    <main className={`${classes.app} ${!isWeatherLoading 
    && classes[ selectBackground( locations.length ? weatherData[ locations[currentLocation].name ].list[0].weather.main : 'default') ]}`}>
                        { (!isWeatherLoading && locations.length === 0) ?
                            (<>
                                <div className={classes.fallback}>
                                    <h2 className={classes.fallbackMessage}>Locations list is empty</h2>
                                </div>
                                <Dashboard list={[]} addLocation={addLocation} deleteLocation={deleteLocation} 
                                                                changeCurrentLocation={changeCurrentLocation} getNewLocationData={getNewLocationData} />
                            </>) :
                            isWeatherLoading ? 
                                                <Spinner />
                                            :   <>
                                                    <Weather  data={ weatherData[locations[currentLocation].name] } 
                                                                location={locations[currentLocation].name} />
                                                    <Dashboard list={tempArray()} addLocation={addLocation} deleteLocation={deleteLocation} 
                                                                changeCurrentLocation={changeCurrentLocation} getNewLocationData={getNewLocationData} />
                                                </>                    
                        } 
                                            
                    </main>
                </div>
            
    )
}

export default App

