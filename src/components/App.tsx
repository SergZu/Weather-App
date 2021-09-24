import React from 'react'
import Forecast from './Forecast'
import Locations from './Locations'
import LocationsContext from './LocationsContex'
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

