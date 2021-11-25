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

const compareLocations = (arr : Location[], locB : Location) : boolean => {
    return arr.some((loc) => (loc.name === locB.name && loc.lat === locB.lat && loc.lon === locB.lon))    
}

export const setLocationAlias = function(data : Location) {
    const storageData = JSON.parse(localStorage.getItem('__UserLocationsAlias') );

    if (storageData === null) {
        const value = JSON.stringify([data])
        localStorage.setItem('__UserLocationsAlias', value)
    }

    if ( compareLocations(storageData, data) ) return
    
    let newData = [...storageData, data];
    const storageStr = JSON.stringify(newData);
    localStorage.setItem('__UserLocationsAlias', storageStr);
} 

export const getLocationAlias = function({lat, lon}) : string {
    const storageData = localStorage.getItem('__UserLocationsAlias');
    const value = JSON.parse(storageData);
    const name = value.find((item) => (item.lat === lat && item.lon === lon));
    return name.name
}