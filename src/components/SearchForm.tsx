import React, {useRef} from 'react'
import { Location } from './App';

export interface SearchFormProps{
    addLocation : (location : Location) => void;
    getNewLocationData: ({ name, lat, lon }: Location, useCoords: boolean) => Promise<void>;
}

const SearchForm = ({addLocation, getNewLocationData } : SearchFormProps) => {
    const searchInput = useRef(null);
    const searchLocation = (evt) => {
        evt.preventDefault();
        const value = searchInput.current.value;
        const loc = {
            name : value,
            lat : '0',
            lon : '0'
        };
        addLocation(loc);
        getNewLocationData(loc, false)
    }
    return (
        <div>
           <form>
                <input ref={searchInput} />
                <button onClick={searchLocation}>Add</button>   
            </form>
            <div>
                Results
            </div> 
        </div>
    )
}

export default SearchForm
