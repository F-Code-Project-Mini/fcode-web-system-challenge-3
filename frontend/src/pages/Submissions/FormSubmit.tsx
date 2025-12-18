import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const FormSubmit = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
                <div>
                    <label htmlFor="productLink" className="mb-2 block text-sm font-medium text-gray-700">
                        Link sản phẩm (Bao gồm slide .pptx, Sheet phân công .xsxl){" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="productLink"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="py-5"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">Yêu cầu để ở chế độ công khai</p>
                </div>

                <div>
                    <label htmlFor="codeLink" className="mb-2 block text-sm font-medium text-gray-700">
                        Link mã nguồn (Nếu đề tài yêu cầu code)
                    </label>
                    <Input
                        id="codeLink"
                        type="url"
                        placeholder="GitHub, GitLab, Bitbucket..."
                        className="py-5"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">Repository chứa source code của dự án</p>
                </div>

                <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                        Mô tả (Tùy chọn)
                    </label>
                    <Textarea
                        id="description"
                        placeholder="Mô tả ngắn về sản phẩm, tính năng nổi bật, công nghệ sử dụng..."
                        className="min-h-[120px] resize-none"
                        rows={5}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Chia sẻ thêm về dự án của bạn (tối đa 500 ký tự). CLB sẽ dựa vào những thông tin mô tả để đánh
                        giá nhóm tốt hơn.
                    </p>
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                    Nộp bài
                </Button>
            </form>
        </section>
    );
};

export default FormSubmit;
