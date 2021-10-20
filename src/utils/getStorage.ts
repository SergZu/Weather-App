import { LocationContext } from "../components/LocationsContext"


export const setStorageData = function(data : LocationContext) : void {
    const storageData = JSON.stringify(data);
    localStorage.setItem('__WeatherUserLocations', storageData);
}

export const getStorageData = function() : LocationContext {
    const storageData = localStorage.getItem('__WeatherUserLocations');
    console.log('get')
    if (storageData === null) {
        setStorageData({
            locations : ['Mars']
        })
        return {
            locations : ['Mars']
        }
    }
    return JSON.parse(storageData)
}
