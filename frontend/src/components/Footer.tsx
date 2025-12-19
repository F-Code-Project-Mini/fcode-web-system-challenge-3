import { Facebook, Globe, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 sm:py-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                        <div className="flex items-center gap-2.5">
                            <img src="/fcode.png" alt="F-Code" className="h-8 w-8" />
                            <span className="text-primary text-xl font-bold">F-Code</span>
                        </div>
                        <p className="mt-3 text-justify text-sm leading-relaxed text-gray-600">
                            F-Code, thành lập năm 2014, là câu lạc bộ học thuật đầu tiên của Đại học FPT tại Thành phố
                            Hồ Chí Minh. Ban đầu hướng đến việc tạo ra một cộng đồng cho sinh viên chuyên ngành Kỹ thuật
                            Phần mềm, F-Code cho phép họ chia sẻ và cải thiện các kỹ năng cần thiết cho lập trình viên.
                            Sau 11 năm, F-Code đã cung cấp nhiều hoạt động khác nhau cho sinh viên.
                        </p>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Liên kết</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <a href="#" className="hover:text-primary text-sm text-gray-600 transition-colors">
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary text-sm text-gray-600 transition-colors">
                                    Timeline
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary text-sm text-gray-600 transition-colors">
                                    Đề tài
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary text-sm text-gray-600 transition-colors">
                                    Bảng điểm
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Leader</h3>
                        <ul className="mt-3 space-y-2">
                            <li className="text-sm text-gray-600">Project: Trần Ngọc Thanh</li>
                            <li className="text-sm text-gray-600">Plan: Đào Thị Út Trinh</li>
                            <li className="text-sm text-gray-600">HR: Nguyễn Huy Phong</li>
                            <li className="text-sm text-gray-600">Media: Vũ Việt Quang</li>
                            <li className="text-primary text-sm">Technical: Phạm Hoàng Tuấn</li>
                            <li className="text-sm text-gray-600">Challenge 1: Nguyễn Hoàng Minh</li>
                            <li className="text-sm text-gray-600">Challenge 2: Võ Gia Huy</li>
                            <li className="text-primary text-sm">Challenge 3: Phạm Hoàng Tuấn</li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Liên hệ</h3>
                        <div className="mt-3 flex flex-wrap gap-3">
                            <a
                                href="https://www.facebook.com/fcodeclub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCZyrUXSrQ1AdkomxYz1GvCw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-colors"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                            <a
                                href="https://fcodehcm.wordpress.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-6">
                    <p className="text-center text-xs text-gray-500 sm:text-sm">
                        Dự án được thiết kế bởi:{" "}
                        <Link className="underline" target="_blank" to="https://www.facebook.com/fcodeclub">
                            CLB F-Code
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
