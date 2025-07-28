import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeanDashboard from './pages/DeanDashboard';
import Navbar from './components/Navbar';
import SidebarLayout from './pages/SideBar'; 
import Analysis from './pages/Analysis';
import SavedCae from './pages/SavedCae';
import SavedSem from './pages/SavedSem';
import StaffAnalysis from './pages/StaffAnalysis';
import CompareCae from './pages/CompareCae';
import CompareSem from './pages/CompareSem';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<SidebarLayout />}>
          <Route path="/hod" element={<DeanDashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/saved-cae" element={<SavedCae />} />
          <Route path="/saved-sem" element={<SavedSem />} />
          <Route path="/staff-analysis" element={<StaffAnalysis/>} />
          <Route path="/compare-cae" element={<CompareCae/>} />
          <Route path="/compare-sem" element={<CompareSem/>} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

