import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import LocalStorage from "~/utils/localstorage";

const driverObj = driver({
    showProgress: true,
    steps: [
        {
            element: "#topic",
            popover: {
                title: "Đề tài của nhóm!",
                description: "Bấm vào để xem đề tài mà nhóm bạn sẽ thực hiện trong Challenge Vòng 3.",
                side: "left",
                align: "start",
            },
        },

        {
            element: "#members",
            popover: {
                title: "Danh sách các thành viên trong nhóm.",
                description:
                    "Danh sách thành viên trong nhóm, vui lòng chủ động liên hệ mentor và các thành viên trong nhóm.",
                side: "bottom",
                align: "start",
            },
        },
        {
            element: "#mentor",
            popover: {
                title: "Mentor",
                description: "Thông tin về mentor của nhóm.",
                side: "bottom",
                align: "start",
            },
        },
        {
            element: "#timeline",
            popover: {
                title: "Lịch trình thực hiện Challenge Vòng 3",
                description: "Đây là nơi bạn có thể theo dõi các mốc thời gian quan trọng của thử thách.",
                side: "left",
                align: "start",
            },
        },
        {
            element: "#scoreboard",
            popover: {
                title: "Xem điểm các vòng trước",
                description: "Xem điểm các vòng trước của bạn tại đây.",
                side: "top",
                align: "start",
            },
        },
        {
            element: "#submissions",
            popover: {
                title: "Nộp đề tài",
                description: "Nộp đề tài kết thúc Challenge Vòng 3 tại đây.",
                side: "top",
                align: "start",
            },
        },
    ],
    onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("Bạn có chắc chắn muốn thoát hướng dẫn không?")) {
            driverObj.destroy();
        }
    },
});

const startTour = () => {
    setTimeout(() => {
        if (LocalStorage.getItem("isInstruction") === "true") return;
        driverObj.drive();
        LocalStorage.setItem("isInstruction", "true");
    }, 500);
};
export default startTour;
