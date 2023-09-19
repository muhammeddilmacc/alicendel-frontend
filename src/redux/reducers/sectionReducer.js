import {
    CHANGE_SECTION
} from "../constants/sectionConstant"

export const sectionReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_SECTION:
            return { section:action.payload}
       
        default:
            return state;
    }
}