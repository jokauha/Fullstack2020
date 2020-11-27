import React from 'react'

const Notification = ({ message, isError }) => {

    const notificationStyle ={
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        ...notificationStyle,
        color: 'red'
    }

    if (message === null) {
        return null
    }
    else if (!isError) {
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }
    else return (
        <div className='error' style={errorStyle}>
            {message}
        </div>
    )
}

export default Notification