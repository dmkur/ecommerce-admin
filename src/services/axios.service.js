import axios from "axios";
import {baseURL} from "../constants";
import { authService } from "./auth.service";

const axiosService = axios.create({
    baseURL
});

const axiosServiceWithToken = axios.create({
    baseURL  
});

axiosServiceWithToken.interceptors.request.use((config) => {
    const access = authService.getAccessToken()
    if (access) {
        config.headers.Authorization = access
    }
    return config
})


export {axiosService, axiosServiceWithToken}
