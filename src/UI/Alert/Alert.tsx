import React from 'react'
import classes from './Alert.module.css'

interface alertProps {
    text : string
}

const alert = ({text} : alertProps) : JSX.Element => {
    return (
        <h3 className={classes.alert}>{text}</h3>
    )
}

export default alert