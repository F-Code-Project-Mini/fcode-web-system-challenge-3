import { NavLink } from "./NavLink";
import Helper from "~/utils/helper";
import { Scroll, Users } from "lucide-react";
import { useLocation } from "react-router";
const listMenuAdmin = [
    {
        id: "candidates",
        url: "/admin/candidates",
        name: "Quản lý ứng viên",
        Icon: Users,
    },
    {
        id: "teams",
        url: "/admin/teams",
        name: "Quản lý nhóm",
        Icon: Users,
    },
    {
        id: "reports",
        url: "/admin/reports",
        name: "Báo cáo Mentor",
        Icon: Scroll,
    },
];
const AdminHeader = () => {
    const location = useLocation();
    return (
        <>
            {listMenuAdmin.map((menu) => (
                <li id={menu.id} key={menu.id}>
                    <NavLink
                        url={menu.url}
                        name={menu.name}
                        Icon={menu.Icon}
                        active={Helper.isActive(location.pathname, menu.url)}
                    />
                </li>
            ))}
        </>
    );
};

export default AdminHeader;
