export interface User {
    _id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
    verifiedDevices: string[];
    createdAt: string;
    updatedAt: string;
    role: string;
    otpCreatedAt: string | null;
    deviceVerificationOtp: string | null;
    deviceVerificationOtpCreatedAt: string | null;
    pendingDeviceFingerprint: string | null;
    refreshToken: string;
} 