import React from 'react'
import classes from './CurrentDate.module.css'
import { days, months } from '../../constants'

export interface CurrentDateProps {
    currentTime : number;
    offset : number;
}

const CurrentDate = ({currentTime, offset} : CurrentDateProps) => {
    const now = new Date(currentTime + offset);
    const [ hours, minutes, day, date, month, year ] = [ now.getUTCHours(), 
                                                         now.getUTCMinutes(), 
                                                         days[now.getUTCDay()], 
                                                         now.getUTCDate(),
                                                         months[now.getUTCMonth()], 
                                                         now.getUTCFullYear() ];
    const convertDateNum = (date : number) : string => {
        if (date < 10) return '0' + date
        return `${date}`
    }

    return (
        <span className={classes.currentDate}>
            {`${convertDateNum(hours)}:${convertDateNum(minutes)} - ${day} - ${convertDateNum(date)} ${month} ${year}`}
        </span>
    )
}

export default CurrentDate
