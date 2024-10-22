import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaTachometerAlt, FaUserFriends, FaChartLine, FaFileAlt } from 'react-icons/fa';


const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: <FaTachometerAlt /> },
        { name: 'Leads', path: '/leads', icon: <FaUserFriends /> },
        { name: 'Analytics', path: '/analytics', icon: <FaChartLine /> },
        { name: 'Reports', path: '/reports', icon: <FaFileAlt /> },
    ]    
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
      <nav className="flex flex-col p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="flex items-center p-2 text-sm hover:bg-gray-700 rounded transition duration-200"
            activeClassName="bg-gray-700"
            exact
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
