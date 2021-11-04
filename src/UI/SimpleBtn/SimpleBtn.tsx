import React from 'react'
import classes from './SimpleBtn.module.css'

export interface SimpleBtnProps {
    onclickHandler : () => void;
    children : React.ElementType | string;
}

const SimpleBtn = ({children, onclickHandler} : SimpleBtnProps) => {
    return (
        <button className={classes.btn} onClick={onclickHandler}>
           {children}
        </button>
    )
}

export default SimpleBtn
