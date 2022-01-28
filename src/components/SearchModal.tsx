import React, { useState } from 'react'
import classes from './SearchModal.module.css'
import { WeatherApiResponse } from './App'
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn'
import SearchForm from './SearchForm'
import Alert from '../UI/Alert/Alert'
import WeatherService from '../Api/WeatherService'

export interface SearchModalProps{
    closeModal : () => void;
    addLocation : (locationWeather : WeatherApiResponse) => void,
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

    const onGeoClickHandler = () => {
         if (geoPositionInProgress) return

        setGeoPositionInProgress(true);

        if (navigator.geolocation) {

             const onSuccess = async ({coords}) => {
                const loc = {
                    lat : coords.latitude,
                    lon : coords.longitude
                };
                const newLoc = await WeatherService.getDataByCoords(loc) as GeocodingApiObj[];
                console.log(newLoc);
                const newData = {
                    name : newLoc[0].name,
                    lat : newLoc[0].lat,
                    lon : newLoc[0].lon
                }
                const weatherData = await WeatherService.getLocationData(newData) as WeatherApiResponse;
                addLocation(weatherData);
                setGeoError(null);
                setGeoPositionInProgress(false);
            }

            const onError = (error) => {
                setGeoError(error.message);
                setGeoPositionInProgress(false);
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

        
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
