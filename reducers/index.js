import { combineReducers } from 'redux'
import albumAnimationReducer from './albumAnimationReducer.js'

export default combineReducers({
    animation: albumAnimationReducer,
})