import React, { useState } from "react";
import { FileText, Github, Link2, Send, Plus, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import Notification from "~/utils/notification";
import { useAppSelector } from "~/hooks/useRedux";
import type { AxiosError } from "axios";

const FormSubmit = () => {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const teamId = userInfo.candidate?.teamId || "";
    const queryClient = useQueryClient();

    const [slideLink, setSlideLink] = useState("");
    const [taskAssignmentLink, setTaskAssignmentLink] = useState("");
    const [productLinks, setProductLinks] = useState<string[]>([""]);
    const [note, setNote] = useState("");

    const submitMutation = useMutation({
        mutationFn: (data: { slideLink: string; taskAssignmentLink: string; productLinks: string[]; note: string }) =>
            TeamApi.submissions(teamId, data),
        onError: (error: AxiosError<{ message?: string }>) => {
            Notification.error({
                text: error.response?.data?.message || "Nộp bài thất bại!",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["submissions", teamId] });
            Notification.success({
                text: "Nộp bài thành công!",
            });
            setSlideLink("");
            setTaskAssignmentLink("");
            setProductLinks([""]);
            setNote("");
        },
    });

    const handleAddProductLink = () => {
        setProductLinks([...productLinks, ""]);
    };

    const handleRemoveProductLink = (index: number) => {
        if (productLinks.length > 1) {
            setProductLinks(productLinks.filter((_, i) => i !== index));
        }
    };

    const handleProductLinkChange = (index: number, value: string) => {
        const newLinks = [...productLinks];
        newLinks[index] = value;
        setProductLinks(newLinks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const filledLinks = productLinks.filter((link) => link.trim() !== "");

        submitMutation.mutate({
            slideLink,
            taskAssignmentLink,
            productLinks: filledLinks,
            note,
        });
    };

    return (
        <section className="mb-4 overflow-hidden rounded-md border bg-white sm:mb-6">
            <div className="border-b border-gray-200/70 bg-linear-to-r from-gray-50/80 to-white px-4 py-3 sm:px-5 sm:py-4 md:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                    Nộp sản phẩm Challenge 3
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:mt-1.5 sm:text-sm">
                    Vui lòng điền đầy đủ thông tin dưới đây để nộp bài tham dự thuyết trình.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:space-y-5 sm:p-5 md:space-y-6 md:p-6">
                <div className="space-y-1.5 sm:space-y-2">
                    <label
                        htmlFor="slideLink"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:gap-2"
                    >
                        <Link2 className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Link slide thuyết trình (.pptx, canva, v.v)</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="slideLink"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="focus:ring-primary/20 h-10 text-sm transition-all focus:ring-2 sm:h-auto sm:text-base"
                        value={slideLink}
                        onChange={(e) => setSlideLink(e.target.value)}
                        required
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        <span>Yêu cầu để ở chế độ công khai để Ban Giám khảo có thể truy cập</span>
                    </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                    <label
                        htmlFor="taskAssignmentLink"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:gap-2"
                    >
                        <FileText className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Link phân công task (.xlsx, trello, jira, v.v)</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="taskAssignmentLink"
                        type="url"
                        placeholder="https://docs.google.com/spreadsheets/..."
                        className="focus:ring-primary/20 h-10 text-sm transition-all focus:ring-2 sm:h-auto sm:text-base"
                        value={taskAssignmentLink}
                        onChange={(e) => setTaskAssignmentLink(e.target.value)}
                        required
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        <span>Sheet phân công task cho các thành viên trong nhóm</span>
                    </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:gap-2">
                        <Github className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">
                            Link Source code/Figma (Tùy chọn - Nếu đề tài yêu cầu sản phẩm)
                        </span>
                    </label>
                    <div className="space-y-2 sm:space-y-3">
                        {productLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <Input
                                        type="url"
                                        placeholder={`Link ${index + 1}: GitHub, GitLab, Figma...`}
                                        className="focus:ring-primary/20 h-10 text-sm transition-all focus:ring-2 sm:h-auto sm:text-base"
                                        value={link}
                                        onChange={(e) => handleProductLinkChange(index, e.target.value)}
                                    />
                                </div>
                                {productLinks.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveProductLink(index)}
                                        className="h-10 w-10 flex-shrink-0 border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddProductLink}
                            className="group hover:border-primary hover:text-primary flex items-center gap-1.5 border-dashed text-xs transition-all sm:gap-2 sm:text-sm"
                        >
                            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Thêm link
                        </Button>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        <span>Chỉ nộp nếu đề tài của bạn yêu cầu sản phẩm</span>
                    </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                    <label
                        htmlFor="note"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 sm:gap-2"
                    >
                        <FileText className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Ghi chú</span>
                    </label>
                    <Textarea
                        id="note"
                        placeholder="Mô tả ngắn về sản phẩm, tính năng nổi bật, công nghệ sử dụng..."
                        className="focus:ring-primary/20 min-h-[100px] resize-none text-sm transition-all focus:ring-2 sm:min-h-[120px] sm:text-base"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={5000}
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        <span>
                            Chia sẻ thêm về sản phẩm đã làm được những gì hay để giảm khảo tập trung khai thác (tối đa
                            5000 ký tự)
                        </span>
                    </p>
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-200/70 pt-4 sm:flex-row sm:items-center sm:gap-3 sm:pt-5">
                    <Button
                        type="submit"
                        className="group flex h-10 w-full items-center justify-center gap-2 transition-all hover:shadow-md sm:w-auto sm:px-6"
                        disabled={submitMutation.isPending}
                    >
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                        <span className="text-sm sm:text-base">
                            {submitMutation.isPending ? "Đang nộp..." : "Nộp bài"}
                        </span>
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
