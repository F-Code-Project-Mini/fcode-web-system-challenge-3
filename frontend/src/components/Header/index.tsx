import { BadgeQuestionMark, ChevronDown, House, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuth from "~/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import SubmenuHeader from "./Submenu";
import { Button } from "../ui/button";
import { USER_ROLE } from "~/constants/enums";
import LocalStorage from "~/utils/localstorage";
import { NavLink } from "./NavLink";
import Helper from "~/utils/helper";
import MenuMobileHeader from "./MenuMobile";
import CandidateHeader from "./Candidate";
import AdminHeader from "./Admin";

const Header = () => {
    const location = useLocation();
    const { isLogin, user } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const showAgainInstruction = () => {
        LocalStorage.removeItem("isInstruction");
        window.location.reload();
    };

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
        <header className="sticky top-3 z-50 mt-6 rounded-lg border border-gray-200/60 bg-white/95 px-5 py-3.5 backdrop-blur-xl transition-all sm:mx-6 md:px-7">
            <div className="mx-auto flex max-w-7xl items-center">
                <Link to="/" className="group flex items-center gap-2.5 transition-all sm:gap-3">
                    <div className="relative">
                        <img
                            src="/fcode.png"
                            alt="F-Code"
                            className="h-8 w-8 transition-transform group-hover:scale-105 sm:h-9 sm:w-9"
                        />
                        <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-md transition-opacity group-hover:opacity-100"></div>
                    </div>
                    <span className="text-primary text-xl font-bold tracking-tight sm:text-2xl">F-Code</span>
                </Link>

                <nav className="ml-12 hidden lg:block">
                    <ul className="flex items-center gap-2">
                        <li>
                            <NavLink
                                url="/"
                                name="Trang chủ"
                                Icon={House}
                                active={Helper.isActive(location.pathname, "/")}
                            />
                        </li>
                        {isLogin && user.role === USER_ROLE.CANDIDATE && <CandidateHeader />}
                        {isLogin && user.role === USER_ROLE.ADMIN && <AdminHeader />}
                    </ul>
                </nav>

                <div className="ml-auto hidden items-center gap-3 lg:flex">
                    {isLogin ? (
                        <div className="relative" ref={menuRef}>
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="group cursor-pointer rounded-lg px-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="from-primary/20 to-primary/40 text-primary ring-primary/10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold ring-2 transition-all group-hover:ring-4">
                                            {user.fullName.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{user.fullName}</span>
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-500 transition-all ${showUserMenu ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                </div>
                                {user.role === USER_ROLE.CANDIDATE && (
                                    <button
                                        className="hover:border-primary hover:bg-primary/5 hover:text-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-xs transition-all"
                                        onClick={showAgainInstruction}
                                    >
                                        <BadgeQuestionMark size={18} />
                                    </button>
                                )}
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
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-all hover:bg-gray-100 lg:hidden"
                >
                    {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {showMobileMenu && <MenuMobileHeader setShowMobileMenu={setShowMobileMenu} />}
        </header>
    );
};

export default Header;
