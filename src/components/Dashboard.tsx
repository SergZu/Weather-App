import React from 'react'
import { Location, WeatherApiResponse } from './App'
import classes from './Dashboard.module.css'
import LocationsMenu from './LocationsMenu'

export interface locationProps {
    list : Location[],
    addLocation : (locationWeather : WeatherApiResponse) => void,
    deleteLocation : (locationName : string) => void,
    changeCurrentLocation : (newLoc : string) => void;
    currentLocation : string;
}

const Dashboard = function Dashboard({list, addLocation, deleteLocation, changeCurrentLocation, currentLocation } : locationProps){
  
    return (
        <div className={classes.dashboardContainer}>
            <LocationsMenu list={list} addLocation={addLocation} deleteLocation={deleteLocation} changeCurrentLocation={changeCurrentLocation}
            currentLocation={currentLocation} /> 
        </div>
    )
}

export default Dashboard
