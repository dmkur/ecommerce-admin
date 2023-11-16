import {axiosService} from "./axios.service";
import {urls} from "../constants";

const _accessToken = 'access'

const authService = {
    login:(user) => axiosService.post(urls.auth, user),
    
    setTokens: (access) => localStorage.setItem(_accessToken,access),
    getAccessToken: () => localStorage.getItem(_accessToken),
    deleteTokens: () => localStorage.removeItem(_accessToken),
  
}

export {authService}
