import React from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

import { loginUser } from "~/features/userSlice";
import { useAppDispatch } from "~/hooks/useRedux";
import Notification from "~/utils/notification";
import LocalStorage from "~/utils/localstorage";
import { USER_ROLE } from "~/constants/enums";

const FormLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { role } = await dispatch(loginUser({ email, password })).unwrap();
            LocalStorage.setItem("login", "true");
            const isInstruction = LocalStorage.getItem("isInstruction");

            if (isInstruction || role !== USER_ROLE.CANDIDATE) {
                Notification.success({
                    text: "Đăng nhập thành công vào hệ thống Challenge Vòng 3!",
                });
            }
            navigate("/");
        } catch (error) {
            Notification.error({
                text: error as string,
            });
        }
    };

    return (
        <section className="flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-10">
            <div className="mb-6 text-center sm:mb-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                    <img src="/fcode.png" alt="F-Code" className="h-full w-full" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Đăng nhập</h1>
                <p className="mt-2 text-xs text-gray-600 sm:text-sm">CLB F-Code thuộc FPT University</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="py-5 pl-10"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                        Mật khẩu
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            className="py-5 pr-10 pl-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 transition-colors hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <Button className="w-full">Đăng nhập</Button>
            </form>

            <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="text-center text-sm text-gray-500">
                    Bạn chưa có tài khoản?{" "}
                    <Link
                        to="https://discord.gg/WvudrJaYD"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        Liên hệ discord
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default FormLogin;
