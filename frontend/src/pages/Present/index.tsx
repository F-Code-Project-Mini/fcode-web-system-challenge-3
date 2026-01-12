import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import useAuth from "~/hooks/useAuth";
import Loading from "~/components/Loading";
import FormRegisterPresent from "./FormRegisterPresent";
import Notification from "./Notification";
import SchedulePresent from "./SchedulePresent";
import { useState } from "react";

const PresentPage = () => {
    const { user } = useAuth();
    const [isReload, setIsReload] = useState(false);
    const teamId = user?.candidate?.teamId;

    const { data: scheduleData, isLoading } = useQuery({
        queryKey: ["schedulePresentation", teamId],
        queryFn: async () => {
            if (!teamId) return null;
            const res = await TeamApi.getSchedulePresentation(teamId);
            return res;
        },
        enabled: !!teamId,
    });

    if (isLoading) return <Loading />;

    const hasRegistered = scheduleData?.result;

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Đăng ký thời gian thuyết trình</h1>
                <span className="mt-2 block text-sm text-gray-600">
                    Chọn thời gian phù hợp để tham gia buổi thuyết trình thử và thuyết trình chính thức của Challenge 3.
                </span>
            </section>

            {hasRegistered ? (
                <SchedulePresent data={scheduleData.result} />
            ) : (
                <>
                    <Notification />
                    <FormRegisterPresent isReload={isReload} setIsReload={setIsReload} />
                </>
            )}
        </>
    );
};

export default PresentPage;
