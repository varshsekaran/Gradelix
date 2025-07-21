import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeanDashboard from './pages/DeanDashboard';
import Navbar from './components/Navbar';
import SidebarLayout from './pages/SideBar'; 
import Analysis from './pages/Analysis';
import SavedCae from './pages/SavedCae';

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
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
