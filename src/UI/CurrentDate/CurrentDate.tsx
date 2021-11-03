import React from 'react'
import classes from './CurrentDate.module.css'
import { days, months } from '../../constants'

const CurrentDate = () => {
    const now = new Date();
    
    return (
        <span className={classes.currentDate}>
            {`${now.getHours()}:${now.getMinutes()} - ${days[ now.getDay() ]} - ${now.getDate()} ${months[ now.getMonth() ]} ${now.getFullYear() % 100}`}
        </span>
    )
}

export default CurrentDate
