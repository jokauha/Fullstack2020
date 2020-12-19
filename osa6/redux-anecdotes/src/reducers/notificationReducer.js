const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        const millis = time*1000
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: content,
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, millis)
    }
}

export default notificationReducer