import React from "react";
import { Note } from "./Note";
import { Link } from "react-router";
import { BadgeCheck, MessageCircle, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ShowResume } from "~/components/ShowResume";
import type { CandidateType } from "~/types/team.types";

type BaremItem = {
    target: string;
    partitions: {
        criteria: string;
        partitions?: {
            code: string;
            description: string;
            maxScore: number;
            scoreCurrent?: number;
            note?: string;
        }[];
    }[];
};

interface PersonalBaremProps {
    scaleBarem: boolean;
    setScaleBarem: React.Dispatch<React.SetStateAction<boolean>>;
    baremJudge?: BaremItem[];
    scores: { [key: string]: number };
    handleScoreChange: (key: string, value: string) => void;
    notes: { [key: string]: string };
    handleNoteChange: (key: string, note: string) => void;
    totalCurrentScore: number;
    totalMaxScore: number;
    candidateActive?: CandidateType;
    isLeader: boolean;
}

const PersonalBarem = ({
    scaleBarem,
    setScaleBarem,
    baremJudge,
    scores,
    handleScoreChange,
    notes,
    handleNoteChange,
    totalCurrentScore,
    totalMaxScore,
    candidateActive,
    isLeader,
}: PersonalBaremProps) => {
    return (
        <div>
            <h3 className="text-primary mt-6 text-2xl font-bold italic">1/2. Bảng điểm cá nhân</h3>
            <section
                className={`relative left-1/2 mt-2 mb-6 -translate-x-1/2 ${scaleBarem ? "md:w-[95vw] xl:w-[98vw]" : ""}`}
                id="barem-table"
            >
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                    <div className="border-b border-gray-200 bg-linear-to-r from-gray-50 to-white px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                                [CÁ NHÂN] ỨNG VIÊN:{" "}
                                <span className="text-primary">{candidateActive?.user.fullName}</span>
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Vui lòng nhập điểm cho từng tiêu chí dưới đây
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 px-4 py-4">
                        <div className="flex flex-col gap-1">
                            <div className="mb-2">
                                <h3 className="text-left">Tài nguyên các vòng trước</h3>
                            </div>
                            <div className="flex gap-2">
                                {candidateActive?.resume?.filePath && (
                                    <ShowResume
                                        urlPdf={candidateActive?.resume?.filePath}
                                        name={candidateActive?.user.fullName}
                                    />
                                )}
                                {candidateActive?.interview?.filePath && (
                                    <Button asChild>
                                        <Link to={candidateActive?.interview?.filePath} target="_blank">
                                            <MessageCircle /> Challenge 2
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setScaleBarem(!scaleBarem)}
                        className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full p-0 text-white hover:bg-gray-100"
                    >
                        {scaleBarem ? <ZoomOut /> : <ZoomIn />}
                    </Button>

                    <div className="overflow-x-auto">
                        <table className="w-full">
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
                                {baremJudge?.flatMap((item) => {
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
                                                            className={`border-r-2 border-gray-200 bg-neutral-50/10 px-4 py-4 text-center ${scaleBarem ? "whitespace-nowrap" : "min-w-40"}`}
                                                        >
                                                            <span className="text-primary text-base font-bold">
                                                                {item.target}
                                                            </span>
                                                        </td>
                                                    )}

                                                    {isFirstSubPart && (
                                                        <td
                                                            rowSpan={criteriaRowSpan}
                                                            className={`bg-neutral-50/5 px-4 py-4 ${scaleBarem ? "whitespace-nowrap" : "min-w-60"}`}
                                                        >
                                                            <span className="text-sm text-gray-800">
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
                                                                    __html: `${subPart.description}`,
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
        </div>
    );
};

const TotalScore = ({ totalCurrentScore, totalMaxScore }: { totalCurrentScore: number; totalMaxScore: number }) => (
    <div className="mt-2 mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
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
        </div>
        <span className="font-bold italic">Điểm được lưu tự động</span>
    </div>
);

export default PersonalBarem;
