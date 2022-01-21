import { Location } from "../components/App"

const UserLocationsStorageKey = '__WeatherUserLocations';
const CurrentUserStorageKey = '__WeatherAppCurrentUser';

export enum StorageFuncTarget { 
    location = "Location",
    user = "User"
}

export const setStorageData = function(data : Location[] | number, target : StorageFuncTarget) : void {
    let storageData = JSON.stringify(data);
    if (target === StorageFuncTarget.location) localStorage.setItem(UserLocationsStorageKey , storageData);
    if (target === StorageFuncTarget.user) localStorage.setItem(CurrentUserStorageKey , storageData);
}

export const getStorageData = function(target : StorageFuncTarget) : Location[] | number{
    let storageData;
    let initValue : Location[] | number;
    if (target === StorageFuncTarget.location) {
        storageData = localStorage.getItem(UserLocationsStorageKey);
        initValue  = [];
    }
    if (target === StorageFuncTarget.user) {
        storageData = localStorage.getItem(CurrentUserStorageKey);
        initValue  = 0;
    }
        
    
    if (storageData === null) { 
        setStorageData(initValue, target);
        return initValue
    }
    return JSON.parse(storageData)
}

