import { Action, Marker } from "../../types";
import { AnyAction, Dispatch } from 'redux';

const MARKER_REGISTER = 'ArNavigationForMuseum/marker/REGISTER';
const MARKER_RESET = 'ArNavigationForMuseum/marker/RESET';

const reset = (): Action => ({
    type: MARKER_RESET
})


const register = (marker: Marker): Action => ({
    type: MARKER_REGISTER,
    payload: marker
});

const fetchMarker = (id: string) => {
    return (function (dispatch: Dispatch<AnyAction>) {
        fetch(`localhost:3000/marker/endpoints/${id}`)
            .then((response) => response.json())
            .then((data) => {
                dispatch(register(data));
            });
    });
};
const actionTypes = {
    MARKER_REGISTER,
    MARKER_RESET
};

const initialState = {}
const actionCreators = {
    fetchMarker,
    reset
};
const reducer = function (state = initialState, action: Action) {
    switch (action.type) {
        case MARKER_REGISTER: {
            const entry = action.payload;
            const { id, longitude, laltitude } = entry;

            return { ...state, id, longitude, laltitude };
        }
        case MARKER_RESET:{
            return initialState
        }
        default:
            return state;
    }
};

export { actionCreators, actionTypes, initialState };

export default reducer;