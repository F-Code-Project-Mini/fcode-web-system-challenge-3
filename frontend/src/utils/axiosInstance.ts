import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import AuthApi from "~/api-requests/auth.requests";
import LocalStorage from "./localstorage";
console.log(import.meta.env.VITE_API_BACKEND);

const options = {
    baseURL: import.meta.env.VITE_API_BACKEND,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};
// console.log(options);

export const publicApi = axios.create(options);
export const privateApi = axios.create({
    ...options,
    // withCredentials: true,
});
let isRefreshing = false; // đánh dấu trạng thái gọi refresh token
let refreshQueue: Array<{
    resolve: () => void;
    reject: (err: unknown) => void;
}> = []; // hàng đợi các request chờ refresh token
const processQueue = (error?: unknown) => {
    refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
    refreshQueue = [];
};
privateApi.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error instanceof AxiosError) {
            const origin:
                | (InternalAxiosRequestConfig & {
                      _retry?: boolean;
                  })
                | undefined = error.config;
            if (error.response?.status === 401 && origin && !origin._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        refreshQueue.push({
                            resolve: () => {
                                resolve(privateApi(origin));
                            },
                            reject,
                        });
                    });
                }
                isRefreshing = true;
                origin._retry = true;

                try {
                    await AuthApi.refreshToken();
                    processQueue();
                    return privateApi(origin);
                } catch (err) {
                    processQueue(err);
                    LocalStorage.removeItem("login");
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
