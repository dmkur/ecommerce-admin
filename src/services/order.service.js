import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const orderService = {
    getOrders:() => axiosServiceWithToken.get(urls.orders),
    getOrdersStats:(pid) => axiosServiceWithToken.get(urls.ordersIncome, {params:{pid}}),
}

export {orderService}
