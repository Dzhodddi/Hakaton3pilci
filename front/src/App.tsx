import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import HomePage from './pages/HomePage';
import CreateProfilePage from './pages/CreateProfilePage';
import {AuthProvider, useAuth} from './context/auth_context';
import UserProfilePage from "./pages/UserProfilePage.tsx";
import type {JSX} from "react";
import EditInstancePage from './pages/EditInstancePage.tsx';
import { QuizPage } from './pages/QuizPage.tsx';



interface ProtectedRouteProps {
    children: JSX.Element;
}

// function ProtectedRoute({ children }: ProtectedRouteProps) {
//     const { user } = useAuth();
//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }
//     return children;
// }

function App() {
  return (
    <AuthProvider>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/newprofile' element={<CreateProfilePage />} />
            <Route
                path='/profile'
                element={
                    // <ProtectedRoute>
                        <UserProfilePage />
                    // </ProtectedRoute>
                }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/editinstance' element={<EditInstancePage />} />
            <Route path='/quiz' element={<QuizPage />} />
        </Routes>
    </AuthProvider>
    );
}

export default App
