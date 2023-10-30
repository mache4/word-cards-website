import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import CardsPage from './pages/CardsPage';
import Navbar from './components/Navbar';
import Card from './pages/Card';
import CardCreator from './pages/CardCreator';

function App() {
    return (
        <div className="min-h-screen bg-slate-500 text-white">
            <Navbar />
            <div className="px-[5%] py-5">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cards" element={<CardsPage />} />
                    <Route path="/cards/:id" element={<Card />} />
                    <Route path="/card-creator" element={<CardCreator />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;