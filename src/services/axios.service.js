import axios from "axios";
import {baseURL} from "../constants";

const user =JSON.parse(localStorage.getItem("persist:root"))?.authReducer
const currentUser =user && JSON.parse(user).currentUser
const TOKEN = currentUser?.accessToken

const axiosService = axios.create({
    baseURL
});

const axiosServiceWithToken = axios.create({
    baseURL,
    headers: {Authorization: TOKEN}
});


export {axiosService, axiosServiceWithToken}
