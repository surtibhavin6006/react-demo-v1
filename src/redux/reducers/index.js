import { combineReducers } from "redux";
import userReducer from "./user/index";

export default combineReducers({
    user : userReducer
});