import React from "react";
import { FileText, Github, Link2, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const FormSubmit = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="mb-6 overflow-hidden rounded-md border bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Nộp bài dự thi</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Vui lòng điền đầy đủ thông tin dưới đây để nộp bài tham dự thuyết trình.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                {/* Product Link */}
                <div className="space-y-2">
                    <label htmlFor="productLink" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Link2 className="h-4 w-4 text-gray-400" />
                        Link sản phẩm (Bao gồm slide .pptx, Sheet phân công .xlsx)
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="productLink"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="focus:ring-primary/20 transition-all focus:ring-2"
                        required
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Yêu cầu để ở chế độ công khai để Ban Giám khảo có thể truy cập
                    </p>
                </div>

                {/* Code Link */}
                <div className="space-y-2">
                    <label htmlFor="codeLink" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Github className="h-4 w-4 text-gray-400" />
                        Link source/Figma (Nếu đề tài yêu cầu sản phẩm)
                    </label>
                    <Input
                        id="codeLink"
                        type="url"
                        placeholder="GitHub, GitLab, Figma..."
                        className="focus:ring-primary/20 transition-all focus:ring-2"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4 text-gray-400" />
                        Mô tả (Tùy chọn)
                    </label>
                    <Textarea
                        id="description"
                        placeholder="Mô tả ngắn về sản phẩm, tính năng nổi bật, công nghệ sử dụng..."
                        className="focus:ring-primary/20 min-h-[120px] resize-none transition-all focus:ring-2"
                        // rows={5}
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Chia sẻ thêm về sản phẩm đã làm được những gì hay để giảm khảo tập trung khai thác (tối đa 500
                        ký tự)
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-3 border-t border-gray-200/70 pt-5">
                    <Button type="submit" className="group flex items-center gap-2 transition-all hover:shadow-md">
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        Nộp bài
                    </Button>
                    <p className="text-xs text-gray-500">
                        <span className="font-semibold text-red-600">Lưu ý:</span> Kiểm tra kỹ thông tin trước khi nộp
                    </p>
                </div>
            </form>
        </section>
    );
};

export default FormSubmit;
