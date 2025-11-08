import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginWithGoogle, logout } from "../api/auth_api";
import { useNavigate } from "react-router-dom";

export interface User{
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => void;
    logoutUser: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };
        init();
    }, []);

    const login = () => {
        loginWithGoogle();
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };
    const refreshUser = async () => {
        const currentUser = await getCurrentUser();
        if (!user)
            navigate('/')
        setUser(currentUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logoutUser, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
