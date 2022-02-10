import React from 'react'
import classes from './Spinner.module.css';

interface spinnerProps {
    classname? : string;
}

const Spinner = ({classname} : spinnerProps) => {
    return (
        <div className={`${classes.spinnerContainer} ${classes[classname] !== undefined ? classes[classname] : ''}` }>
            <div className={classes['lds-ripple']}>
                <div></div>
                <div></div>
            </div>
        </div> 
    )
}

export default Spinner
