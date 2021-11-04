import React from 'react'
import classes from './SearchModal.module.css'
import { Location } from './App'

export interface SearchModalProps{
    closeModal : () => void;
    addLocation : (location : Location) => void
}

const SearchModal = ({closeModal, addLocation}) => {
    return (
        <div className={classes.modal}>
            
        </div>
    )
}

export default SearchModal
