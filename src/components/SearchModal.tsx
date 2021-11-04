import React from 'react'
import classes from './SearchModal.module.css'
import { Location } from './App'
import SimpleBtn from '../UI/SimpleBtn/SimpleBtn'
import SearchForm from './SearchForm'

export interface SearchModalProps{
    closeModal : () => void;
    addLocation : (location : Location) => void
}

const SearchModal = ({closeModal, addLocation}) => {
    return (
        <div className={classes.modal}>
            <div>
                <button>Get My Position</button>
                <SearchForm addLocation={addLocation} />
            </div>
            <SimpleBtn className={classes.closeBtn} onclickHandler={closeModal}>&#10008;</SimpleBtn>
        </div>
    )
}

export default SearchModal
