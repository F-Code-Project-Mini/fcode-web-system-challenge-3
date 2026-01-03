import type { TeamType } from "~/types/team.types";

const Members = ({ data }: { data: TeamType | undefined }) => {
    const candidates = data?.candidates;
    const leader = data?.leader;

    return (
        <section className="col-span-16 xl:col-span-8" id="members">
            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                    <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                        NHÓM <span className="text-primary font-bold">{data?.name}</span>
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                        Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên trong nhóm.
                    </p>
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
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {candidates?.map(({ user, ...member }, index) => {
                                const isLeader = member.id == leader?.id;
                                return (
                                    <tr key={member.studentCode} className="transition-colors hover:bg-gray-50/50">
                                        <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                            {index + 1}
                                        </td>
                                        <td
                                            className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {user.fullName}
                                                {isLeader && (
                                                    <span className="text-primary bg-primary/10 rounded-md px-2 py-0.5 text-xs font-medium">
                                                        Trưởng nhóm
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                            {member.studentCode}
                                        </td>
                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                            {user.email}
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
