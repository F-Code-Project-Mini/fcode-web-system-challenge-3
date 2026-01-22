import NotifyNotLeader from "~/components/NotifyNotLeader";
import type { TeamType } from "~/types/team.types";
import { ChangeNameTeam } from "./ChangeNameTeam";
import useAuth from "~/hooks/useAuth";
import BadgeLeader from "~/components/BadgeLeader";
import DisplayResult from "./DisplayStatus";

const Members = ({ data }: { data: TeamType | undefined }) => {
    const candidates = data?.candidates;
    const leader = data?.leader;
    const { user } = useAuth();

    return (
        <section className="col-span-16 xl:col-span-8" id="members">
            {!leader && data && (
                <NotifyNotLeader
                    name={data.group}
                    message="Vui lòng làm việc với nhau và bầu chọn ra trưởng nhóm và báo cáo lại với mentor!"
                />
            )}
            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                <div className="border-b border-gray-200/70 bg-linear-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                    [NHÓM <span className="text-primary font-bold">{data?.group}</span>] -{" "}
                                    {data?.name ? (
                                        <span className="text-primary font-bold">{data.name}</span>
                                    ) : (
                                        <span className="text-red-500">Chưa đặt tên nhóm</span>
                                    )}
                                </h2>
                                {data &&
                                    !data.name &&
                                    user.id ===
                                        data.candidates.find((candidate) => candidate.id === data.leaderId)?.user
                                            .id && <ChangeNameTeam team={data} />}
                            </div>
                            {!data?.name && (
                                <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                    Nhóm trưởng mới được quyền đặt tên nhóm
                                </p>
                            )}
                            <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên
                                trong nhóm thông qua kênh <span className="font-bold">Discord</span>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    STT
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Họ và tên
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3.5">
                                    MSSV
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                    Liên hệ
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                    Kết quả
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {candidates?.map(({ user, ...member }, index) => {
                                const isLeader = member.id == leader?.id;
                                return (
                                    <tr
                                        key={member.studentCode}
                                        className={` ${!user.isConfirm ? "bg-red-50/50" : "transition-colors hover:bg-gray-50/50"}`}
                                    >
                                        <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                            {index + 1}
                                        </td>
                                        <td
                                            className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
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
                                            <DisplayResult status={member.statusC3} />
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

export default Members;
