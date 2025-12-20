import { NavLink } from "./NavLink";
import { Send, ServerCrash, Trophy } from "lucide-react";
import Helper from "~/utils/helper";

const CandidateHeader = () => {
    return (
        <>
            <li id="scoreboard">
                <NavLink
                    url="/scoreboard"
                    name="Bảng điểm"
                    Icon={Trophy}
                    active={Helper.isActive(location.pathname, "/scoreboard")}
                />
            </li>
            <li id="submissions">
                <NavLink
                    url="/submissions"
                    name="Nộp đề tài"
                    Icon={Send}
                    active={Helper.isActive(location.pathname, "/submissions")}
                />
            </li>

            <li>
                <NavLink url="https://discord.gg/WvudrJaYD" name="Hỗ trợ" Icon={ServerCrash} target="_blank" />
            </li>
        </>
    );
};

export default CandidateHeader;
