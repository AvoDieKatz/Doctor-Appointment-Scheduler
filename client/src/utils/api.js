import axios from "axios";
import { getToken, removeUserSession } from "./common";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (401 === error.response.status) {
                alert("Your session has expired, you will be logged out.");
                removeUserSession();
                window.location = "/";
            } else {
                return Promise.reject(error);
            }
        } else {
            console.log("Error: ", error.message);
        }
    }
);

export default instance;
