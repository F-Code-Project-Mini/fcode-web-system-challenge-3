import { Button } from "~/components/ui/button";

const Candidates = () => {
    return (
        <section className="col-span-1 lg:col-span-16" id="members">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                <div className="from-gray-100/60/60 border-b border-gray-200 bg-gradient-to-r px-4 py-3 sm:px-6 sm:py-4">
                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">DANH SÁCH ỨNG VIÊN</h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">Danh sách các ứng viên vòng 3</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 [&_th]:font-bold">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Mã SV / Kỳ
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Họ tên
                                </th>
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    Thông tin
                                </th>
                                <th
                                    colSpan={3}
                                    className="hidden px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3"
                                >
                                    Đánh giá
                                </th>
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    Action
                                </th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="hidden border-x-2 px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    Vòng 1
                                </th>
                                <th className="hidden border-x-2 px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    Vòng 2
                                </th>
                                <th className="hidden border-x-2 px-3 py-2 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                    Vòng 3
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white [&_tr_td:nth-last-child(-n+4)]:border-x-2">
                            <tr className="transition-colors hover:bg-gray-50">
                                <td className="px-3 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                    <p className="text-blue-gray-900 text-sm font-semibold">SE211156</p>
                                    <p className="text-xs text-gray-500">Kỳ TRS6</p>
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                    <div className="text-sm">
                                        <p className="text-blue-gray-900 font-semibold">Thạch Đỗ Thiết</p>
                                        <p className="mt-0.5 text-xs text-gray-600">Ngành: Software Engineering</p>
                                    </div>
                                </td>
                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                    <div className="text-sm">
                                        <ul className="mt-1 space-y-0.5">
                                            <li className="text-xs">Mail: thietthachdo@gmail.com</li>
                                            <li className="text-xs">Phone: 0354314095</li>
                                            <li className="text-xs">
                                                Nhóm: <span className="font-medium text-yellow-600">Chưa xếp</span>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="hidden px-3 py-3 text-center text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    20.0
                                </td>
                                <td className="hidden px-3 py-3 text-center text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    20.0
                                </td>
                                <td className="hidden px-3 py-3 text-center text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    20.0
                                </td>

                                <td className="hidden px-3 py-3 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                    <Button size="sm">Xếp nhóm</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Candidates;
