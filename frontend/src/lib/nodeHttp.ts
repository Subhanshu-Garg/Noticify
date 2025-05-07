import configs from "@/configs/config";
import axios from "axios";

const nodeHttp = axios.create({
    baseURL: configs.BASE_URL,
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