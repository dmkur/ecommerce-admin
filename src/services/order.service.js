import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const orderService = {
    getOrders:() => axiosServiceWithToken.get(urls.orders),
    getOrdersStats:() => axiosServiceWithToken.get(urls.ordersIncome),
}

export {orderService}
