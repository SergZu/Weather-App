import { LocationData } from "../components/LocationsContext"


export const setStorageData = function(data : LocationData) : void {
    const storageData = JSON.stringify(data);
    localStorage.setItem('__WeatherUserLocations', storageData);
}

export const getStorageData = function() : LocationData {
    const storageData = localStorage.getItem('__WeatherUserLocations');
    const initValue : LocationData = {
        locations : [{name : 'Mars', id : 1}]
    }
    if (storageData === null) {
        setStorageData(initValue);
        return initValue
    }
    return JSON.parse(storageData)
}
