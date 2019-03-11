import { user } from "../../constant/user";

const profileReducer = (state = {}, action) => {

    switch (action.type) {
        case user.PROFILE_INFO:
            return action.payload;
        default:
            return state;
    }
}

export default profileReducer;