import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Clock, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

import TeamApi from "~/api-requests/team.requests";
import Notification from "~/utils/notification";
import { useAppSelector } from "~/hooks/useRedux";
import type { AxiosError } from "axios";
import ConfirmRegister from "./ConfirmRegister";
import Loading from "~/components/Loading";

const FormRegisterPresent = ({
    isReload,
    setIsReload,
}: {
    isReload: boolean;
    setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const teamId = userInfo.candidate?.teamId || "";
    const queryClient = useQueryClient();

    const [trialSlot, setTrialSlot] = useState<string>("");
    const [officialSlots, setOfficialSlots] = useState<string[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const { data: scheduleData, isLoading } = useQuery({
        queryKey: ["scheduleAll"],
        queryFn: async () => {
            const res = await TeamApi.getSchedulePresentationAll();
            return res.result;
        },
    });

    const trialSchedules = scheduleData?.trialSchedules || [];
    const officialSchedules = scheduleData?.officialSchedules || [];

    const disabledTrialSlotsCount = trialSchedules.reduce((count, schedule) => {
        return count + schedule.slots.filter((slot) => slot.disabled).length;
    }, 0);

    const isTrialFullyBooked = disabledTrialSlotsCount >= 10;

    const registerMutation = useMutation({
        mutationFn: (data: { teamId: string; trialDate: string; officialDate: string[] }) =>
            TeamApi.createSchedulePresentation(data),
        onError: (error: AxiosError<{ message?: string }>) => {
            console.log(error);
            Notification.error({
                text: error.response?.data?.message || "Đăng ký thời gian thuyết trình thất bại!",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedulePresentation", teamId] });
            Notification.success({
                text: "Đăng ký thời gian thuyết trình thành công!",
            });
            setIsReload(!isReload);
            setTrialSlot("");
            setOfficialSlots([]);
        },
    });

    const handleOfficialSlotChange = (slot: string) => {
        setOfficialSlots((prev) => {
            if (prev.includes(slot)) {
                return prev.filter((s) => s !== slot);
            }
            return [...prev, slot];
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    const handleConfirmSubmit = () => {
        registerMutation.mutate({
            teamId,
            trialDate: trialSlot || "",
            officialDate: officialSlots,
        });
        setShowConfirmDialog(false);
    };

    if (isLoading) return <Loading />;

    return (
        <section className="mb-6 overflow-hidden rounded-md border bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                    Đăng ký thời gian thuyết trình
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Vui lòng chọn thời gian phù hợp cho buổi thuyết trình thử và thuyết trình chính thức.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <h3 className="text-base font-semibold text-gray-900">
                            Thời gian thuyết trình thử
                            <span className="ml-2 text-xs font-normal text-gray-500">(Không bắt buộc)</span>
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Chọn <span className="font-semibold">MỘT</span> khung giờ để thuyết trình thử nghiệm và nhận
                        phản hồi từ Ban Giám Khảo.
                    </p>
                    {isTrialFullyBooked ? (
                        <div className="rounded-md border-l-4 border-red-400 bg-red-50 p-3">
                            <p className="text-sm font-semibold text-red-800">Đã hết slot thuyết trình thử!</p>
                            <p className="mt-1 text-xs text-red-700">
                                Tất cả 10 slot thuyết trình thử đã được đăng ký đầy. Bạn vẫn có thể đăng ký thuyết trình
                                chính thức bên dưới.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-3">
                            <p className="text-xs text-blue-800">
                                <span className="font-semibold">Lưu ý:</span> Chỉ còn{" "}
                                <span className="font-bold">{10 - disabledTrialSlotsCount} slot</span> thuyết trình thử.
                                Hãy chọn một khung giờ phù hợp có đủ tất cả các thành viên trong nhóm để tham gia.
                            </p>
                        </div>
                    )}

                    {!isTrialFullyBooked && (
                        <RadioGroup value={trialSlot} onValueChange={setTrialSlot}>
                            {trialSchedules.map((schedule) => (
                                <div key={`trial-${schedule.date}`} className="mb-5 space-y-3">
                                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium text-gray-700">{schedule.date}</span>
                                    </div>
                                    <div className="grid gap-2 pl-6 sm:grid-cols-2 lg:grid-cols-4">
                                        {schedule.slots.map((slot) => (
                                            <div
                                                key={`trial-${schedule.date}-${slot.time}`}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={`${schedule.date}|${slot.time}`}
                                                    id={`trial-${schedule.date}-${slot.time}`}
                                                    className="text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                    disabled={slot.disabled}
                                                />
                                                <Label
                                                    htmlFor={`trial-${schedule.date}-${slot.time}`}
                                                    className={`text-sm font-normal ${
                                                        slot.disabled
                                                            ? "cursor-not-allowed text-gray-400 line-through"
                                                            : "cursor-pointer text-gray-700 hover:text-gray-900"
                                                    }`}
                                                >
                                                    {slot.time}
                                                    {slot.disabled && (
                                                        <span className="ml-1 text-xs text-red-500">(Hết)</span>
                                                    )}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <h3 className="text-base font-semibold text-green-700">
                            Thời gian thuyết trình chính thức
                            <span className="text-red-500">*</span>
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Chọn <span className="font-semibold text-green-700">NHIỀU</span> khung giờ bạn có thể tham gia
                        thuyết trình chính thức. BTC sẽ sắp xếp và thông báo lịch cụ thể sau.
                    </p>
                    <div className="rounded-md border-l-4 border-green-400 bg-green-50 p-3">
                        <p className="text-xs text-green-800">
                            <span className="font-semibold">Lưu ý:</span> Tất cả các nhóm đều được quyền tham gia thuyết
                            trình chính thức. Vui lòng chọn <span className="font-bold">TẤT CẢ</span> các khung giờ mà{" "}
                            <span className="font-bold">TẤT CẢ</span> thành viên trong nhóm có thể tham gia được.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {officialSchedules.map((schedule) => (
                            <div key={`official-${schedule.date}`} className="space-y-3">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-700">{schedule.date}</span>
                                </div>
                                <div className="grid gap-3 pl-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {schedule.slots.map((slot) => (
                                        <div
                                            key={`official-${schedule.date}-${slot.time}`}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`official-${schedule.date}-${slot.time}`}
                                                checked={officialSlots.includes(`${schedule.date}|${slot.time}`)}
                                                onCheckedChange={() =>
                                                    handleOfficialSlotChange(`${schedule.date}|${slot.time}`)
                                                }
                                            />
                                            <Label
                                                htmlFor={`official-${schedule.date}-${slot.time}`}
                                                className="cursor-pointer text-sm font-normal text-gray-700 hover:text-gray-900"
                                            >
                                                {slot.time}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 border-t border-gray-200/70 pt-5">
                    <Button
                        type="submit"
                        className="group flex items-center gap-2 transition-all hover:shadow-md"
                        disabled={officialSlots.length === 0 || registerMutation.isPending}
                    >
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                    <p className="text-xs text-gray-500">
                        <span className="font-semibold text-red-600">Lưu ý:</span> Bạn phải chọn ít nhất 1 khung giờ cho
                        thuyết trình chính thức
                    </p>
                </div>
            </form>

            <ConfirmRegister
                handleConfirmSubmit={handleConfirmSubmit}
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
                trialSlot={trialSlot}
                officialSlots={officialSlots}
            />
        </section>
    );
};

export default FormRegisterPresent;
