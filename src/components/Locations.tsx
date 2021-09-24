import React, { useState } from 'react'
import { setStorageData } from '../utils/getStorage';
import { useLocation } from './LocationsContext'

const Locations = () => {
    const [data, setData] = useState(() => useLocation());
    return (
        <div>
           {data.locations.map((elem) => (<h4>{elem}</h4>))}
           <button onClick={ (e) => {
               const newData = { 
                    locations : [...data.locations, 'Omsk'] 
                    }; 
                setStorageData(newData);
                setData(newData);
                }       
            } >Add</button>   
        </div>
    )
}

export default Locations
