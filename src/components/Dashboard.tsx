import React, { ReactNode, useEffect, useState } from 'react'

export type Location = {
    name : string;
    lat : string;
    lon : string;
    notEarth? : boolean
}


interface locationProps {
    list : Location[],
    addLocation : (location : Location) => void,
    deleteLocation : (locationName : string) => void
}

const Dashboard = ({list, addLocation, deleteLocation} : locationProps) => {

   const locationsLayout = list ? list.map((elem) => (<h4 key={`${elem.name + elem.lon + elem.lat}`}>{elem.name}</h4>)) : null;
    
        
    return (
        <div>
         {locationsLayout}   
        </div>
    )
}

export default Dashboard
