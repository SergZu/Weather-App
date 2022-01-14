import React from 'react'
import { Location, WeatherApiResponse } from './App'
import classes from './Dashboard.module.css'
import LocationsMenu from './LocationsMenu'

export interface locationProps {
    list : Location[],
    addLocation : (location : Location) => boolean,
    deleteLocation : (locationName : string) => void,
    getNewLocationData: (data : WeatherApiResponse) => void;
    changeCurrentLocation : (newId : number) => void;
}

const Dashboard = React.memo(function Dashboard({list, addLocation, deleteLocation, getNewLocationData,changeCurrentLocation } : locationProps) {
  
    return (
        <div className={classes.dashboardContainer}>
            <LocationsMenu list={list} addLocation={addLocation} deleteLocation={deleteLocation} getNewLocationData={getNewLocationData}
                changeCurrentLocation={changeCurrentLocation} /> 
        </div>
    )
})

export default Dashboard
