import { useNavigate, useParams } from "react-router";
import type { CandidateType, TeamType } from "~/types/team.types";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import ResultBadge from "~/components/ResultBadge";

type ParamsBarem = {
    id: string;
    roomId: string;
    candidateId?: string;
};
export const ShowCandidates = ({
    candidates,
    candidateActive,
    setcandidateActive,
}: {
    candidates: TeamType | undefined;
    candidateActive: CandidateType | undefined;
    setcandidateActive: React.Dispatch<React.SetStateAction<CandidateType | undefined>>;
}) => {
    const params = useParams<ParamsBarem>();
    const navigate = useNavigate();
    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <h3 className="text-primary mb-4 text-base font-bold sm:text-lg">Danh sách ứng viên</h3>
            <RadioGroup
                value={candidateActive?.id}
                onValueChange={(id) => {
                    setcandidateActive(candidates?.candidates.find((candidate) => candidate.id === id));
                    navigate(`/judge/room/${params.roomId}/team/${params.id}/candidate/${id}`);
                }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
                {candidates?.candidates.map((candidate) => {
                    const isLeader = candidates.leaderId === candidate.id;
                    return (
                        <label
                            key={candidate.id}
                            htmlFor={candidate.id}
                            className={`relative flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-all ${
                                candidate.id === candidateActive?.id
                                    ? "border-primary/50 bg-gray-50"
                                    : "hover:border-primary/50 border-gray-200 hover:bg-gray-50"
                            } ${candidate.statusC3 === "FAILED" ? "opacity-50" : ""}`}
                        >
                            <RadioGroupItem
                                disabled={candidate.statusC3 === "FAILED"}
                                value={candidate.id}
                                id={candidate.id}
                            />
                            <div className="flex flex-col gap-1">
                                <span className="flex-1 cursor-pointer text-sm font-medium text-gray-900">
                                    {candidate.user.fullName}
                                </span>
                                <span className="text-xs italic">{isLeader ? "Trưởng nhóm" : "Thành viên"}</span>
                            </div>

                            {candidate.statusC3 !== "WAITING" && <ResultBadge status={candidate.statusC3} />}
                        </label>
                    );
                })}
            </RadioGroup>
        </div>
    );
};
