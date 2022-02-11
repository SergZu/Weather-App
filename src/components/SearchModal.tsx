import React, { useEffect, useRef, useState } from 'react'
import classes from './SearchModal.module.css'
import { WeatherApiResponse } from './App'
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn'
import SearchForm from './SearchForm'
import Alert from '../UI/Alert/Alert'
import WeatherService from '../Api/WeatherService'

export interface SearchModalProps{
    closeModal : () => void;
    addLocation : (locationWeather : WeatherApiResponse) => void;
    changeCurrentLocation : (newLoc : string) => void;
}

export type GeocodingApiObj = {
    country : string;
    lat: number;
    local_names: {[inx : string] : string};
    lon: number;
    name: string;
    state: string;
}

const SearchModal = ({closeModal, addLocation}) => {
    const [ geoError, setGeoError ] = useState(null);
    const [ geoPositionInProgress, setGeoPositionInProgress] = useState(false);
    const  abortController = useRef(null);

    useEffect(() => {
      const controller = new AbortController();
      abortController.current = controller.signal;
    
      return () => {
        controller.abort()
      };
    }, []);
    

    const onGeoClickHandler = () => {
         if (geoPositionInProgress) return

        setGeoPositionInProgress(true);

        if (navigator.geolocation) {

             const onSuccess = async ({coords}) => {
                const loc = {
                    lat : coords.latitude,
                    lon : coords.longitude
                };
                const newLoc = await WeatherService.getDataByCoords(loc, { signal : abortController.current}) as GeocodingApiObj[];
                const newData = {
                    name : newLoc[0].name,
                    lat : newLoc[0].lat,
                    lon : newLoc[0].lon
                }
                const weatherData = await WeatherService.getLocationData(newData, { signal : abortController.current}) as WeatherApiResponse;
                addLocation(weatherData);
                setGeoError(null);
                setGeoPositionInProgress(false);
                closeModal();
            }

            const onError = (error) => {
                setGeoError(error.message);
                setGeoPositionInProgress(false);
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

        
    }

    const offclickHandler = (evt) => {
        if (evt.target.closest(`.${classes.searchForm}`) === null){
            closeModal()
        }
    }

    return (
        <div className={classes.modal} onClick={offclickHandler} >
            {geoError && <Alert text={geoError} />}
                <div className={classes.searchForm}>
                <div className={classes.searchContainer}>
                    <button className={classes.geoBtn} onClick={onGeoClickHandler}>Use my geoposition</button>
                    <SearchForm addLocation={addLocation} closeModal={closeModal} />
                </div>
                <SimpleBtn className={'closeBtn'} onclickHandler={closeModal}>&#10008;</SimpleBtn>
            </div>
            
        </div>
    )
}

export default SearchModal
