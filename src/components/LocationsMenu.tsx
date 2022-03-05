import React, { useMemo, useState } from 'react'
import classes from './LocationsMenu.module.css'
import { Location } from './App'
import SearchModal from './SearchModal';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';
import { WeatherApiResponse } from './App';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface LocationMenuProps {
    list : Location[],
    addLocation : (locationWeather : WeatherApiResponse) => void,
    deleteLocation : (locationName : string) => void,
    changeCurrentLocation : (newLoc : string) => void;
    currentLocation : string;
}

const LocationsMenu = ({
                        list, 
                        addLocation, 
                        deleteLocation, 
                        changeCurrentLocation, 
                        currentLocation
                       } : LocationMenuProps) => {
    const [isModalOpen, toggleModal] = useState(false);
    const [deleteMode, toggleDeleteMode] = useState(false);

    const openModal = () => {
        if (isModalOpen) return ;
        toggleModal(true);
    }

    const closeModal = () => {
        if (!isModalOpen) return ;
        toggleModal(false);
    }

    const toggleDelete = () => {
        toggleDeleteMode(() => !deleteMode)
    }

    const changeLocation = (evt : React.MouseEvent<HTMLLIElement>) : void => {
        evt.currentTarget.blur();
        const target = evt.currentTarget.dataset.id;
        changeCurrentLocation( target );
    }

    const onKeyPressHandler = (evt : React.KeyboardEvent<HTMLLIElement>) => {
        if (evt.key === 'Enter') {
            const target = evt.currentTarget.dataset.id;
            changeCurrentLocation( target );
        }
    }              
   
    return (
        <div className={classes.locationsBoard}>            
            {isModalOpen && (<SearchModal 
                                closeModal={closeModal} 
                                addLocation={addLocation} 
                             /> )
            }
            <ul className={classes.locationList}>
                <TransitionGroup >
                    {
                        list?.map((elem) => 
                        (<CSSTransition 
                            key={`${elem.name + elem.lon + elem.lat}`}
                            timeout={500}
                            classNames={{
                                enter: classes.locationItemEnter,
                                enterActive: classes.locationItemEnterActive,
                                exit: classes.locationItemExit,
                                exitActive: classes.locationItemExitActive
                              }}
                        >
                            <li  
                                className={`${classes.locationElement} ${currentLocation === elem.name ? classes.active : '' }`} 
                                data-id={elem.name} 
                                onClick={changeLocation} 
                                tabIndex={0} 
                                onKeyPress={onKeyPressHandler}
                            >
                                <span>
                                    {`${elem.name} : ${elem.temp !== undefined ? elem.temp  : 'N/A'}`}
                                    {(elem.temp !== undefined) && (<>&deg;</>)}
                                </span>
                                <SimpleBtn 
                                            className={'small'} 
                                            hidden={!deleteMode} 
                                            onclickHandler={(evt) => {
                                                    evt.stopPropagation();
                                                    deleteLocation(elem.name);
                                                    } 
                                            }>
                                    &minus;
                                </SimpleBtn>
                            </li>
                        </CSSTransition>))
                    }
                </TransitionGroup>
            </ul>
            <div className={classes.btnBlock}>
                <SimpleBtn 
                            hidden={false} 
                            onclickHandler={openModal} 
                >
                    &#43;
                </SimpleBtn>
                <SimpleBtn 
                            hidden={false} 
                            onclickHandler={toggleDelete}
                >
                    &#10007;
                </SimpleBtn>
            </div>
        </div>
    )
}

export default LocationsMenu
