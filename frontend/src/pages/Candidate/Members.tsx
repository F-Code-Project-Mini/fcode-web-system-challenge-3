import type { TeamType } from "~/types/team.types";

const Members = ({ data }: { data: TeamType | undefined }) => {
    const candidates = data?.candidates;
    const leader = data?.leader;

    return (
        <section className="col-span-16 xl:col-span-8" id="members">
            <div className="rounded-lg border border-gray-200 bg-white shadow-2xs">
                <div className="from-gray-100/60/60 border-b border-gray-200 bg-gradient-to-r px-4 py-3 sm:px-6 sm:py-4">
                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                        NHÓM <span className="text-primary font-bold">{data?.name}</span>
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên trong nhóm.
                    </p>
                </div>
                <div className="overflow-auto">
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
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {candidates?.map(({ user, ...member }, index) => {
                                const isLeader = member.id == leader?.id;
                                return (
                                    <tr key={member.studentCode} className="transition-colors hover:bg-gray-50">
                                        <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                            {index + 1}
                                        </td>
                                        <td
                                            className={`${isLeader ? "font-bold" : ""} px-3 py-3 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                        >
                                            {user.fullName} {isLeader && `(Trưởng nhóm)`}
                                        </td>
                                        <td className="px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                            {member.studentCode}
                                        </td>
                                        <td className="px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
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
