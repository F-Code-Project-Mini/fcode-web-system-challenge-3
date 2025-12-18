import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import AuthApi from "~/api-requests/auth.requests";
console.log(import.meta.env.VITE_API_BACKEND);

const options = {
    baseURL: import.meta.env.VITE_API_BACKEND,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
};
// console.log(options);

export const publicApi = axios.create(options);
export const privateApi = axios.create({
    ...options,
    withCredentials: true,
});
let isRefreshing = false; // đánh dấu trạng thái gọi refresh token
let refreshQueues: Array<() => void> = []; // hàng đợi các request chờ refresh token
privateApi.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error instanceof AxiosError) {
            const origin:
                | (InternalAxiosRequestConfig & {
                      _retry?: boolean;
                  })
                | undefined = error.config;
            if (error.response && error.response.status === 401 && origin && !origin._retry) {
                if (isRefreshing) {
                    return new Promise((resolve) => {
                        refreshQueues.push(() => {
                            resolve(privateApi(origin));
                        });
                    });
                }
                isRefreshing = true;
                origin._retry = true;

                return new Promise((resolve, reject) => {
                    AuthApi.refreshToken()
                        .then((res) => {
                            if (res.status) {
                                refreshQueues.forEach((cb) => cb());
                                refreshQueues = [];
                                resolve(privateApi(origin));
                            }
                        })
                        .catch((err) => reject(err))
                        .finally(() => {
                            isRefreshing = false;
                        });
                });
            }
        }
    },
);
