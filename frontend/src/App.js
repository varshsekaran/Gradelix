import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeanDashboard from './pages/DeanDashboard';
import Navbar from './components/Navbar';
import SidebarLayout from './pages/SideBar'; 
import Analysis from './pages/Analysis';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is always visible */}
      <Navbar />

      <Routes>
        {/* Public Route (No Sidebar) */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes with Sidebar Layout */}
        <Route element={<SidebarLayout />}>
          <Route path="/hod" element={<DeanDashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          {/* Add more nested routes here if needed */}
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
