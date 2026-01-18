import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useCallback, useEffect, useRef, useState } from "react";
import { Note } from "./Note";
import { useQuery } from "@tanstack/react-query";
import MentorApi from "~/api-requests/mentor.requests";
import TeamApi from "~/api-requests/team.requests";
import { useNavigate, useParams } from "react-router";
import { socket } from "~/utils/socket";
import useAuth from "~/hooks/useAuth";
import type { CandidateType } from "~/types/team.types";
import { BadgeCheck } from "lucide-react";
import BadgeLeader from "~/components/BadgeLeader";
import Notification from "./Notification";
type ParamsBarem = {
    id: string;
    candidateId?: string;
};
const MentorBaremPage = () => {
    const params = useParams<ParamsBarem>();

    const { user } = useAuth();
    const navigate = useNavigate();
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const isDataInitialized = useRef(false);

    const debounceMapRef = useRef<Record<string, number>>({});
    const debounceNoteMapRef = useRef<Record<string, number>>({});

    const { data: candidates } = useQuery({
        queryKey: ["mentor", "get-team", params.id],
        queryFn: async () => {
            const res = await TeamApi.getTeamById(params.id || "");
            return res.result;
        },
        enabled: !!params.id,
    });
    const isLeader = params?.candidateId === candidates?.leader?.id;
    // console.log("isLeader", params?.candidateId, isLeader);

    const [candidateActive, setcandidateActive] = useState<CandidateType | undefined>(undefined);

    useEffect(() => {
        if (!candidateActive && candidates?.candidates?.length) {
            setcandidateActive(
                candidates.candidates.find((c) => c.id === params.candidateId) || candidates.candidates[0],
            );
            // reset scores and cell status when candidate changes
        }
        // Reset flag khi chuyển candidate
        isDataInitialized.current = false;
    }, [candidates, candidateActive, params.candidateId]);

    const { data: baremMentor } = useQuery({
        queryKey: ["mentor-barem", candidateActive, params.candidateId],
        queryFn: async () => {
            const res = await MentorApi.getBarem(candidateActive?.id || "");
            return res.result;
        },
        enabled: !!candidateActive,
    });

    // Reset lại data (k reset chuyển cái khác nó vẫn giữ lại data cũ của ứng viên khác)
    useEffect(() => {
        if (!baremMentor) return;

        const newScores: { [key: string]: number } = {};
        const newNotes: { [key: string]: string } = {};
        baremMentor.forEach((item) => {
            item.partitions.forEach((partition, partitionIndex) => {
                partition.partitions?.forEach((subPart, subIndex) => {
                    const scoreKey = `${item.target}-${partitionIndex}-${subIndex}`;
                    if (subPart.scoreCurrent !== undefined && subPart.scoreCurrent !== null) {
                        newScores[scoreKey] = subPart.scoreCurrent;
                    }

                    if (subPart.note !== undefined && subPart.note !== null) {
                        newNotes[scoreKey] = subPart.note;
                    }
                });
            });
        });

        setScores(newScores);
        setNotes(newNotes);

        // Đánh dấu data đã được initialized để tránh emit socket không cần thiết
        setTimeout(() => {
            isDataInitialized.current = true;
        }, 100);
    }, [baremMentor]);

    const totalMaxScore =
        baremMentor?.reduce((sum, item) => {
            if (!isLeader && item.target == "Leader") {
                return sum;
            }
            return (
                sum +
                item.partitions.reduce((partSum, partition) => {
                    return (
                        partSum + (partition.partitions?.reduce((subSum, subPart) => subSum + subPart.maxScore, 0) || 0)
                    );
                }, 0)
            );
        }, 0) ?? 0;

    const totalCurrentScore = Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);

    const handleScoreChange = (key: string, value: string) => {
        const num = parseFloat(value);

        setScores((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : num,
        }));
    };
    const handleNoteChange = useCallback((key: string, note: string) => {
        setNotes((prev) => ({
            ...prev,
            [key]: note,
        }));
    }, []);

    useEffect(() => {
        if (!socket.connected) socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    // useEffect riêng cho scores
    useEffect(() => {
        if (!baremMentor || !candidateActive || !isDataInitialized.current) return;

        Object.entries(scores).forEach(([key, score]) => {
            const [target, partitionIndex, subIndex] = key.split("-");
            const partition = baremMentor?.find((item) => item.target === target)?.partitions[Number(partitionIndex)];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) return;

            if (debounceMapRef.current[subPart.code]) {
                clearTimeout(debounceMapRef.current[subPart.code]);
            }

            debounceMapRef.current[subPart.code] = setTimeout(() => {
                socket.emit("SAVE_SCORE", {
                    role: "MENTOR",
                    type: "PROCESSING",
                    mentorId: user.id,
                    candidateId: candidateActive.id,
                    codeBarem: subPart.code,
                    score,
                    note: notes[key] || "",
                });
            }, 500);
        });
    }, [scores, baremMentor, candidateActive, user.id, notes]);

    // useEffect riêng cho notes
    useEffect(() => {
        if (!baremMentor || !candidateActive || !isDataInitialized.current) return;

        Object.entries(notes).forEach(([key, note]) => {
            const [target, partitionIndex, subIndex] = key.split("-");
            const partition = baremMentor?.find((item) => item.target === target)?.partitions[Number(partitionIndex)];
            const subPart = partition?.partitions?.[Number(subIndex)];

            if (!subPart) return;

            if (debounceNoteMapRef.current[subPart.code]) {
                clearTimeout(debounceNoteMapRef.current[subPart.code]);
            }

            debounceNoteMapRef.current[subPart.code] = setTimeout(() => {
                socket.emit("SAVE_SCORE", {
                    role: "MENTOR",
                    type: "PROCESSING",
                    mentorId: user.id,
                    candidateId: candidateActive.id,
                    codeBarem: subPart.code,
                    score: scores[key] || 0,
                    note: note,
                });
            }, 500);
        });
    }, [notes, baremMentor, candidateActive, user.id, scores]);

    return (
        <section className="px-4 sm:px-0">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Mentor chấm điểm Challenge 3</h1>
                <p className="mt-2 text-sm text-gray-600">Vui lòng chọn ứng viên và điền điểm cho từng tiêu chí</p>
            </div>

            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-xs sm:p-6">
                <h3 className="text-primary mb-4 text-base font-semibold sm:text-lg">Ứng viên</h3>
                <RadioGroup
                    value={candidateActive?.id}
                    onValueChange={(id) => {
                        setcandidateActive(candidates?.candidates.find((candidate) => candidate.id === id));
                        navigate(`/mentor/team/${params.id}/candidate/${id}`);
                    }}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {candidates?.candidates.map((candidate) => (
                        <label
                            key={candidate.id}
                            htmlFor={candidate.id}
                            className="hover:border-primary/50 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50"
                        >
                            <RadioGroupItem value={candidate.id} id={candidate.id} />
                            <span className="flex-1 cursor-pointer text-sm font-medium text-gray-900">
                                {candidate.user.fullName}
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <Notification />

            <section className="my-6" id="barem-table">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                                ỨNG VIÊN: <span className="text-primary">{candidateActive?.user.fullName}</span>
                            </h2>
                            {isLeader && <BadgeLeader />}
                        </div>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Vui lòng nhập điểm cho từng tiêu chí dưới đây
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="sticky top-0 bg-gray-50">
                                <tr className="divide-x divide-gray-200">
                                    <th className="w-28 px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Đối tượng
                                    </th>
                                    <th className="w-40 px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Tiêu chí
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Mô tả
                                    </th>
                                    <th className="w-32 px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Điểm
                                    </th>
                                    <th className="w-10 px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {baremMentor?.flatMap((item) => {
                                    let targetRowIndex = 0;
                                    const totalSubPartitions = item.partitions.reduce(
                                        (sum, partition) => sum + (partition.partitions?.length || 0),
                                        0,
                                    );
                                    if (!isLeader && item.target == "Leader") {
                                        return null;
                                    }

                                    return item.partitions.flatMap((partition, partitionIndex) => {
                                        const subPartitions = partition.partitions || [];
                                        const criteriaRowSpan = subPartitions.length;

                                        return subPartitions.map((subPart, subIndex) => {
                                            const scoreKey = `${item.target}-${partitionIndex}-${subIndex}`;
                                            const isFirstSubPart = subIndex === 0;
                                            const isFirstPartition = targetRowIndex === 0;

                                            const isInvalidScore = scores[scoreKey] > subPart.maxScore;

                                            const row = (
                                                <tr
                                                    key={scoreKey}
                                                    className="divide-x divide-gray-100 transition-colors hover:bg-gray-50/50"
                                                >
                                                    {isFirstPartition && (
                                                        <td
                                                            rowSpan={totalSubPartitions}
                                                            className="bg-primary/5 border-r-2 border-gray-200 px-4 py-4 text-center"
                                                        >
                                                            <span className="text-primary text-base font-bold">
                                                                {item.target}
                                                            </span>
                                                        </td>
                                                    )}

                                                    {isFirstSubPart && (
                                                        <td
                                                            rowSpan={criteriaRowSpan}
                                                            className="bg-gray-50/70 px-4 py-4 text-center"
                                                        >
                                                            <span className="text-sm font-semibold text-gray-800">
                                                                {partition.criteria}
                                                            </span>
                                                        </td>
                                                    )}

                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-1">
                                                            {scores[scoreKey] > 0 && (
                                                                <BadgeCheck
                                                                    className="inline-block text-green-600"
                                                                    size={16}
                                                                />
                                                            )}
                                                            <div
                                                                className={`text-sm leading-relaxed ${isInvalidScore ? "text-red-600" : "text-gray-700"}`}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `${subPart.description}` || "—",
                                                                }}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max={subPart.maxScore}
                                                                step="0.5"
                                                                value={scores[scoreKey] || ""}
                                                                onChange={(e) =>
                                                                    handleScoreChange(scoreKey, e.target.value)
                                                                }
                                                                placeholder="0"
                                                                className={`w-16 rounded border px-2 py-1.5 text-center text-sm ${isInvalidScore ? "border-red-500 text-red-500" : "focus:border-primary focus:ring-primary border-gray-300 transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"}`}
                                                            />
                                                            <span
                                                                className={`text-sm font-medium ${isInvalidScore ? "text-red-600" : "text-gray-600"}`}
                                                            >
                                                                / {subPart.maxScore}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="cursor-pointer px-4 py-3 text-center">
                                                        <Note
                                                            keyId={scoreKey}
                                                            handleNoteChange={handleNoteChange}
                                                            note={notes[scoreKey] || ""}
                                                            candidateId={candidateActive?.id || ""}
                                                            codeBarem={subPart.code}
                                                        />
                                                    </td>
                                                </tr>
                                            );

                                            targetRowIndex++;
                                            return row;
                                        });
                                    });
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <TotalScore totalCurrentScore={totalCurrentScore} totalMaxScore={totalMaxScore} />
        </section>
    );
};

const TotalScore = ({ totalCurrentScore, totalMaxScore }: { totalCurrentScore: number; totalMaxScore: number }) => (
    <div className="my-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-md font-semibold text-gray-700 sm:text-lg">Tổng điểm:</span>
                <span
                    className={`${
                        totalCurrentScore <= totalMaxScore ? "text-primary" : "text-red-600"
                    } text-2xl font-bold sm:text-3xl`}
                >
                    {totalCurrentScore.toFixed(1)}
                </span>
                <span className="text-lg font-medium text-gray-600">/ {totalMaxScore}</span>
            </div>
            <span className="text-xs italic">Leader luôn cao hơn member tối đa là 15đ</span>
        </div>
        <span className="font-bold italic">Điểm được lưu tự động</span>
    </div>
);

export default MentorBaremPage;
