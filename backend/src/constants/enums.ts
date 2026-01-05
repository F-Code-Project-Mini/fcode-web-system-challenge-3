export enum TokenType {
    AccessToken,
    RefreshToken,
    ActivateAccount,
}

export enum ExpiresInTokenType {
    AccessToken = 30 * 24 * 60 * 60, // 30 ngày
    RefreshToken = 30 * 24 * 60 * 60, // 30 ngày
    ActivateAccount = 24 * 60 * 60, // 24 giờ
}

export enum RoleType {
    CANDIDATE = "CANDIDATE",
    HOST = "HOST",
    MENTOR = "MENTOR",
    JUDGE = "JUDGE",
    ADMIN = "ADMIN",
}

export enum RoomStatus {
    AVAILABLE = "AVAILABLE",
    IN_USE = "IN_USE",
    COMPLETED = "COMPLETED",
}
