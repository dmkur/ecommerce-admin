import axios from "axios";
import {baseURL} from "../constants";

const user =JSON.parse(localStorage.getItem("persist:root"))?.authReducer
// console.log(user, "1");
const currentUser = user && JSON.parse(user).currentUser
// console.log(currentUser, "2");
const TOKEN = currentUser?.accessToken
// console.log(TOKEN, "3");

const axiosService = axios.create({
    baseURL
});

const axiosServiceWithToken = axios.create({
    baseURL,
    headers: {Authorization: TOKEN}
});


export {axiosService, axiosServiceWithToken}
