import React from 'react'
import { Location } from './App'
import classes from './Dashboard.module.css'
import LocationsMenu from './LocationsMenu'
import { WeatherApiResponse } from './Weather'
import WeatherDetails from './WeatherDetails'

export interface locationProps {
    list : Location[],
    addLocation : (location : Location) => void,
    deleteLocation : (locationName : string) => void,
    weatherData : WeatherApiResponse
}

const Dashboard = React.memo(function Dashboard({list, addLocation, deleteLocation, weatherData} : locationProps) {
  
    return (
        <div className={classes.dashboardContainer}>
            <LocationsMenu list={list} addLocation={addLocation} deleteLocation={deleteLocation} />
            <WeatherDetails weatherData={weatherData} />  
        </div>
    )
})

export default Dashboard
