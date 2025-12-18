class Helper {
    // BE trả về date dạng: 2025-12-17T08:30:00Z
    static formatDate(date: string): string {
        return new Date(date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    static isInRangeDate(date: Date, startDate: string, endDate: string): boolean {
        return date >= new Date(startDate) && date <= new Date(endDate);
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
}
export default Helper;
