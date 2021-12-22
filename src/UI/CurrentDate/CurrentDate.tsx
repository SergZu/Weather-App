import React from 'react'
import classes from './CurrentDate.module.css'
import { days, months } from '../../constants'

const CurrentDate = () => {
    const now = new Date();
    const [ hours, minutes, day, date, month, year ] = [ now.getHours(), now.getMinutes(), days[now.getDay()], now.getDate(),
                                                         months[now.getMonth()], now.getFullYear() ];
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
