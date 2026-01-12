import Helper from "~/utils/helper";
import { NavLink } from "./NavLink";
import { Presentation, Send } from "lucide-react";
import { useLocation } from "react-router";

const CandidateHeader = () => {
    const location = useLocation();
    return (
        <>
            <li id="submissions">
                <NavLink
                    url="/submissions"
                    name="Đăng ký thuyết trình"
                    Icon={Presentation}
                    active={Helper.isActive(location.pathname, "/submissions")}
                />
            </li>
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
