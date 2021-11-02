import React from 'react'
import classes from './CurrentDate.module.css'

export const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'
];

const CurrentDate = () => {
    const now = new Date();
    
    return (
        <span className={classes.currentDate}>
            {`${now.getHours()}:${now.getMinutes()} - ${days[ now.getDay() ]} - ${now.getDate()} ${months[ now.getMonth() ]} ${now.getFullYear() % 100}`}
        </span>
    )
}

export default CurrentDate
