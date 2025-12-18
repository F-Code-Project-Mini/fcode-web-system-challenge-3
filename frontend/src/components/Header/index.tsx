import { ChevronDown, House, Menu, Send, ServerCrash, Trophy, X, type LucideProps } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuth from "~/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import SubmenuHeader from "./Submenu";
import { Button } from "../ui/button";

const Header = () => {
    const location = useLocation();
    const { isLogin, user } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-2 z-50 mx-2 mt-5 rounded-xl border border-gray-100 bg-white/80 px-4 py-3 shadow-xs backdrop-blur-md sm:mx-4 md:px-6">
            <div className="mx-auto flex max-w-7xl items-center">
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-2.5">
                    <img src="/fcode.png" alt="F-Code" className="h-7 w-7 sm:h-8 sm:w-8" />
                    <span className="text-primary text-lg font-bold sm:text-xl">F-Code</span>
                </Link>

                <nav className="ml-10 hidden lg:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <NavLink url="/" name="Trang chủ" Icon={House} active={isActive(location.pathname, "/")} />
                        </li>
                        {isLogin && (
                            <>
                                <li id="scoreboard">
                                    <NavLink
                                        url="/scoreboard"
                                        name="Bảng điểm"
                                        Icon={Trophy}
                                        active={isActive(location.pathname, "/scoreboard")}
                                    />
                                </li>
                                <li id="submissions">
                                    <NavLink
                                        url="/submissions"
                                        name="Nộp đề tài"
                                        Icon={Send}
                                        active={isActive(location.pathname, "/submissions")}
                                    />
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink
                                url="https://discord.gg/WvudrJaYD"
                                name="Hỗ trợ"
                                Icon={ServerCrash}
                                target="_blank"
                            />
                        </li>
                    </ul>
                </nav>

                <div className="ml-auto hidden items-center gap-2 lg:flex">
                    {isLogin ? (
                        <div className="relative" ref={menuRef}>
                            <div
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="group cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-500 text-sm font-semibold text-gray-700">
                                        {user.fullName.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user.fullName}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-500 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </div>
                            {showUserMenu && <SubmenuHeader setShowUserMenu={setShowUserMenu} />}
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button>Đăng nhập</Button>
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="ml-auto flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
                >
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {showMobileMenu && (
                <div className="mt-4 border-t border-gray-100 pt-4 lg:hidden">
                    <nav className="space-y-1">
                        <MobileNavLink
                            url="/"
                            name="Trang chủ"
                            Icon={House}
                            active={isActive(location.pathname, "/")}
                            onClick={() => setShowMobileMenu(false)}
                        />
                        {isLogin && (
                            <>
                                <MobileNavLink
                                    url="/scoreboard"
                                    name="Bảng điểm"
                                    Icon={Trophy}
                                    active={isActive(location.pathname, "/scoreboard")}
                                    onClick={() => setShowMobileMenu(false)}
                                />
                                <MobileNavLink
                                    url="/submissions"
                                    name="Nộp đề tài"
                                    Icon={Send}
                                    active={isActive(location.pathname, "/submissions")}
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
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-500 text-sm font-semibold text-gray-700">
                                    {user.fullName.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-2 space-y-1">
                                <Link
                                    to="/profile"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Thông tin cá nhân
                                </Link>
                                <Link
                                    to="/settings"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Cài đặt
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowMobileMenu(false);
                                        console.log("Logout");
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
            )}
        </header>
    );
};

const isActive = (src: string, dest: string) => {
    return src === dest;
};

const NavLink = ({
    url,
    name,
    active = false,
    Icon,
    target,
}: {
    url: string;
    name: string;
    active?: boolean;
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    target?: string;
}) => (
    <Link
        to={url}
        className={`group relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
            active ? "text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
        target={target}
    >
        {Icon && <Icon size={16} strokeWidth={2.2} />}
        <span>{name}</span>
        {active && <div className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" />}
    </Link>
);

const MobileNavLink = ({
    url,
    name,
    active = false,
    Icon,
    target,
    onClick,
}: {
    url: string;
    name: string;
    active?: boolean;
    target?: string;
    onClick?: () => void;
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}) => (
    <Link
        to={url}
        target={target}
        onClick={onClick}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            active ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-50"
        }`}
    >
        {Icon && <Icon size={18} strokeWidth={2.2} />}
        <span>{name}</span>
    </Link>
);

export default Header;
