import React, { useContext, useState } from 'react'
import { getStorageData } from '../utils/getStorage'

export interface LocationProps {
    children : React.ReactNode
}

export type Location = {
    name : string;
    id : number
}

export type LocationContext = {
    locations : Location[]
}

const Context = React.createContext<LocationContext>({locations : []})

export const useLocation = () => {
    return useContext(Context);
}

const LocationsContext = ({children} : LocationProps) => {
    const [ data, setData] = useState(  getStorageData() );
    const contextValue = {locations : data.locations};
    return (
        <Context.Provider value={contextValue}>
           {children} 
        </Context.Provider>
    )
}

export default LocationsContext
