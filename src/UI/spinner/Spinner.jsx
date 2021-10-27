import React from 'react'
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={`${classes.loading} ${classes.spinner} `}>
            <span className={classes.spinnerText}>Loading...</span>
        </div>
    )
}

export default Spinner
