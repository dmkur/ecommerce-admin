import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const userService = {
    getAllUsers:() => axiosServiceWithToken.get(urls.users+'?new=true'),
    // getUserById:(id) => userRequest.get(urls.users+`/find/${id}` )
}

export {userService}
