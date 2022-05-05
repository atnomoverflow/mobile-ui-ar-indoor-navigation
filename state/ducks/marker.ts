import { Action, Marker } from "../../types";
import { AnyAction, Dispatch } from 'redux';
import { Alert } from "react-native";

const MARKER_REGISTER = 'ArNavigationForMuseum/marker/REGISTER';
const MARKER_RESET = 'ArNavigationForMuseum/marker/RESET';
const MARKER_ERROR = 'ArNavigationForMuseum/marker/ERROR';
const reset = (): Action => ({
    type: MARKER_RESET
})
const MarkerError = ():Action=>({
    type: MARKER_ERROR
})

const register = (marker: Marker): Action => ({
    type: MARKER_REGISTER,
    payload: marker
});

const fetchMarker = (id: string) => {
    return (function (dispatch: Dispatch<AnyAction>) {
        fetch(`http://192.168.1.14:3000/marker/${id}`)
            .then((response) => {
                if (response.status == 200) {
                return response.json()}
                else throw new Error('HTTP response status not code 200 as expected.');
                })
            .then((data) => {
                dispatch(register(data.marker));
            }).catch(function(error) {
              
                dispatch(MarkerError());
            }
                )})
    
};
const actionTypes = {
    MARKER_REGISTER,
    MARKER_RESET,
    MARKER_ERROR
};

const initialState = {
    error:false,
    fetched:false,
    id:"", 
    longitude:0,
    laltitude:0}
const actionCreators = {
    fetchMarker,
    reset
};
const reducer = function (state = initialState, action: Action) {
    switch (action.type) {
        case MARKER_REGISTER: {
            const marker = action.payload;
            const { id, longitude, laltitude } = marker;

            return { ...state, id, longitude, laltitude,error:false,fetched:true };
        }
        case MARKER_RESET:{
            return initialState
        }
        case MARKER_ERROR:{
            return {...state,error:true}
        }
        default:
            return state;
    }
};

export { actionCreators, actionTypes, initialState };

export default reducer;