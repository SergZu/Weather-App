import React from 'react'
import classes from './SimpleBtn.module.css'

export interface SimpleBtnProps {
    onclickHandler : (event : React.SyntheticEvent) => void;
    children : React.ElementType | string;
    className? : string;
    hidden? : boolean;
}

const SimpleBtn = ({children, onclickHandler, className, hidden} : SimpleBtnProps) => {
    const onkeypressedHandler : React.KeyboardEventHandler = (evt) => {
        evt.preventDefault();
        if (evt.key === 'Enter') {
            onclickHandler(evt);
        }
    }
    return (
        <button 
            className={`${classes.btn} ${classes[className] !== undefined ? classes[className] : ''} ${hidden ? classes.invisible : ''}`} 
            onClick={onclickHandler} onKeyPress={onkeypressedHandler}>
           {children}
        </button>
    )
}

export default SimpleBtn
