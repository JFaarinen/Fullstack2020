const timeoutReducer = (state = '', action) => {
    console.log(action);
    switch (action.type) {
        case 'NEW_TIMER':
            return action.timer;
        case 'CLEAR_TIMER':
            console.log('CLEARING TIMER ', state.timer);
            clearTimeout(state.timer);
            return state;
        default:
            return state;
    }

}

export const newTimer = (timer) => {
    console.log('TIMER', timer);
    return {
        type: 'NEW_TIMER',
        timer: timer
    }
}

export const clearTimer = () => {
    console.log('CLEAR TIMER ');
    return { type: 'CLEAR_TIMER' }
}

export default timeoutReducer;