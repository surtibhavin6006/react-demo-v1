import { user } from "../constant/user";

const login = (data) => ({ type:user.LOGIN, payload: data  });
const profileInfo = (data) => ({ type:user.PROFILE_INFO, payload: data  });

export {login,profileInfo};