import React, { useContext } from 'react'
import { getStorageData } from '../utils/getStorage'

export type LocationProps = {
    children : React.ReactNode
}

export type LocationContext = {
    locations : string[]
}

const Context = React.createContext<LocationContext>({locations : []})

export const useLocation = () => {
    return useContext(Context);
}

const LocationsContext = ({children} : LocationProps) => {
    const data = getStorageData(); 
    const contextValue = {locations : data.locations};
    return (
        <Context.Provider value={contextValue}>
           {children} 
        </Context.Provider>
    )
}

export default LocationsContext
