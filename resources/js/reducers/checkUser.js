import axios from 'axios';

const checkUser = (state = {}, action) => {
    switch(action.type){
        case "SET_USER": {
            let payload = action.payload;
            return payload
        } default:
            return state;
    }
}

export default checkUser;