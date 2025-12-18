import axios from "axios";
console.log(import.meta.env.VITE_API_BACKEND);

const options = {
    baseURL: import.meta.env.VITE_API_BACKEND,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
};
console.log(options);

export const publicApi = axios.create(options);
export const privateApi = axios.create({
    ...options,
    withCredentials: true,
});
