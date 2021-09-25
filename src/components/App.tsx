import React from 'react'
import Forecast from './Forecast'
import Locations from './Locations'
import LocationsContext from './LocationsContext'
import Weather from './Weather'
import WeatherContext from './WeatherContext'

const App = () => {
    return (
        <LocationsContext>
            <WeatherContext>
                <main>
                    <Locations />
                    <Weather />
                    <Forecast />
                </main>
            </WeatherContext>
        </LocationsContext>
    )
}

export default App

