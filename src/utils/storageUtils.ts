import { Location } from "../components/App"

const UserLocationsStorageKey = '__WeatherUserLocations';
const CurrentLocationStorageKey = '__WeatherAppCurrentUser';

export enum StorageFuncTarget { 
    location = "Location",
    current = "CurrentLoc"
}

export const setStorageData = function(data : Location[] | string, target : StorageFuncTarget) : void {
    let storageData = JSON.stringify(data);
    if (target === StorageFuncTarget.location) localStorage.setItem(UserLocationsStorageKey , storageData);
    if (target === StorageFuncTarget.current) localStorage.setItem(CurrentLocationStorageKey , storageData);
}

export const getStorageData = function(target : StorageFuncTarget) : Location[] | string{
    let storageData;
    let initValue : Location[] | string;
    if (target === StorageFuncTarget.location) {
        storageData = localStorage.getItem(UserLocationsStorageKey);
        initValue  = [];
    }
    if (target === StorageFuncTarget.current) {
        storageData = localStorage.getItem(CurrentLocationStorageKey);
        initValue  = '';
    }
        
    
    if (storageData === null) { 
        setStorageData(JSON.stringify(initValue), target);
        return initValue
    }
    return JSON.parse(storageData)
}

