import React, {useRef, useState} from 'react'
import WeatherService from '../Api/WeatherService';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';
import { WeatherApiResponse } from './App';
import { GeocodingApiObj } from './SearchModal';

export interface SearchFormProps{
    addLocation : (locationWeather : WeatherApiResponse) => void
}

const SearchForm = ({addLocation} : SearchFormProps) => {
    const [responseData, setResponseData] = useState<GeocodingApiObj[]|null>(null);
    const searchInput = useRef(null);

    const searchLocation = async (evt) => {
        evt.preventDefault();
        const value = searchInput.current.value;
        const data : GeocodingApiObj[]|null = await WeatherService.getDataByName({name : value}) as GeocodingApiObj[]|null;
        setResponseData(data);
        
    }
    const addNewLocationData = async (data) => {
        const newData = {
            name : data.name,
            lat : data.lat,
            lon : data.lon
        }
        const weatherData = await WeatherService.getLocationData(newData) as WeatherApiResponse;  
        addLocation(weatherData);
    }

    const responseLayout = responseData?.map((data) => (
        <li key={`${data.name}${data.lat}` }>
            <h3>{`Name : ${data.name}`}</h3>
            <span>{`Country : ${data.country}`}</span>
            <span>{`Lat =${data.lat} Lon =${data.lon}`}</span>
            <SimpleBtn onclickHandler={(evt) => {
                evt.stopPropagation();
                addNewLocationData(data);
                } }>Add to list</SimpleBtn>
        </li>
    ))
    return (
        <div>
           <form>
                <input ref={searchInput} />
                <button onClick={searchLocation}>Add</button>   
            </form>
            <div>
                {responseLayout !== null && <ul>{responseLayout}</ul>}
            </div> 
        </div>
    )
}

export default SearchForm
