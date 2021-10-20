import React, { useEffect, useState } from 'react'
import { getStorageData, setStorageData } from '../utils/getStorage';
import { useLocation } from './LocationsContext'

const Locations = () => {
    const data = useLocation();

    console.log(data)
    const locationsLayout = data.locations.map((elem) => (<h4 key={elem.id}>{elem.name}</h4>));
        
    return (
        <div>
         {locationsLayout}    
        </div>
    )
}

export default Locations
