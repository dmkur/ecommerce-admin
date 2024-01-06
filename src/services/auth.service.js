import {axiosService} from "./axios.service";
import {urls} from "../constants";

const access_token = 'access_token'

const authService = {
    login:(user) => axiosService.post(urls.auth, user),
    
    setTokens: (access) => localStorage.setItem(access_token,access),
    getAccessToken: () => localStorage.getItem(access_token),
    deleteTokens: () => localStorage.removeItem(access_token),
  
}

export {authService}
