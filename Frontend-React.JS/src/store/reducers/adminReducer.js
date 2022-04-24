import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [], 
    roles: [],
    position: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {  
        case actionTypes.FETCH_GENDER_START: 
        console.log('hoi dan it fire start' , action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            let copyState = {...state}
            copyState.genders = action.data;
            console.log('hoi dan it fire success' , copyState);
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
        console.log('hoi dan it fire failed' , action);
            return {
                ...state,
            }
        default: 
            return state ;
       
    }
}

export default adminReducer;