import { axiosServiceWithToken} from "./axios.service";
import {urls} from "../constants";

const productService = {
    cerate:(newProduct) => axiosServiceWithToken.post(urls.products, newProduct),
    getAllProducts:(params={}) => axiosServiceWithToken.get(urls.products, {params:{category:params}}),
    getProductById:(id) => axiosServiceWithToken.get(urls.products+`/find/${id}` ),
    deleteById:(id) => axiosServiceWithToken.delete(urls.products+`/${id}` ),
    updateById:(productId, productForUpdate) => axiosServiceWithToken.put(urls.products+`/${productId}`, productForUpdate)
}

export {productService}
