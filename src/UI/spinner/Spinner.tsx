import React from 'react'
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.spinner}>
            <div className={classes.loading}>
                <span className={classes.text}>Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
