import { Facebook, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ChoiceLeader } from "./ChoiceLeader";
const ListTeam = () => {
    return (
        <section className="col-span-1 lg:col-span-8" id="members">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                <div className="from-gray-100/60/60 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r px-4 py-3 sm:px-6 sm:py-4">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                            NHÓM <span className="text-primary font-bold">1</span>
                        </h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên trong
                            nhóm.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ChoiceLeader />

                        <Link to="/mentor/barem/2000">
                            <Button
                                variant="default"
                                className="shadown-base flex w-fit cursor-pointer items-center gap-2 rounded-xl border p-2"
                            >
                                <span>Đánh giá</span>
                                <Sparkles size={18} />
                            </Button>
                        </Link>
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
                                    Thông tin cơ bản
                                </th>
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Email
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Facebook
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr className="transition-colors hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    1
                                </td>
                                <td className="text-primary px-3 py-3 text-sm font-bold whitespace-nowrap sm:px-6 sm:py-4">
                                    Phạm Hoàng Tuấn (Leader)
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                    QE170100
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    tuanph@fpt.edu.vn
                                </td>
                                <td className="px-3 py-3 text-sm whitespace-nowrap sm:px-6 sm:py-4">
                                    <a
                                        href="https://facebook.com/tuanph"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <Facebook size={14} />
                                        <span>tuanph</span>
                                    </a>
                                </td>
                            </tr>
                            <tr className="transition-colors hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    2
                                </td>
                                <td className="px-3 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    Trần Văn An
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                    QE170101
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    antv@fpt.edu.vn
                                </td>
                                <td className="px-3 py-3 text-sm whitespace-nowrap sm:px-6 sm:py-4">
                                    <a
                                        href="https://facebook.com/antv"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <Facebook size={14} />
                                        <span>antv</span>
                                    </a>
                                </td>
                            </tr>
                            <tr className="transition-colors hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    3
                                </td>
                                <td className="px-3 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    Lê Thị Bình
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                    QE170102
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    binhlt@fpt.edu.vn
                                </td>
                                <td className="px-3 py-3 text-sm whitespace-nowrap sm:px-6 sm:py-4">
                                    <a
                                        href="https://facebook.com/binhlt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <Facebook size={14} />
                                        <span>binhlt</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ListTeam;
