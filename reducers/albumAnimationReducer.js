import { change_current_index } from '../actions/types.js'
const initialState = {
        currentIndex: 1, // and this to track card positions
        indexes: [1,2,3]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case change_current_index:
        return {
            currentIndex: action.payload.currentIndex,
            indexes: action.payload.indexes
        }
        default:
        return state
    }
}