import React from 'react'
import classes from './SimpleBtn.module.css'

export interface SimpleBtnProps {
    onclickHandler : () => void;
    children : React.ElementType | string;
    className? : string;
}

const SimpleBtn = ({children, onclickHandler, className} : SimpleBtnProps) => {
    return (
        <button className={`${classes.btn} ${className}`} onClick={onclickHandler}>
           {children}
        </button>
    )
}

export default SimpleBtn
