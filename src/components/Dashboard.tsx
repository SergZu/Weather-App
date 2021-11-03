import React, { ReactNode, useEffect, useMemo, useState } from 'react'

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

    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem) => (<h4 key={`${elem.name + elem.lon + elem.lat}`}>{elem.name}</h4>)), [list]) 
   
    
        
    return (
        <div>
         {createLocationsLayout(list)}   
        </div>
    )
}

export default Dashboard
