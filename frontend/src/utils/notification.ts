import Swal from "sweetalert2";
type NotifiProps = { text: string; title?: string };
class Notification {
    static notification({
        icon = "success",
        title = "Thành công",
        text = "",
    }: {
        icon?: "success" | "error" | "warning" | "info" | "question";
        title?: string;
        text?: string;
    }) {
        return Swal.fire({
            icon,
            title,
            text,
        });
    }

    static success({ text = "Thao tác thành công", title = "Thành công" }: NotifiProps) {
        return this.notification({ icon: "success", title, text });
    }

    static error({ text = "Thao tác thất bại!", title = "Lỗi" }: NotifiProps) {
        return this.notification({ icon: "error", title, text });
    }
}
export default Notification;
