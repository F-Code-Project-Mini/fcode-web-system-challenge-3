import { Button } from "~/components/ui/button";
import { ShowTopic } from "../Candidate/ShowTopic";
import type { TeamType } from "~/types/team.types";

const Teams = ({ team: { mentorship, candidates, leader, topic, name } }: { team: TeamType }) => {
    return (
        <section className="col-span-1 lg:col-span-16" id="members">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                <div className="from-gray-100/60/60 flex justify-between border-b border-gray-200 bg-gradient-to-r px-4 py-3 sm:px-6 sm:py-4">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                            NHÓM <span className="text-primary font-bold">{name}</span>
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
                            </ul>
                            {/* <span className="font-bold text-black">Phạm Hoàng Tuấn</span> */}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <ShowTopic urlPdf={topic.filePath} name="" />
                        <Button variant={"outline"}>Cập nhật Mentor</Button>
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
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    MSSV
                                </th>
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Email
                                </th>
                                <th
                                    colSpan={3}
                                    className="hidden px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell"
                                >
                                    Đánh giá
                                </th>
                            </tr>
                            <tr>
                                <th className="border-r-2" colSpan={4}></th>
                                <th className="hidden px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Điểm Mentor
                                </th>
                                <th className="hidden px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Điểm Judge
                                </th>
                                <th className="hidden px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Kết quả
                                </th>
                            </tr>
                        </thead>
                        {/* tất cả thẻ con là tr có giá trị là border-r-2 */}
                        <tbody className="divide-y divide-gray-200 bg-white [&_tr_td:nth-last-child(-n+3)]:text-center [&_tr_td:nth-last-child(-n+4)]:border-r-2">
                            {candidates.map(({ user, ...candidate }, index) => (
                                <tr className="transition-colors hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                        {index + 1}
                                    </td>
                                    <td
                                        className={`${candidate.id == leader.id ? `font-bold` : ``} px-3 py-3 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                    >
                                        {user.fullName} {candidate.id == leader.id ? `(Trưởng nhóm)` : ``}
                                    </td>
                                    <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                        {candidate.studentCode}
                                    </td>
                                    <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                        {user.email}
                                    </td>
                                    <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                        20
                                    </td>
                                    <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                        <span className="font-bold text-yellow-500">Chưa có</span>
                                    </td>
                                    <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                        <span className="font-bold text-yellow-500">Chờ chấm</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Teams;
