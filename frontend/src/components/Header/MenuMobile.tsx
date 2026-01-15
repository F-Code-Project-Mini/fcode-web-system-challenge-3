import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { MobileNavLink } from "./NavLink";
import { House, Send, ServerCrash, Users } from "lucide-react";
import Helper from "~/utils/helper";
import useAuth from "~/hooks/useAuth";

const MenuMobileHeader = ({
    setShowMobileMenu,
}: {
    setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { isLogin, user, logout } = useAuth();
    return (
        <div className="mt-4 border-t border-gray-100 pt-4 lg:hidden">
            <nav className="space-y-1">
                <MobileNavLink
                    url="/"
                    name="Trang chủ"
                    Icon={House}
                    active={Helper.isActive(location.pathname, "/")}
                    onClick={() => setShowMobileMenu(false)}
                />

                {isLogin && (
                    <>
                        {/* <MobileNavLink
                            url="/presents"
                            name="Lịch thuyết trình"
                            Icon={Presentation}
                            active={Helper.isActive(location.pathname, "/presents")}
                            onClick={() => setShowMobileMenu(false)}
                        /> */}
                        <MobileNavLink
                            url="/submissions"
                            name="Nộp sản phẩm"
                            Icon={Send}
                            active={Helper.isActive(location.pathname, "/submissions")}
                            onClick={() => setShowMobileMenu(false)}
                        />
                        <MobileNavLink
                            url="/teams"
                            name="Danh sách nhóm"
                            Icon={Users}
                            active={Helper.isActive(location.pathname, "/teams")}
                            onClick={() => setShowMobileMenu(false)}
                        />
                    </>
                )}
                <MobileNavLink
                    url="https://discord.gg/WvudrJaYD"
                    name="Hỗ trợ sự cố"
                    Icon={ServerCrash}
                    target="_blank"
                    onClick={() => setShowMobileMenu(false)}
                />
            </nav>

            {isLogin ? (
                <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100/60 to-gray-500 text-sm font-semibold text-gray-700">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-2 space-y-1">
                        <button
                            onClick={() => {
                                setShowMobileMenu(false);
                                logout();
                            }}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-4 border-t border-gray-100 pt-4">
                    <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                        <Button className="w-full">Đăng nhập</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MenuMobileHeader;
