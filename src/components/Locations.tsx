import React from 'react'
import { useLocation } from './LocationsContex'

const Locations = () => {
    const data = useLocation();
    return (
        <div>
           {data.locations.map((elem) => (<h4>{elem}</h4>))} 
        </div>
    )
}

export default Locations
