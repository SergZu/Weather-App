import React, { useContext, useState } from 'react'
import { getStorageData, setStorageData } from '../utils/getStorage'

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
    addData : (name : Location) => void,
    deleteData : (name : Location) => void
}

const Context = React.createContext<LocationContext|null>(null)

export const useLocation = () => {
    return useContext(Context);
}

const LocationsContext = ({children} : LocationProps) => {
    const [ data, setData] = useState<LocationData>(  getStorageData() );

    const addLocation = (location : Location) : void => {
        const newData = {
            locations : [...data.locations, location]
        };
        setData(newData);
        setStorageData(newData);
    }

    const deleteLocation = (location : Location) : void => {
        const newData = {
            locations : data.locations.filter((item) => item.name !== location.name)
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
