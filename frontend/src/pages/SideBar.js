import React from 'react';
import { Outlet } from 'react-router-dom';
import './SideBar.css';
import profilePic from '../assets/Profile.jpg'; // ✅ Adjust path if different

function SidebarLayout() {
  return (
    <div className="app-container">
      <div className="sidebar">
        {/* ✅ Set profile image as inline background */}
        <div
          className="profile-logo"
          style={{
            backgroundImage: `url(${profilePic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="profile-info">
          <div className="name">Dr.L.Lakshmanan - CSE</div>
          <div className="degree">M.E., Ph.D</div>
          <div className="role">Dean</div>
        </div>

        <button className="sidebar-btn">CAE</button>
        <button className="sidebar-btn">SEMESTER</button>
        <button className="sidebar-btn">SAVE CAE</button>
        <button className="sidebar-btn">SAVE SEMESTER</button>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;