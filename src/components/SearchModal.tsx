import React, { useState } from 'react'
import classes from './SearchModal.module.css'
import { WeatherApiResponse } from './App'
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn'
import SearchForm from './SearchForm'
import Alert from '../UI/Alert/Alert'

export interface SearchModalProps{
    closeModal : () => void;
    addLocation : (locationWeather : WeatherApiResponse) => void,
    changeCurrentLocation : (newLoc : string) => void;
}


const SearchModal = ({closeModal, addLocation}) => {
    const [ geoError, setGeoError ] = useState(null);
    const [ geoPositionInProgress, setGeoPositionInProgress] = useState(false);

    const onGeoClickHandler = () => {
        console.log('Geo clicked')
        // if (geoPositionInProgress) return

        // setGeoPositionInProgress(true);

        // if (navigator.geolocation) {

        //     const onSuccess = ({coords}) => {
        //         const loc = {
        //             name : 'My last location',
        //             lat : coords.latitude,
        //             lon : coords.longitude
        //         };
        //         addLocation(loc);
        //         getNewLocationData(loc, true)
        //         setGeoError(null);
        //         setGeoPositionInProgress(false);
        //     }

        //     const onError = (error) => {
        //         setGeoError(error.message);
        //         setGeoPositionInProgress(false);
        //     }
        //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // }

        
    }

    return (
        <div className={classes.modal}>
            {geoError && <Alert text={geoError} />}
            <div>
                <button onClick={onGeoClickHandler}>Get My Position</button>
                <SearchForm addLocation={addLocation} />
            </div>
            <SimpleBtn className={classes.closeBtn} onclickHandler={closeModal}>&#10008;</SimpleBtn>
        </div>
    )
}

export default SearchModal
