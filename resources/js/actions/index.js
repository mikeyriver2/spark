export const checkUser = (user) => {
        return {
            type: 'SET_USER',
            payload: user
        }
}

export const toggleAuthModal = () => {
    return {
        type: 'TOGGLE_AUTH_MODAL',
    }
}

export const fetchProjects = () => {
    return (dispatch) => {
        dispatch({type: "FETCH_PROJECTS"});
        axios.get('projects')   
           .then((res) =>{
               dispatch({type: "FETCH_PROJECTS_SUCCESS", payload: res.data});
           });
    }
}


