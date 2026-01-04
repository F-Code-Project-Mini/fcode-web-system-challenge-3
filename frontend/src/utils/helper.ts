class Helper {
    // BE trả về date dạng: 2025-12-17T08:30:00Z
    static formatDate(date: string): string {
        const d = new Date(date);
        // Adjust for timezone offset
        const adjusted = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        return adjusted.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    static isInRangeDate(date: Date, startDate: string, endDate: string): boolean {
        // Chuyển tất cả về UTC để tránh lỗi timezone
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
    static isActive = (src: string, dest: string) => {
        return src === dest;
    };
}
export default Helper;
