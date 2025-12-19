import React from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import AuthApi from "~/api-requests/auth.requests";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "~/components/Loading";
import { AxiosError } from "axios";
import Notification from "~/utils/notification";

const FormSetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const params = useParams<{ token: string }>();
    const { data: info, isPending } = useQuery({
        queryKey: ["active-account", params.token],
        queryFn: async () => {
            if (params.token) {
                const response = await AuthApi.activeAccount(params.token);
                return response;
            }
            return null;
        },
        retry: 0,
    });

    const updatePasswordMutation = useMutation({
        mutationFn: async ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
            if (params.token) {
                const response = await AuthApi.setPassword(params.token, password, confirmPassword);
                return response;
            }
            return null;
        },
        onSuccess: () => {
            navigate("/login");
            Notification.success({
                text: "Cập nhật mật khẩu thành công, vui lòng đăng nhập lại!",
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                Notification.error({
                    text: error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại sau.",
                });
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updatePasswordMutation.mutate({
            password,
            confirmPassword,
        });
    };
    if (isPending) {
        return <Loading />;
    }

    return (
        <section className="flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-10">
            {info?.email ? (
                <>
                    <div className="mb-6 text-center sm:mb-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                            <img src="/fcode.png" alt="F-Code" className="h-full w-full" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Cập nhật mật khẩu</h1>
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
                                    value={info.email || ""}
                                    placeholder="Email"
                                    className="py-5 pl-10"
                                    disabled
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                Mật khẩu mới
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
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                Nhập lại mật khẩu
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                        <Button className="w-full">Tiếp tục và xác nhận tham gia Challenge</Button>
                    </form>
                </>
            ) : (
                <>
                    <img src="/error.png" alt="Error" className="mx-auto h-48 w-48" />
                    <span className="mt-5 text-center font-bold text-red-600">Liên kết không hợp lệ!</span>
                </>
            )}
        </section>
    );
};

export default FormSetPassword;
