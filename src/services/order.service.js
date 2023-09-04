import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const orderService = {
    getOrders:() => axiosServiceWithToken.get(urls.orders),
}

export {orderService}
