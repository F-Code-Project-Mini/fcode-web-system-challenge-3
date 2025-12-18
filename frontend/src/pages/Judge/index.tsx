import { LogIn, MousePointer2 } from "lucide-react";
import { Link } from "react-router";
import WelcomePartition from "~/components/WelcomePartition";

const JudgePage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>
            <section className="col-span-1 lg:col-span-8" id="members">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-100/60 px-4 py-3 sm:px-6 sm:py-4">
                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">DANH SÁCH NHÓM</h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">Danh sách nhóm tham gia thuyết trình!</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        STT
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        Đề tài
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        Phòng
                                    </th>
                                    <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                        Nhóm
                                    </th>
                                    <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                        Bắt đầu
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr className="transition-colors hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 sm:py-4">1</td>
                                    <td className="text-primary px-3 py-3 text-sm font-bold sm:table-cell sm:px-6 sm:py-4">
                                        Database Websystem
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                        010
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 sm:py-4">7</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                        10:00 AM
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                        <Link
                                            to="/judge/barem/2000"
                                            className="shadown-base inline-block w-fit cursor-pointer rounded-xl border bg-white p-2"
                                        >
                                            <LogIn />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JudgePage;
