import React, { useContext, useState } from 'react'
import { getStorageData, setStorageData } from '../utils/useStorage'

export interface LocationProps {
    children : React.ReactNode
}

export type Location = {
    name : string;
    id : number
}

export type LocationData = {
    locations : Location[]
}

export type LocationContext = {
    locations : Location[],
    addData : (name : string) => void,
    deleteData : (name : string) => void
}

const Context = React.createContext<LocationContext|null>(null)

export const useLocation = () => {
    return useContext(Context);
}

const LocationsContext = ({children} : LocationProps) => {
    const [ data, setData] = useState<LocationData>(  getStorageData() );
    const [ lastID, incLastID] = useState( [...data.locations].sort((a,b) => a.id - b.id )[data.locations.length - 1].id );

    const getNewID = () => {
        const newId = lastID;
        incLastID((n) => n+1);
        return newId
    }

    const addLocation = (locationName : string) : void => {
        const newValue : Location = {
            name : locationName,
            id : getNewID()
        };
        const newData = {
            locations : [...data.locations, newValue]
        };
        setData(newData);
        setStorageData(newData);
    }

    const deleteLocation = (locationName : string) : void => {
        const newData = {
            locations : data.locations.filter((item) => item.name !== locationName)
        };
        setData(newData);
        setStorageData(newData);
    }

    const contextValue : LocationContext = {
        locations : data.locations,
        addData : addLocation,
        deleteData : deleteLocation
    }

    return (
        <Context.Provider value={contextValue}>
           {children} 
        </Context.Provider>
    )
}

export default LocationsContext
