import type { RoleType } from "~/types/user.types";
interface TimeStatus {
    text: string;
    color: string;
    status: "expired" | "urgent" | "near" | "far" | "active";
}
class Helper {
    static formatDate(date: string): string {
        const d = new Date(date);
        const adjusted = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        return adjusted.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    static formatDateTime(date: string): string {
        const d = new Date(date);
        const adjusted = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        return adjusted.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    static isInRangeDate(date: Date, startDate: string, endDate: string): boolean {
        const currentUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

        const start = new Date(startDate);
        const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());

        const end = new Date(endDate);
        const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

        return currentUTC >= startUTC && currentUTC <= endUTC;
    }

    static formatDuration(seconds: number): string {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const parts: string[] = [];
        if (days > 0) parts.push(`${days} ngày`);
        if (hours > 0) parts.push(`${hours} giờ`);
        if (minutes > 0) parts.push(`${minutes} phút`);
        if (secs > 0) parts.push(`${secs} giây`);

        return parts.length > 0 ? parts.join(" ") : "0 giây";
    }

    static timeAgo(date: string | Date): string {
        const now = new Date();
        const past = new Date(date);
        const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (diffInSeconds < 0) return "Vừa xong";

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} phút trước`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} giờ trước`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `${diffInDays} ngày trước`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} tháng trước`;
        }

        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} năm trước`;
    }

    static formatTimeRange(startDate: string | Date, endDate: string | Date): TimeStatus {
        const parseDate = (date: string | Date) => {
            let dateStr = date;
            if (typeof date === "string" && date.endsWith("Z")) {
                dateStr = date.slice(0, -1);
            }
            return new Date(dateStr);
        };

        const start = parseDate(startDate);
        const end = parseDate(endDate);
        const now = new Date();

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return { text: "Ngày không hợp lệ", color: "#9CA3AF", status: "expired" };
        }

        if (now > end) {
            return { text: "Đã kết thúc", color: "#6B7280", status: "expired" };
        }

        if (now >= start && now <= end) {
            return { text: "Đang diễn ra", color: "#10B981", status: "active" };
        }

        const diffInMs = start.getTime() - now.getTime();
        const seconds = Math.floor(diffInMs / 1000);

        let color = "#3B82F6";
        let status: TimeStatus["status"] = "far";

        if (seconds < 3600) {
            color = "#EF4444";
            status = "urgent";
        } else if (seconds < 86400) {
            color = "#F59E0B";
            status = "near";
        }

        const thresholds = [
            { unit: "năm", seconds: 31536000 },
            { unit: "tháng", seconds: 2592000 },
            { unit: "ngày", seconds: 86400 },
            { unit: "giờ", seconds: 3600 },
            { unit: "phút", seconds: 60 },
            { unit: "giây", seconds: 1 },
        ];

        for (const threshold of thresholds) {
            const value = Math.floor(seconds / threshold.seconds);
            if (value >= 1) {
                return {
                    text: `${value} ${threshold.unit} nữa`,
                    color,
                    status,
                };
            }
        }

        return { text: "Sắp bắt đầu", color: "#EF4444", status: "urgent" };
    }

    static isActive = (src: string, dest: string) => {
        return src === dest;
    };

    static belowAverage = (score: number | null) => {
        if (score === null) return false;
        return score < 50;
    };

    static hasRole = (roles: RoleType[] | string, role: RoleType) => {
        if (typeof roles === "string") {
            return roles === role;
        }
        return roles?.includes(role);
    };
    static getRoleName = (role: RoleType) => {
        switch (role) {
            case "CANDIDATE":
                return "Thí sinh";
            case "MENTOR":
                return "Mentor";
            case "JUDGE":
                return "Giám khảo";
            case "HOST":
                return "Host";
            case "ADMIN":
                return "Admin";
            default:
                return role;
        }
    };
}
export default Helper;
