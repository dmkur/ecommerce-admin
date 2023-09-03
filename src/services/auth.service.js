import {userRequest} from "./axios.service";
import {urls} from "../constants";

const authService = {
    login:(user) => userRequest.post(urls.auth, user),
    // getUserById:(id) => userRequest.get(urls.users+`/find/${id}` )
}

export {authService}
