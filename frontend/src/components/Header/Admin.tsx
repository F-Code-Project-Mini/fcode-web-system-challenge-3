import { NavLink } from "./NavLink";
import Helper from "~/utils/helper";
import { Form, Scroll, Users } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useLocation } from "react-router";
const listMenuAdmin = [
    {
        id: "teams",
        url: "/admin/teams",
        name: "Quản lý nhóm",
        Icon: Users,
    },
    {
        id: "topics",
        url: "/admin/topics",
        name: "Quản lý đề",
        Icon: Form,
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
