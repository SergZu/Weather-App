import React from 'react'
import { useLocation } from './LocationsContext'

const Locations = () => {
    const data = useLocation();

    const locationsLayout = data.locations.map((elem) => (<h4 key={elem.id}>{elem.name}</h4>));
        
    return (
        <div>
         {locationsLayout}    
        </div>
    )
}

export default Locations
