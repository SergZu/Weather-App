import { LocationContext } from "../components/LocationsContext"


export const setStorageData = function(data : LocationContext) : void {
    const storageData = JSON.stringify(data);
    localStorage.setItem('__WeatherUserLocations', storageData);
}

export const getStorageData = function() : LocationContext {
    const storageData = localStorage.getItem('__WeatherUserLocations');
    console.log(storageData)
    if (storageData === null) {
        setStorageData({
            locations : [{name : 'Mars', id : 1}]
        });
        return {
            locations : [{name : 'Mars', id : 1}]
        }
    }
    return JSON.parse(storageData)
}
