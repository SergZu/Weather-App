import React from 'react'
import { Location } from './App'
import classes from './Dashboard.module.css'
import LocationsMenu from './LocationsMenu'
import { WeatherApiResponse } from './Weather'
import WeatherDetails from './WeatherDetails'

export interface locationProps {
    list : Location[],
    addLocation : (location : Location) => boolean,
    deleteLocation : (locationName : string) => void,
    weatherData : WeatherApiResponse,
    getNewLocationData: (data : WeatherApiResponse) => void;
    changeCurrentLocation : (newId : number) => void;
}

const Dashboard = React.memo(function Dashboard({list, addLocation, deleteLocation, weatherData, getNewLocationData,changeCurrentLocation } : locationProps) {
  
    return (
        <div className={classes.dashboardContainer}>
            <LocationsMenu list={list} addLocation={addLocation} deleteLocation={deleteLocation} getNewLocationData={getNewLocationData}
                changeCurrentLocation={changeCurrentLocation} />
            <WeatherDetails weatherData={weatherData} />  
        </div>
    )
})

export default Dashboard
