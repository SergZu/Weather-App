import React from 'react'
import Forecast from './Forecast'
import Locations from './Locations'
import LocationsContext from './LocationsContext'
import Weather from './Weather'

const App = () => {
    return (
        <LocationsContext>
            <main>
                <Locations />
                <Weather />
                <Forecast />
            </main>
        </LocationsContext>
    )
}

export default App

