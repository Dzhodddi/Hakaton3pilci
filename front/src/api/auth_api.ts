import { AUTH_API_BASE, auth_api } from "./clients.ts"

interface UserProfile {
    email: string
}

export const loginWithGoogle = (): void => {
    window.location.href = `${AUTH_API_BASE}/auth/google`;
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
    try {
        const { data } = await auth_api.get<UserProfile>("/api/me");
        return data
    } catch (err) {
        return null;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        await auth_api.post("/api/logout");
        return true;
    } catch (err) {
        return false;
    }
};