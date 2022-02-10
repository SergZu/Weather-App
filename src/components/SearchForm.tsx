import React, {useRef, useState} from 'react'
import WeatherService from '../Api/WeatherService';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';
import { WeatherApiResponse } from './App';
import { GeocodingApiObj } from './SearchModal';
import classes from './SearchForm.module.css'
import useLoading from '../hooks/useLoading';
import Spinner from '../UI/spinner/Spinner';

export interface SearchFormProps{
    addLocation : (locationWeather : WeatherApiResponse) => void;
    closeModal : () => void;
}

const SearchForm = ({addLocation, closeModal} : SearchFormProps) => {
    const [responseData, setResponseData] = useState<GeocodingApiObj[]|null>(null);
    const searchInput = useRef(null);

    let [fetchLocation, isLocationsLoading, errorLocation] = useLoading(async (value) => {
        if (value !== null) {
            const data : GeocodingApiObj[]|null = await WeatherService.getDataByName({name : value}) as GeocodingApiObj[]|null;
            setResponseData(data);
        }
    })

    const searchLocation = async (evt) => {
        evt.preventDefault();
        evt.currentTarget.blur();
        const value = searchInput.current.value;
        await fetchLocation(value)
        
    }
    const addNewLocationData = async (data) => {
        const newData = {
            name : data.name,
            lat : data.lat,
            lon : data.lon
        }
        const weatherData = await WeatherService.getLocationData(newData) as WeatherApiResponse;  
        addLocation(weatherData);
        closeModal();
    }

    const responseLayout = responseData?.map((data) => (
        <li key={`${data.name}${data.lat}` } className={classes['locationSearch-ListItem']}>
            <h3 className={classes['locationSearch-LocationName']}>{`Name : ${data.name}`}</h3>
            <span className={classes['locationSearch-LocationCountry']}>{`Country : ${data.country}`}</span>
            <span className={classes['locationSearch-LocationCoords']}>{`Lat = ${data.lat.toFixed(2)} Lon = ${(data.lon.toFixed(2))}`}</span>
            <SimpleBtn onclickHandler={(evt) => {
                evt.stopPropagation();
                addNewLocationData(data);
                } }>
                    Add
            </SimpleBtn>
        </li>
    ))
    
    let isEmpty = responseData !== null && !responseData.length;

    return (
        <div className={classes.searchContainer}>
           <form className={classes.locationSearch}>
                <input ref={searchInput} className={classes['locationSearch-Input']} />
                <button onClick={searchLocation} className={classes['locationSearch-Btn']}>Search</button>   
            </form>
            <>
                {errorLocation && (<h3 className={classes.textCenter}>{errorLocation}</h3>)}
                {isLocationsLoading ?
                    <Spinner classname={'inset'} /> :
                    !isEmpty ? (<ul className={classes['locationSearch-List']}>{responseLayout}</ul>) :
                        <h3 className={classes.searchFallback}>Not found</h3>
                }
            </> 
        </div>
    )
}

export default SearchForm
