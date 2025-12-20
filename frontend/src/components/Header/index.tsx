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
        <header className="sticky top-2 z-50 mt-5 rounded-xl border border-gray-100 bg-white/80 px-4 py-3 shadow-xs backdrop-blur-md sm:mx-4 md:px-6">
            <div className="mx-auto flex max-w-7xl items-center">
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-2.5">
                    <img src="/fcode.png" alt="F-Code" className="h-7 w-7 sm:h-8 sm:w-8" />
                    <span className="text-primary text-lg font-bold sm:text-xl">F-Code</span>
                </Link>

                <nav className="ml-10 hidden lg:block">
                    <ul className="flex items-center gap-1">
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

                <div className="ml-auto hidden items-center gap-2 lg:flex">
                    {isLogin ? (
                        <div className="relative" ref={menuRef}>
                            <div className="flex items-center gap-2">
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
                                {user.role === USER_ROLE.CANDIDATE && (
                                    <div
                                        className="cursor-pointer rounded-xl border bg-white px-2 py-1 shadow-2xs"
                                        onClick={showAgainInstruction}
                                    >
                                        <BadgeQuestionMark />
                                    </div>
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
                    className="ml-auto flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
                >
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {showMobileMenu && <MenuMobileHeader setShowMobileMenu={setShowMobileMenu} />}
        </header>
    );
};

export default Header;
