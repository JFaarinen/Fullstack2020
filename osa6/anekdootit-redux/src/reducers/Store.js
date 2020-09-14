import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import anecdoteReducer from './anecdoteReducer';
import notificationReducer from './notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default store;