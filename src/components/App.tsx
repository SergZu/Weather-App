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

export type WeatherType = {
    dt : number,
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
    }
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
        let weather : WeatherDataObject = await WeatherService.getAllData() as WeatherDataObject;
        setWeatherData( weather );
    });

    const [fetchLocation, isLocationsLoading, errorLoc] = useLoading( async () => {
        const data = getStorageData(StorageFuncTarget.location) as Location[] ;
        computeCurrentLocation();
        setLocationsList(data);
    });
    

    useEffect(() => {
        fetchLocation();
        fetchWeather();
    }, []);

    const getNewLocationData = (newData : WeatherApiResponse)  => { 
            setWeatherData( {...weatherData, [newData.city.name] : newData} );
    }
    
    const changeCurrentLocation = (newId : number) : void => {
        setCurrentLocation(newId);
        setStorageData(newId, StorageFuncTarget.user);
    }

    const addLocation = (location : Location) : boolean => {
        if (locations.some((loc) => (loc.name === location.name && loc.lat === location.lat && loc.lon === location.lon) ) ) return false;
        const newData = [...locations, location];
        setLocationsList(newData);
        setStorageData(newData, StorageFuncTarget.location);
        return true
    }

    const deleteLocation = (locationName : string) : void => {
        const newData = locations.filter((item) => item.name !== locationName);
        setLocationsList(newData);
        setStorageData(newData, StorageFuncTarget.location);
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
            let { name } = location;
            
            return ({...location, 
            temp : temperature[name]})}) 
        return result
    }, [weatherData, locations]);

   
    const location = currentLocation !== -1 ? locations[currentLocation].name : '';
    const loadingCondition = isWeatherLoading || isLocationsLoading || currentLocation === -1 || weatherData?.Mars === null;

    return (
                <div className={classes.appContainer}>
                        {errorLoc ? (<Alert text={errorLoc} />) : null}
                        {errorWeather ? (<Alert text={errorWeather} />) : null}
                    <main className={`${classes.app} ${!loadingCondition 
    && classes[ selectBackground( weatherData[ location ].list[0].weather.main , locations[currentLocation].notEarth ) ]}`}>
                         { loadingCondition ? 
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

