import Helper from "~/utils/helper";
import { ShowTopic } from "../Candidate/ShowTopic";
import type { AdminTeamType } from "~/types/admin.types";
import BadgeLeader from "~/components/BadgeLeader";
import ResultBadge from "~/components/ResultBadge";

const Teams = ({
    team: { mentorship, candidates, leader, topic, name, group, teamScore },
}: {
    team: AdminTeamType;
}) => {
    return (
        <section className="col-span-1 lg:col-span-16" id="members">
            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                <div className="flex justify-between border-b border-gray-200/70 bg-linear-to-r from-gray-50/80 to-white px-4 py-3 sm:px-6 sm:py-4">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                            NHÓM {group} - <span className="text-primary font-bold">{name || "Chưa đặt tên"}</span>
                        </h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            <ul>
                                <li>
                                    Đề tài: <span className="font-bold">{topic.title}</span>
                                </li>
                                <li>
                                    Mentor:{" "}
                                    <span className="font-bold text-gray-600">{mentorship.mentor.fullName}</span>
                                </li>
                                {teamScore !== null && (
                                    <li>
                                        Điểm nhóm:{" "}
                                        <span
                                            className={`font-bold ${teamScore >= 50 ? "text-green-600" : "text-red-600"}`}
                                        >
                                            {teamScore.toFixed(1)}/100
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <ShowTopic urlPdf={topic.filePath} name="" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    STT
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Họ và tên
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3.5">
                                    MSSV
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                    Email
                                </th>
                                <th className="hidden px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                    Điểm
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {candidates.map((candidate, index) => {
                                const isLeader = candidate.id === leader.id;
                                return (
                                    <tr
                                        key={candidate.id}
                                        className={`${candidate.statusC3 === "FAILED" ? "bg-red-50" : "transition-colors hover:bg-gray-50/50"}`}
                                    >
                                        <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                            {index + 1}
                                        </td>
                                        <td
                                            className={`${candidate.id === leader.id ? `font-bold` : ``} relative px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                        >
                                            {candidate.user.fullName} {isLeader && <BadgeLeader />}
                                            <ResultBadge status={candidate.statusC3} isBg={false} />
                                        </td>
                                        <td className="hidden px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                            {candidate.studentCode}
                                        </td>
                                        <td className="hidden px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                            {candidate.user.email}
                                        </td>
                                        <td className="hidden px-4 py-3.5 text-center text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4 md:table-cell">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Mentor:</span>
                                                    {candidate.scoreMentor !== null ? (
                                                        <>
                                                            <span
                                                                className={`font-semibold ${Helper.belowAverage(candidate.scoreMentor) ? "text-red-500" : "text-green-600"}`}
                                                            >
                                                                {candidate.scoreMentor.toFixed(1)}
                                                            </span>
                                                            <span className="text-xs font-bold">
                                                                /{isLeader ? "100" : "85"}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Present Offical:</span>
                                                    {candidate.scoreJudge !== null ? (
                                                        <>
                                                            <span
                                                                className={`font-semibold ${Helper.belowAverage(candidate.scoreJudge) ? "text-red-500" : "text-green-600"}`}
                                                            >
                                                                {candidate.scoreJudge.toFixed(1)}
                                                            </span>
                                                            <span className="text-xs font-bold">/100</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="hidden px-4 py-3.5 text-center text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4 md:table-cell">
                                            {candidate.scoreJudge !== null ? (
                                                <>
                                                    <span
                                                        className={`font-semibold ${Helper.belowAverage(candidate.scoreJudge) ? "text-red-500" : "text-green-500"}`}
                                                    >
                                                        {candidate.scoreJudge.toFixed(1)}
                                                    </span>
                                                    <span>/100</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Teams;
