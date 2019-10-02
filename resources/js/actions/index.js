//note for future mikey - You cannot handle an axios and return it here for reasons of it being a promise and some other shit i don't really understand until now.
//Just handle the axios in some other non redux file and pass the return of axios to redux

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