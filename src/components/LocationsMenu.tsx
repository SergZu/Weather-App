import React, { useMemo } from 'react'
import { Location } from './App'

export interface LocationMenuProps {
    list : Location[],
    addLocation : (location : Location) => void,
    deleteLocation : (locationName : string) => void
}

const LocationsMenu = ({list, addLocation, deleteLocation} : LocationMenuProps) => {
    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem) => (<h4 key={`${elem.name + elem.lon + elem.lat}`}>{elem.name}</h4>)), [list]) 
   
    return (
        <div>
            {createLocationsLayout(list)} 
        </div>
    )
}

export default LocationsMenu
