import React, { useEffect, useState } from 'react'

export type Location = {
    name : string;
    lat : string;
    lon : string;
    notEarth? : boolean
}


interface locationProps {
    list : Location[]
}

const Locations = ({list}) => {

   const locationsLayout = list ? list.map((elem) => (<h4 key={`${elem.name + elem.lon + elem.lat}`}>{elem.name}</h4>)) : null;
    
        
    return (
        <div>
         {locationsLayout}   
        </div>
    )
}

export default Locations
