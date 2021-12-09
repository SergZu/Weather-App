import React, {useRef, useState} from 'react'
import WeatherService from '../Api/WeatherService';
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn';
import { Location } from './App';
import { WeatherApiResponse } from './Weather';

export interface SearchFormProps{
    addLocation : (location : Location) => boolean;
    getNewLocationData: (data : WeatherApiResponse) => void;
}

const SearchForm = ({addLocation, getNewLocationData } : SearchFormProps) => {
    const [responseData, setResponseData] = useState(null);
    const searchInput = useRef(null);
    const searchLocation = async (evt) => {
        evt.preventDefault();
        const value = searchInput.current.value;
        const data = await WeatherService.getDataByName({name : value});
        setResponseData(data);
    }
    const addNewLocationData = (data) => {
        const lat = String(Math.floor(Math.random() * 90) );
        const lon = String(Math.floor(Math.random() * 90) );
        addLocation({name : data.city.name, lat, lon});
        getNewLocationData(data)

    }
    const responseLayout = responseData?.map((data) => (
        <li key={`${data.city.name}${data.list[0].dt}` }>
            <h3>{data.city.name}</h3>
            <span>Some temperature</span>
            <SimpleBtn onclickHandler={() => { addNewLocationData(data) } }>Add to list</SimpleBtn>
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
