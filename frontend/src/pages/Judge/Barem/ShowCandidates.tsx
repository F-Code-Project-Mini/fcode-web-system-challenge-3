import { useNavigate, useParams } from "react-router";
import type { CandidateType, TeamType } from "~/types/team.types";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
type ParamsBarem = {
    id: string;
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
            <h3 className="text-primary mb-4 text-base font-bold sm:text-lg">Ứng viên</h3>
            <RadioGroup
                value={candidateActive?.id}
                onValueChange={(id) => {
                    setcandidateActive(candidates?.candidates.find((candidate) => candidate.id === id));
                    navigate(`/judge/team/${params.id}/candidate/${id}`);
                }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
                {candidates?.candidates.map((candidate) => (
                    <label
                        key={candidate.id}
                        htmlFor={candidate.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-all ${
                            candidate.id === candidateActive?.id
                                ? "border-primary/50 bg-gray-50"
                                : "hover:border-primary/50 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        <RadioGroupItem value={candidate.id} id={candidate.id} />
                        <span className="flex-1 cursor-pointer text-sm font-medium text-gray-900">
                            {candidate.user.fullName}
                        </span>
                    </label>
                ))}
            </RadioGroup>
        </div>
    );
};
