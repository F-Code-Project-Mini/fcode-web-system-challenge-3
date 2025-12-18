import { ChevronDown, House, Send, Trophy, type LucideProps } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuth from "~/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import SubmenuHeader from "./Submenu";
import { Button } from "../ui/button";

const Header = () => {
    const location = useLocation();
    const { isLogin, user } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
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
        <header className="sticky top-2 z-50 mt-5 rounded-xl border-1 border-gray-100 bg-white/80 px-6 py-2 shadow-xs backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
                        <img src="/fcode.png" alt="F-Code" className="h-8 w-8" />
                        <span className="text-primary text-xl font-bold">F-Code</span>
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-1">
                            <li>
                                <NavLink
                                    url="/"
                                    name="Trang chủ"
                                    Icon={House}
                                    active={isActive(location.pathname, "/")}
                                />
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
                        </ul>
                    </nav>
                </div>
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
}: {
    url: string;
    name: string;
    active?: boolean;
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}) => (
    <Link
        to={url}
        className={`group relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
            active ? "text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
        {Icon && <Icon size={16} strokeWidth={2.2} />}
        <span>{name}</span>
        {active && <div className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" />}
    </Link>
);

export default Header;
