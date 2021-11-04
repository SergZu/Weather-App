import React, { useMemo, useState } from 'react'
import classes from './LocationsMenu.module.css'
import { Location } from './App'
import SearchModal from './SearchModal';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';

export interface LocationMenuProps {
    list : Location[],
    addLocation : (location : Location) => void,
    deleteLocation : (locationName : string) => void
}

const LocationsMenu = ({list, addLocation, deleteLocation} : LocationMenuProps) => {
    const [isModalOpen, toggleModal] = useState(false);

    const openModal = () => {
        if (isModalOpen) return ;
        toggleModal(true);
        console.log('opened')
    }

    const closeModal = () => {
        if (!isModalOpen) return ;
        toggleModal(false);
        console.log('closed')
    }

    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem) => (<li key={`${elem.name + elem.lon + elem.lat}`} className={classes.locationElement}>{elem.name}</li>)), [list]) 
   
    return (
        <div className={classes.locationsBoard}>            
            {isModalOpen && (<SearchModal closeModal={closeModal} addLocation={addLocation} />)}
            <ul className={classes.locationList}>
            {createLocationsLayout(list)}
            </ul>
            <SimpleBtn onclickHandler={openModal} >&#43;</SimpleBtn>
        </div>
    )
}

export default LocationsMenu
