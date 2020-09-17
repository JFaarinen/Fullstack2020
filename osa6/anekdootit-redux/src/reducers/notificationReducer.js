import { newTimer, clearTimer } from './timeoutReducer';

const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'NOTIFICATE':
            //console.log(action.notification);
            return action.notification;
        case 'CLEAR_NOTIFICATION':
            return '';
        default:
            return state;
    }
}

export const showNotification = notification => {
    return {
        type: 'NOTIFICATE',
        notification: { notification }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const timedNotification = (notification, time) => {
    return async dispatch => {
        dispatch(clearTimer());
        const timer = window.setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, time * 1000);
        dispatch({
            type: 'NOTIFICATE',
            notification: { notification }
        });
        console.log('TIMER: ', timer);
        dispatch(newTimer(timer));
    }
}

export default notificationReducer;