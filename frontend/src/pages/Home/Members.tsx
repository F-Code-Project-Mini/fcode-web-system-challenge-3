import { Facebook } from "lucide-react";
const Members = () => {
    return (
        <section className="col-span-8">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        NHÓM <span className="text-primary font-bold">5</span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên trong nhóm.
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    STT
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    Họ và tên
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    MSSV
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    Facebook
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr className="transition-colors hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">1</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Phạm Hoàng Tuấn</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">QE170100</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">tuanph@fpt.edu.vn</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
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
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">2</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Trần Văn An</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">QE170101</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">antv@fpt.edu.vn</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
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
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">3</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Lê Thị Bình</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">QE170102</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">binhlt@fpt.edu.vn</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
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

export default Members;
