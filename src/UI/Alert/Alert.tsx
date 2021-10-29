import React from 'react'

interface alertProps {
    text : string
}

const alert = ({text} : alertProps) : JSX.Element => {
    return (
        <h3 style={{color : 'red'}}>{text}</h3>
    )
}

export default alert