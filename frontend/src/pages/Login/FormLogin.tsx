import React from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

import { setUser } from "~/features/userSlice";
import { useAppDispatch } from "~/hooks/useRedux";
import Notification from "~/utils/notification";
import LocalStorage from "~/utils/localstorage";
import { USER_ROLE } from "~/constants/enums";
import AuthApi from "~/api-requests/auth.requests";
import { AxiosError } from "axios";

const FormLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await AuthApi.login({ email, password });
            const { isFirstLogin } = response;

            LocalStorage.setItem("login", "true");
            const isInstruction = LocalStorage.getItem("isInstruction");
            if (!isFirstLogin) {
                const { role } = response.result;
                setIsFirstLogin(false);
                dispatch(setUser(response.result));

                if (isInstruction || role !== USER_ROLE.CANDIDATE) {
                    // lưu access token, refresh token vô localstorage
                    LocalStorage.setItem("access_token", response.result.access_token || "");
                    Notification.success({
                        text: "Đăng nhập thành công vào hệ thống Challenge Vòng 3!",
                    });
                }
                navigate("/");
            } else {
                setEmail("");
                Notification.success({
                    text: "Nếu email của bạn đã được đăng ký, vui lòng kiểm tra hộp thư đến để kích hoạt tài khoản!",
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data?.isFirstLogin) {
                    setIsFirstLogin(true);
                    Notification.error({
                        text: error.response?.data?.message || "Đăng nhập thất bại!",
                    });
                } else {
                    setIsFirstLogin(error.response?.data?.isFirstLogin ?? false);
                    if (!isFirstLogin) {
                        Notification.error({
                            text: error.response?.data?.message || "Đăng nhập thất bại!",
                        });
                    }
                }
            }
        }
    };

    return (
        <section className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 text-center sm:mb-10">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center sm:h-18 sm:w-18">
                    <img src="/fcode.png" alt="F-Code" className="h-full w-full" />
                    <div className="bg-primary/20 absolute inset-0 rounded-full opacity-50 blur-xl"></div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Đăng nhập</h1>
                <p className="mt-2.5 text-sm text-gray-600 sm:text-base">CLB F-Code thuộc FPT University</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                    <label htmlFor="email" className="mb-2.5 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled={!isFirstLogin}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@fpt.edu.vn"
                            className="pl-11"
                            required
                        />
                    </div>
                </div>

                {!isFirstLogin && (
                    <div>
                        <label htmlFor="password" className="mb-2.5 block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className="pr-11 pl-11"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                )}

                <Button className="w-full" size="lg">
                    {isFirstLogin ? "Tiếp tục" : "Đăng nhập"}
                </Button>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-center text-sm text-gray-600">
                    Bạn gặp sự cố khi đăng nhập?{" "}
                    <Link
                        to="https://discord.gg/WvudrJaYD"
                        className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
                    >
                        Liên hệ discord
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default FormLogin;
