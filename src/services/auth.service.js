import {axiosService} from "./axios.service";
import {urls} from "../constants";

const authService = {
    login:(user) => axiosService.post(urls.auth, user),
}

export {authService}
