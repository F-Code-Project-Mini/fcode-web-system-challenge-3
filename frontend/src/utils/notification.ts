import { toast } from "sonner";
type NotifiProps = { text: string; title?: string };
class Notification {
    static success({ text = "Thao tác thành công", title = "Thành công" }: NotifiProps) {
        return toast.success(title, {
            description: text,
        });
    }

    static error({ text = "Thao tác thất bại!", title = "Lỗi" }: NotifiProps) {
        return toast.error(title, {
            description: text,
        });
    }

    static info({ text = "Đang xử lý...", title = "Thông tin" }: NotifiProps) {
        return toast.info(title, {
            description: text,
        });
    }

    static warning({ text = "Cảnh báo!", title = "Chú ý" }: NotifiProps) {
        return toast.warning(title, {
            description: text,
        });
    }
}
export default Notification;
