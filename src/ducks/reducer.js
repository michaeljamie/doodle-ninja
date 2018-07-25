const initialState = {

    user: {},
    doodle: {},
    drawing: {}

}

const USER_DATA = 'USER_DATA';
const UPDATE_USERDATA = 'UPDATE_USERDATA';
const CREATE_DOODLE = 'CREATE_DOODLE';
const USER_DRAWING = 'USER_DRAWING';


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, { user: action.payload });
        case USER_DRAWING:
            return Object.assign({}, state, { drawing: action.payload });
        case UPDATE_USERDATA:
            return Object.assign({}, state, { user: action.payload });
        case CREATE_DOODLE:
            return Object.assign({}, state, { doodle: action.payload });
        default:
            return state;
    }
}

export function getUserData(user) {
    return {
        type: USER_DATA,
        payload: user
    }
}

export function getUserDrawings(user) {
    return {
        type: USER_DRAWING,
        payload: user
    }
}

export function updateUserData(user){
    return {
        type: UPDATE_USERDATA,
        payload: user
    }
}

export function newDoodle(doodle){
    return {
        type: CREATE_DOODLE,
        payload: doodle
    }
}

