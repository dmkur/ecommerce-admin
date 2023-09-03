import axios from "axios";
import {baseURL} from "../constants";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authReducer).currentUser.accessToken;
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authReducer).currentUser.accessToken)

const axiosService = axios.create({
    baseURL
});

const userRequest = axios.create({
    baseURL,
    headers: {Authorization: TOKEN}
});


export {axiosService, userRequest}
