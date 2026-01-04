import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useEffect, useRef, useState } from "react";
import { Note } from "./Note";
import { useQuery } from "@tanstack/react-query";
import MentorApi from "~/api-requests/mentor.requests";
import TeamApi from "~/api-requests/team.requests";
import { useParams } from "react-router";
import { socket } from "~/utils/socket";
import useAuth from "~/hooks/useAuth";
type CellStatus = "idle" | "saving" | "saved" | "error";
const MentorBaremPage = () => {
    const params = useParams();
    const { user } = useAuth();
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [cellStatus, setCellStatus] = useState<Record<string, CellStatus>>({});

    const debounceMapRef = useRef<Record<string, number>>({});

    const { data: candidates } = useQuery({
        queryKey: ["mentor", "get-team", params.id],
        queryFn: async () => {
            const res = await TeamApi.getTeamById(params.id || "");
            return res.result;
        },
        enabled: !!params.id,
    });

    const [selectedCandidate, setSelectedCandidate] = useState<string>("");

    useEffect(() => {
        if (!selectedCandidate && candidates?.candidates?.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedCandidate(candidates.candidates[0].id);
            // reset scores and cell status when candidate changes
        }
    }, [candidates, selectedCandidate]);

    const { data: mentorJudge } = useQuery({
        queryKey: ["mentor-barem", selectedCandidate],
        queryFn: async () => {
            const res = await MentorApi.getBarem(selectedCandidate);
            return res.result;
        },
        enabled: !!selectedCandidate,
    });

    // Reset lại data (k reset chuyển cái khác nó vẫn giữ lại data cũ của ứng viên khác)
    useEffect(() => {
        if (!mentorJudge) return;

        const newScores: { [key: string]: number } = {};
        mentorJudge.forEach((item) => {
            item.partitions.forEach((part, index) => {
                const scoreKey = `${item.target}-${index}`;
                if (part.scoreCurrent !== undefined && part.scoreCurrent !== null) {
                    newScores[scoreKey] = part.scoreCurrent;
                }
            });
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScores(newScores);
        setCellStatus({});
    }, [mentorJudge]);

    const totalMaxScore =
        mentorJudge?.reduce((sum, item) => {
            return sum + item.partitions.reduce((partSum, part) => partSum + part.maxScore, 0);
        }, 0) ?? 0;

    const totalCurrentScore = Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);

    const handleScoreChange = (key: string, value: string) => {
        const num = parseFloat(value);

        setScores((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : num,
        }));

        setCellStatus((prev) => ({
            ...prev,
            [key]: "saving",
        }));
    };

    useEffect(() => {
        if (!socket.connected) socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!mentorJudge || !selectedCandidate) return;

        Object.entries(scores).forEach(([key, score]) => {
            const [target, index] = key.split("-");
            const part = mentorJudge?.find((item) => item.target === target)?.partitions[Number(index)];
            if (!part) return;
            if (debounceMapRef.current[part.code]) {
                clearTimeout(debounceMapRef.current[part.code]);
            }

            debounceMapRef.current[part.code] = window.setTimeout(() => {
                socket.emit("SAVE_SCORE", {
                    mentorId: user.id,
                    candidateId: selectedCandidate,
                    codeBarem: part.code,
                    score,
                    note: "",
                });
            }, 500);
        });
    }, [scores, mentorJudge, selectedCandidate, user.id]);

    useEffect(() => {
        const onSaved = (payload: { codeBarem: string }) => {
            const key = payload.codeBarem;

            setCellStatus((prev) => ({
                ...prev,
                [key]: "saved",
            }));

            window.setTimeout(() => {
                setCellStatus((prev) => ({
                    ...prev,
                    [key]: "idle",
                }));
            }, 1500);
        };

        const onError = (payload: { codeBarem: string }) => {
            setCellStatus((prev) => ({
                ...prev,
                [payload.codeBarem]: "error",
            }));
        };

        socket.on("SCORE_SAVED", onSaved);
        socket.on("SAVE_SCORE_ERROR", onError);

        return () => {
            socket.off("SCORE_SAVED", onSaved);
            socket.off("SAVE_SCORE_ERROR", onError);
        };
    }, []);

    return (
        <section className="px-4 sm:px-0">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Mentor chấm điểm Challenge 3</h1>
                <p className="mt-2 text-sm text-gray-600">Vui lòng chọn ứng viên và điền điểm cho từng tiêu chí</p>
            </div>

            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-xs sm:p-6">
                <h3 className="text-primary mb-4 text-base font-semibold sm:text-lg">Ứng viên</h3>
                <RadioGroup
                    value={selectedCandidate}
                    onValueChange={setSelectedCandidate}
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

            <section className="my-6" id="barem-table">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-4 sm:px-6">
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                            ỨNG VIÊN:{" "}
                            <span className="text-primary">
                                {candidates?.candidates.find((item) => item.id === selectedCandidate)?.user.fullName}
                            </span>
                        </h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Vui lòng nhập điểm cho từng tiêu chí dưới đây
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="sticky top-0 bg-gray-50">
                                <tr className="divide-x divide-gray-200">
                                    <th className="w-32 px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Mục tiêu
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
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
                                {mentorJudge?.flatMap((item) =>
                                    item.partitions.map((part, index) => {
                                        const scoreKey = `${item.target}-${index}`;
                                        return (
                                            <tr
                                                key={scoreKey}
                                                className="divide-x divide-gray-100 transition-colors hover:bg-gray-50"
                                            >
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={item.partitions.length}
                                                        className="align-center bg-gray-50/50 px-4 py-4 text-center"
                                                    >
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {item.target}
                                                        </span>
                                                    </td>
                                                )}

                                                <td className="align-center px-4 py-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {part.criteria}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 align-top">
                                                    <div
                                                        className="text-sm leading-relaxed text-gray-600"
                                                        dangerouslySetInnerHTML={{
                                                            __html: part.description || "—",
                                                        }}
                                                    />
                                                </td>

                                                <td className="px-4 py-4 text-center align-top">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max={part.maxScore}
                                                            step="0.5"
                                                            value={scores[scoreKey] || part?.scoreCurrent || ""}
                                                            onChange={(e) =>
                                                                handleScoreChange(scoreKey, e.target.value)
                                                            }
                                                            placeholder="0"
                                                            className="disabled:focus:border-primary disabled:focus:ring-primary w-16 rounded border border-gray-200 px-2 py-1.5 text-center text-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                                        />
                                                        <span className="text-sm font-medium text-gray-600">
                                                            / {part.maxScore}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 flex min-h-[20px] items-center gap-1 text-xs italic">
                                                        {cellStatus[part?.code] === "saving" && (
                                                            <>
                                                                <svg
                                                                    className="h-4 w-4 animate-spin text-blue-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                                    ></path>
                                                                </svg>
                                                                Đang lưu...
                                                            </>
                                                        )}
                                                        {cellStatus[part?.code] === "saved" && (
                                                            <>
                                                                <svg
                                                                    className="h-4 w-4 text-green-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                                <span>Đã lưu</span>
                                                            </>
                                                        )}
                                                        {cellStatus[part?.code] === "error" && (
                                                            <>
                                                                <svg
                                                                    className="h-4 w-4 text-red-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                                <span>Lỗi lưu</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="cursor-pointer px-4 py-4 align-top">
                                                    <Note note={part?.note} />
                                                </td>
                                            </tr>
                                        );
                                    }),
                                )}
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
        <span className="font-bold italic">Điểm được lưu tự động</span>
    </div>
);

export default MentorBaremPage;
