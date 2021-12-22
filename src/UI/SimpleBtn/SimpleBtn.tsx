import React from 'react'
import classes from './SimpleBtn.module.css'

export interface SimpleBtnProps {
    onclickHandler : () => void;
    children : React.ElementType | string;
    className? : string;
    hidden : boolean;
}

const SimpleBtn = ({children, onclickHandler, className, hidden} : SimpleBtnProps) => {
    return (
        <button className={`${classes.btn} ${classes[className]} ${hidden ? classes.invisible : null}`} onClick={onclickHandler}>
           {children}
        </button>
    )
}

export default SimpleBtn
