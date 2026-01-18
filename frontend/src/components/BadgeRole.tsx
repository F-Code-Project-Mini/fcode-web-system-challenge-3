import type { RoleType } from "~/types/user.types";

const BadgeRole = ({ role }: { role: RoleType }) => {
    const roleConfig = {
        CANDIDATE: {
            label: "Ứng viên",
            className: "text-blue-700 bg-blue-50 border border-blue-200",
        },
        MENTOR: {
            label: "Mentor",
            className: "text-purple-700 bg-purple-50 border border-purple-200",
        },
        JUDGE: {
            label: "Giám khảo",
            className: "text-orange-700 bg-orange-50 border border-orange-200",
        },
        HOST: {
            label: "Người điều phối",
            className: "text-green-700 bg-green-50 border border-green-200",
        },
        ADMIN: {
            label: "Admin",
            className: "text-red-700 bg-red-50 border border-red-200",
        },
    };

    const config = roleConfig[role];

    return <span className={`${config.className} rounded-md px-2 py-0.5 text-xs font-medium`}>{config.label}</span>;
};

export default BadgeRole;
