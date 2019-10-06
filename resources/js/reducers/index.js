import checkUser from './checkUser'
import toggleSideBar from './toggleAuthModal'

import { combineReducers } from 'redux'

const projects = (state = {}, action) => {
    switch(action.type){
        case "FETCH_PROJECTS": {
            return {}
        }
        case "FETCH_PROJECTS_SUCCESS": {
            let payload = action.payload;
            return payload
            
        } default:
            return state;
    }
}

const allReducers = combineReducers({
    checkUser, //same as - checkUser : checkUser
    showAuthModal: toggleSideBar,
    projects
});

export default allReducers;