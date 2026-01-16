import type { RoleType } from "~/types/user.types";

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

    static isActive = (src: string, dest: string) => {
        return src === dest;
    };

    static belowAverage = (score: number | null) => {
        if (score === null) return false;
        return score < 50;
    };

    static hasRole = (roles: RoleType[], role: RoleType) => {
        return roles.includes(role);
    };
}
export default Helper;
