import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const userService = {
    getAllUsers:() => axiosServiceWithToken.get(urls.users+'?new=true'),
    getUsersStats:() => axiosServiceWithToken.get(urls.usersStats)
}

export {userService}
