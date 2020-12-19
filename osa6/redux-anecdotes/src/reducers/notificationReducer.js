const initialState = {
    notification: null,
    timeoutID: null
}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                notification: action.notification,
                timeoutID: action.timeoutID
            }
        case 'REMOVE_NOTIFICATION':
            return {
                notification: null,
                timeoutID: null,
            }
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async (dispatch, getState) => {
        const millis = time*1000
        const currentState = getState()
        clearTimeout(currentState.notification.timeoutID);
        const timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, millis)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: content,
            timeoutID: timeoutID,
        })
    }
}

export default notificationReducer