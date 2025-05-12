import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isSidebarOpen }) {
  return (
    <div className={`bg-dark text-white`} id="sidebar">
      <div className="sidebar-heading text-center py-4">My App</div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-dark text-white">Home</Link>
        <Link to="/about" className="list-group-item list-group-item-action bg-dark text-white">About</Link>
        <Link to="/contact" className="list-group-item list-group-item-action bg-dark text-white">Contact</Link>
      </div>
    </div>
  );
}

export default Sidebar;
