import { NavLink } from "./NavLink";
import Helper from "~/utils/helper";
import { School, Users } from "lucide-react";
import { useLocation } from "react-router";
const listMenuAdmin = [
    {
        id: "users",
        url: "/admin/users",
        name: "Người dùng",
        Icon: Users,
    },

    {
        id: "rooms",
        url: "/admin/rooms",
        name: "Phòng chấm",
        Icon: School,
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
