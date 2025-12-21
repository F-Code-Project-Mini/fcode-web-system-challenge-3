import type { LucideProps } from "lucide-react";
import { Link } from "react-router";

export const NavLink = ({
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

export const MobileNavLink = ({
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
