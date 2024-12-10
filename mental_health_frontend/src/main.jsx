import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { AuthProvider } from './authContext.jsx';
import App from './App.jsx'
import Nav from "./components/Nav.jsx";
import HistoricalContainer from './components/HistoricalContainer.jsx';
import Footer from "./components/Footer.jsx";
import TopBar from './components/TopBar.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <TopBar />
                <Nav />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/historical" element={<HistoricalContainer />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
