import axios from 'axios';

const initialState = {

    user: {},
    doodle: {},
    drawing: {}

}

const USER_DATA = 'USER_DATA';
const UPDATE_USERDATA = 'UPDATE_USERDATA';
const CREATE_DOODLE = 'CREATE_DOODLE';
const USER_DRAWING = 'USER_DRAWING';
const JOIN_DOODLE = 'JOIN_DOODLE';


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
        case JOIN_DOODLE + '_PENDING':
        let newUser = Object.assign({}, state.user)
        newUser.doodleId = action.meta.newDoodleId
            return Object.assign({}, state, { user: newUser });
        case JOIN_DOODLE + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
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

export function joinDoodle(idObj) {
    var updatedUser = axios.put(`/api/users/${idObj.user_name}`, {doodleId: idObj.doodleId}).then(res => {
        return res.data
    })
    return {
        type: JOIN_DOODLE,
        payload: updatedUser,
        meta: {
            newDoodleId: idObj.doodleId
        }
    }
}

