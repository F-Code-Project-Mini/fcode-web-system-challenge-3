import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
// import { ChoiceLeader } from "./ChoiceLeader";
import type { TeamType } from "~/types/team.types";
import NotifyNotLeader from "~/components/NotifyNotLeader";
import { ShowTopic } from "../Candidate/ShowTopic";
import Helper from "~/utils/helper";
import BadgeLeader from "~/components/BadgeLeader";
import { NoteTeam } from "./Note";
import ResultBadge from "~/components/ResultBadge";
const Team = ({ team }: { team: TeamType }) => {
    return (
        <section className="col-span-1 lg:col-span-8" id="members">
            {!team.leaderId && <NotifyNotLeader name={team.group} />}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                <div className="from-gray-100/60/60 flex flex-col gap-3 border-b border-gray-200 bg-linear-to-r px-4 py-3 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                    <div className="flex-1">
                        <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                            [NHÓM <span className="text-primary font-bold">{team?.group}</span>] -{" "}
                            {team.name ? (
                                <span className="text-primary font-bold">{team.name}</span>
                            ) : (
                                <span className="text-red-500 italic">Chưa đặt tên nhóm</span>
                            )}
                        </h2>
                        {!team?.name && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                Nhóm trưởng mới được quyền đặt tên nhóm
                            </p>
                        )}

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Các thành viên trong nhóm sẽ chủ động liên hệ với bạn để add bạn vào nhóm.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <ShowTopic urlPdf={team.topic.filePath} name={team.topic.title} />
                        {/* <ChoiceLeader team={team} /> */}
                        <NoteTeam note={team.mentorNote || ""} teamId={team.id} />

                        {/* <Link to={`/mentor/team/${team.id}`}>
                            <Button
                                variant="default"
                                className="shadown-base flex w-fit cursor-pointer items-center gap-2 rounded-xl border p-2"
                            >
                                <Sparkles size={18} />
                                <span className="hidden sm:inline">Đánh giá</span>
                                <span className="sm:hidden">Chấm điểm</span>
                            </Button>
                        </Link> */}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    STT
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Họ và tên
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    MSSV
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Liên hệ
                                </th>

                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {team.candidates?.map(({ user, ...member }, index) => {
                                const isLeader = member.id == team.leader?.id;
                                return (
                                    <tr
                                        key={member.studentCode}
                                        className={` ${!user.isConfirm ? "bg-red-50/50" : "transition-colors hover:bg-gray-50/50"}`}
                                    >
                                        <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                            {index + 1}
                                        </td>
                                        <td
                                            className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} relative px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {user.fullName}
                                                {isLeader && <BadgeLeader />}
                                            </div>
                                            <p className="mt-0.5 text-xs text-gray-600">Ngành: {member.major}</p>
                                            {!user.isConfirm && (
                                                <p className="mt-0.5 text-xs font-semibold text-red-600">
                                                    Chưa đăng nhập lần đầu!
                                                </p>
                                            )}
                                                <ResultBadge status={member.statusC3} isBg={false} />
                                        </td>
                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                            <p className="text-blue-gray-900 text-sm font-semibold">
                                                {member.studentCode}
                                            </p>
                                            <p className="text-xs text-gray-500">Kỳ {member.semester}</p>
                                        </td>
                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                            <div className="flex flex-col gap-1">
                                                <span className="block font-medium">{user.email}</span>
                                                <span className="block text-gray-500">{member.phone}</span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <span className="text-gray-500">Điểm:</span>
                                                    <span
                                                        className={`font-semibold ${Helper.belowAverage(member.scoreMentor) ? "text-red-500" : "text-green-500"}`}
                                                    >
                                                        {member.scoreMentor || 0}
                                                    </span>
                                                    <span className="text-gray-500">/{isLeader ? "100" : "85"}</span>
                                                </div>
                                                {user.isConfirm && member.statusC3 === "WAITING" && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-fit text-xs"
                                                        asChild
                                                    >
                                                        <Link
                                                            to={`/mentor/team/${team.id}/candidate/${member.id}`}
                                                            className="flex items-center gap-1"
                                                        >
                                                            <Sparkles size={10} /> <span>Đánh giá</span>
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
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

export default Team;
