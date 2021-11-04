import React, {useRef} from 'react'
import { Location } from './App';

export interface SearchFormProps{
    addLocation : (location : Location) => void;
}

const SearchForm = ({addLocation} : SearchFormProps) => {
    const searchInput = useRef(null);
    const searchLocation = (evt) => {
        evt.preventDefault();
        const value = searchInput.current.value;
        addLocation({
            name : value,
            lat : '0',
            lon : '0'
        });
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
