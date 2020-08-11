import { change_current_index } from './types.js'

export const changeCurrentIndex = (index) => {
    return {
        type: change_current_index,
        payload: index
    }
}
