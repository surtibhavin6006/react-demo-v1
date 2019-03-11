import { user } from "../constant/user";

const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case user.LOGIN:
            return Object.assign(state, action.payload);
        default:
            return state;
    }
}

export default loginReducer;