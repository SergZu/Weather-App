import { Location } from "../components/App"


export const setStorageData = function(data : Location[]) : void {
    const storageData = JSON.stringify(data);
    localStorage.setItem('__WeatherUserLocations', storageData);
}

export const getStorageData = function() : Location[] {
    const storageData = localStorage.getItem('__WeatherUserLocations');
    const initValue : Location[] = [{name : 'Mars', lat : '0', lon : '0', notEarth : true}]
    
    if (storageData === null) {
        setStorageData(initValue);
        return initValue
    }
    return JSON.parse(storageData)
}
