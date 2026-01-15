import Helper from "~/utils/helper";
import { NavLink } from "./NavLink";
import { Send } from "lucide-react";
import { useLocation } from "react-router";

const CandidateHeader = () => {
    const location = useLocation();
    return (
        <>
            {/* <li id="presents">
                <NavLink
                    url="/presents"
                    name="Lịch thuyết trình"
                    Icon={Presentation}
                    active={Helper.isActive(location.pathname, "/presents")}
                />
            </li> */}
            <li id="submissions">
                <NavLink
                    url="/submissions"
                    name="Nộp sản phẩm"
                    Icon={Send}
                    active={Helper.isActive(location.pathname, "/submissions")}
                />
            </li>
        </>
    );
};

export default CandidateHeader;
