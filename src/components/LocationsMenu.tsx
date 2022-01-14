import React, { useMemo, useState } from 'react'
import classes from './LocationsMenu.module.css'
import { Location } from './App'
import SearchModal from './SearchModal';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';
import { WeatherApiResponse } from './App';

export interface LocationMenuProps {
    list : Location[],
    addLocation : (location : Location) => boolean,
    deleteLocation : (locationName : string) => void,
    getNewLocationData:(data : WeatherApiResponse) => void;
    changeCurrentLocation: (newId : number) => void;
}

const LocationsMenu = ({list, addLocation, deleteLocation, getNewLocationData, changeCurrentLocation} : LocationMenuProps) => {
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

    const changeLocation= (evt : React.MouseEvent<HTMLLIElement>) : void => {
        const target = evt.currentTarget.dataset.id;
        changeCurrentLocation( Number(target) );
    }


    const createLocationsLayout = useMemo(() => (list : Location[]) =>
        list?.map((elem, indx) => 
            (<li key={`${elem.name + elem.lon + elem.lat}`} className={classes.locationElement} data-id={indx} onClick={changeLocation}>
                <span>{`${elem.name} - ${elem.temp ? elem.temp  : 'N/A'}`}{elem.temp && <>&deg;</>}</span>
                <SimpleBtn className={'small'} hidden={!deleteMode} onclickHandler={() => {
                    deleteLocation(elem.name)
                    } 
                }>-</SimpleBtn>
            </li>))
            , [list, deleteMode]) 
   
    return (
        <div className={classes.locationsBoard}>            
            {isModalOpen && (<SearchModal closeModal={closeModal} addLocation={addLocation} getNewLocationData={getNewLocationData} />)}
            <ul className={classes.locationList}>
            {createLocationsLayout(list)}
            </ul>
            <div className={classes.btnBlock}>
                <SimpleBtn hidden={false} onclickHandler={openModal} >&#43;</SimpleBtn>
                <SimpleBtn hidden={false} onclickHandler={toggleDelete}>&#10007;</SimpleBtn>
            </div>
        </div>
    )
}

export default LocationsMenu
