import axios from "axios";
// import useAuth from "../hooks/useAuth";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { "Content-Type": "application/json" },
});

// instance.interceptors.request.use(
//     (config) => {
//         const { auth } = useAuth();
//         // if (auth?.token) {
//             config.headers.Authorization = `Bearer ${auth.token}`;
//         // }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
