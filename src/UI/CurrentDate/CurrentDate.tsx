import React from 'react'

const CurrentDate = () => {
    const now = new Date();
    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
        <span>
            {`${now.getHours()}:${now.getMinutes()} - ${days[ now.getDay() ]} - ${now.getDate()} ${months[ now.getMonth() ]} ${now.getFullYear() % 100}`}
        </span>
    )
}

export default CurrentDate
