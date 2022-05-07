import { Action, Marker, PATH } from "../../types";
import { gpsToXyz } from "../../utils";


const PATH_CREATE = 'ArNavigationForMuseum/path/CREATE';
const PATH_TRANSFORM = 'ArNavigationForMuseum/path/TRANSFORM';
const PATH_RESET = 'ArNavigationForMuseum/path/RESET';

const reset = (): Action => ({
    type: PATH_RESET
})


const create = (marker:any): Action => ({
    type: PATH_CREATE,
    payload: marker
});

const transform = (marker:any): Action => ({
    type: PATH_TRANSFORM,
    payload: marker
});

const actionTypes = {
    PATH_CREATE,
    PATH_RESET
};

let initialState:PATH={
    gps:[],
    xyz:[]
}
const actionCreators = {
    reset,
    create,
    transform
};
const reducer = function (state = initialState, action: Action) {
    switch (action.type) {
        case PATH_CREATE: {
            const path = action.payload;
            return {...state,gps:path};
        }
        case PATH_TRANSFORM:{
            const transformedPath=gpsToXyz(state.gps,action.payload)
            return {...state,xyz:transformedPath}
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