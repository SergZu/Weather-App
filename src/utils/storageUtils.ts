import { Location } from "../components/App"

const UserLocationsStorageKey = '__WeatherUserLocations';
const CurrentUserStorageKey = '__WeatherAppCurrentUser';

type StorageFuncTarget = 'location' | 'user';

export const setStorageData = function(data : Location[] | number, target : StorageFuncTarget) : void {
    let storageData = JSON.stringify(data);
    if (target === 'location') localStorage.setItem(UserLocationsStorageKey , storageData);
    if (target === 'user') localStorage.setItem(CurrentUserStorageKey , storageData);
}

export const getStorageData = function(target : StorageFuncTarget) : Location[] | number {
    let storageData;
    let initValue : Location[] | number;
    if (target === 'location') {
        storageData = localStorage.getItem(UserLocationsStorageKey);
        initValue  = [{name : 'Mars', lat : '0', lon : '0', notEarth : true}];
    }
    if (target === 'user') {
        storageData = localStorage.getItem(CurrentUserStorageKey);
        initValue  = 0;
    }
        
    
    if (storageData === null) { 
        setStorageData(initValue, target);
        return initValue
    }
    return JSON.parse(storageData)
}

