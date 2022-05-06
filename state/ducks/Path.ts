import { Action, Marker } from "../../types";


const PATH_CREATE = 'ArNavigationForMuseum/path/CREATE';
const PATH_RESET = 'ArNavigationForMuseum/path/RESET';
const reset = (): Action => ({
    type: PATH_RESET
})


const create = (marker:any): Action => ({
    type: PATH_CREATE,
    payload: marker
});


const actionTypes = {
    PATH_CREATE,
    PATH_RESET
};

const initialState:any[] = []
const actionCreators = {
    reset,
    create
};
const reducer = function (state = initialState, action: Action) {
    switch (action.type) {
        case PATH_CREATE: {
            const path = action.payload;
            return path;
        }
        case PATH_RESET:{
            return initialState
        }
        default:
            return state;
    }
};

export { actionCreators, actionTypes, initialState };

export default reducer;