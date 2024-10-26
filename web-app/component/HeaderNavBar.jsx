import React from 'react';

function HeaderNavBar() {
  const navItems = ['Service', 'TripPlanner', 'Plan'];

  return (
    <header style={{ backgroundColor: '#E2DCC8', padding: 12, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} >
      <div className="flex justify-between items-center">
        <div>        </div>
        <div className="font-bold text-2xl text-black">
          <a href="/" className="text-black no-underline"><d>Your Hotel</d></a>
        </div>
      </div>
    </header>
  );
}

export default HeaderNavBar;
