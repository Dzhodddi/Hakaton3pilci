import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateProfilePage from './pages/CreateProfilePage';
import {AuthProvider, useAuth} from './context/auth_context';
import UserProfilePage from "./pages/UserProfilePage.tsx";
import type {JSX} from "react";



interface ProtectedRouteProps {
    children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function App() {
  return (
    <AuthProvider>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/newprofile' element={<CreateProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path='/profile'
                element={
                    <ProtectedRoute>
                        <UserProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </AuthProvider>
    );
}

export default App
