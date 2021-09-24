import React from 'react'
import Forecast from './Forecast'
import Locations from './Locations'
import Weather from './Weather'

const App = () => {
    return (
        <main>
            <Locations />
            <Weather />
            <Forecast />
        </main>
    )
}

export default App

