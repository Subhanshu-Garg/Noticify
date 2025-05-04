import axios from "axios";
import Cookie from "node_modules/@types/js-cookie";

const nodeHttp = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10_000,
    withCredentials: true
});
nodeHttp.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response ? Promise.reject(error.response.data) : Promise.reject({ message: "Network Error" });
    }
);
export default nodeHttp;