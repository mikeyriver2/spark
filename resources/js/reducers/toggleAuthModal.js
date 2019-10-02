import axios from 'axios';

const toggleSideBar = (state = false, action) => {
    switch(action.type){
        case "TOGGLE_AUTH_MODAL": {
            return !state;
        } default:
            return state;
    }
}

export default toggleSideBar;