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
        <section className="mb-6 overflow-hidden rounded-md border bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                    Nộp sản phẩm Challenge 3
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Vui lòng điền đầy đủ thông tin dưới đây để nộp bài tham dự thuyết trình.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                <div className="space-y-2">
                    <label htmlFor="slideLink" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Link2 className="h-4 w-4 text-gray-400" />
                        Link slide thuyết trình (.pptx, canva, v.v)
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="slideLink"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="focus:ring-primary/20 transition-all focus:ring-2"
                        value={slideLink}
                        onChange={(e) => setSlideLink(e.target.value)}
                        required
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Yêu cầu để ở chế độ công khai để Ban Giám khảo có thể truy cập
                    </p>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="taskAssignmentLink"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                        <FileText className="h-4 w-4 text-gray-400" />
                        Link phân công task (.xlsx, trello, jira, v.v)
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="taskAssignmentLink"
                        type="url"
                        placeholder="https://docs.google.com/spreadsheets/..."
                        className="focus:ring-primary/20 transition-all focus:ring-2"
                        value={taskAssignmentLink}
                        onChange={(e) => setTaskAssignmentLink(e.target.value)}
                        required
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Sheet phân công task cho các thành viên trong nhóm
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Github className="h-4 w-4 text-gray-400" />
                        Link Source code/Figma (Tùy chọn - Nếu đề tài yêu cầu sản phẩm)
                    </label>
                    <div className="space-y-3">
                        {productLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <Input
                                        type="url"
                                        placeholder={`Link ${index + 1}: GitHub, GitLab, Figma...`}
                                        className="focus:ring-primary/20 transition-all focus:ring-2"
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
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddProductLink}
                            className="group hover:border-primary hover:text-primary flex items-center gap-2 border-dashed transition-all"
                        >
                            <Plus className="h-4 w-4" />
                            Thêm link
                        </Button>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Chỉ nộp nếu đề tài của bạn yêu cầu sản phẩm
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="note" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4 text-gray-400" />
                        Ghi chú
                    </label>
                    <Textarea
                        id="note"
                        placeholder="Mô tả ngắn về sản phẩm, tính năng nổi bật, công nghệ sử dụng..."
                        className="focus:ring-primary/20 min-h-[120px] resize-none transition-all focus:ring-2"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={500}
                    />
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                        Chia sẻ thêm về sản phẩm đã làm được những gì hay để giảm khảo tập trung khai thác (tối đa 500
                        ký tự)
                    </p>
                </div>

                <div className="flex items-center gap-3 border-t border-gray-200/70 pt-5">
                    <Button
                        type="submit"
                        className="group flex items-center gap-2 transition-all hover:shadow-md"
                        disabled={submitMutation.isPending}
                    >
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        {submitMutation.isPending ? "Đang nộp..." : "Nộp bài"}
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
