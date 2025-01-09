import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { AuthProvider } from "./authContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from './App.jsx'
import Nav from "./components/Nav.jsx";
import HistoricalContainer from './components/HistoricalContainer.jsx';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import TopBar from './components/TopBar.jsx';
import About from "./components/About.jsx";
import Profile from "./components/Profile.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <TopBar />
                <Nav />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>} />
                    <Route path="/historical" element={
                        <ProtectedRoute>
                            <HistoricalContainer />
                        </ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/what-is" element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>} />
                    <Route path="/me" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
