import checkUser from './checkUser'
import toggleSideBar from './toggleAuthModal'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    checkUser, //same as - checkUser : checkUser
    showAuthModal: toggleSideBar
});

export default allReducers;