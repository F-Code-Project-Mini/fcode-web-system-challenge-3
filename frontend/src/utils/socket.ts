import { io } from "socket.io-client";
console.log("import.meta.env.VITE_API_BACKEND", import.meta.env.VITE_API_BACKEND);

export const socket = io(import.meta.env.VITE_API_BACKEND, {
    autoConnect: false,
});
