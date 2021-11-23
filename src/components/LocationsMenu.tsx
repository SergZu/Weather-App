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
    const [deleteMode, toggleDeleteMode] = useState(false);

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

    const toggleDelete = () => {
        toggleDeleteMode(() => !deleteMode)
    }


    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem) => 
            (<li key={`${elem.name + elem.lon + elem.lat}`} className={classes.locationElement}>
                <span>{`${elem.name} - ${elem.temp ? elem.temp  : 'N/A'}`}{elem.temp && <>&deg;</>}</span>
                {deleteMode && <SimpleBtn className={'small'} onclickHandler={() => {
                    deleteLocation(elem.name)
                    } 
                }>-</SimpleBtn>}
            </li>))
            , [list, deleteMode]) 
   
    return (
        <div className={classes.locationsBoard}>            
            {isModalOpen && (<SearchModal closeModal={closeModal} addLocation={addLocation} />)}
            <ul className={classes.locationList}>
            {createLocationsLayout(list)}
            </ul>
            <div className={classes.btnBlock}>
                <SimpleBtn onclickHandler={openModal} >&#43;</SimpleBtn>
                <SimpleBtn onclickHandler={toggleDelete}>&#10007;</SimpleBtn>
            </div>
        </div>
    )
}

export default LocationsMenu
