import { NavLink } from "./NavLink";
import { ServerCrash } from "lucide-react";

const CandidateHeader = () => {
    // const location = useLocation();
    return (
        <>
            <li>
                <NavLink url="https://discord.gg/WvudrJaYD" name="Hỗ trợ" Icon={ServerCrash} target="_blank" />
            </li>
        </>
    );
};

export default CandidateHeader;
