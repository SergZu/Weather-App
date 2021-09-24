import React, { useContext } from 'react'

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
    const data = ['Omsk', 'Moscow', 'London', 'Mars']; 

    return (
        <Context.Provider value={{locations : data}}>
           {children} 
        </Context.Provider>
    )
}

export default LocationsContext
