import rootReducer from './reducers';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-persist'

// const middlewares = [logger]

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware
        //   reduxThunkMiddleware,
        //   restReduxMiddleware,
        //   authEventsMiddleware,
        //   routeEventsMiddleware
    )
)

export const store = createStore(rootReducer, enhancer)

export const persistor = persistStore(store)

export default { store, persistor }