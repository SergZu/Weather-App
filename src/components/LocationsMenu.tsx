import React, { useMemo } from 'react'
import classes from './LocationsMenu.module.css'
import { Location } from './App'

export interface LocationMenuProps {
    list : Location[],
    addLocation : (location : Location) => void,
    deleteLocation : (locationName : string) => void
}

const LocationsMenu = ({list, addLocation, deleteLocation} : LocationMenuProps) => {
    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem) => (<li key={`${elem.name + elem.lon + elem.lat}`} className={classes.locationElement}>{elem.name}</li>)), [list]) 
   
    return (
        <div className={classes.locationsBoard}>
            <ul className={classes.locationList}>
            {createLocationsLayout(list)}
            </ul>
            <button className={classes.locationAddBtn}>
                +    
            </button> 
        </div>
    )
}

export default LocationsMenu
