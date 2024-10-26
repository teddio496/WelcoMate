import React from 'react';

function HeaderNavBar() {
  const navItems = ['Service', 'TripPlanner', 'Plan'];

  return (
    <header  style={{
      backgroundColor: '#E2DCC8',
      padding: 12,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }} > 
      <div className="flex justify-between items-center">
        <div>        </div>
        <div className="font-bold text-2xl text-black">
          <a href="/" className="text-black no-underline"><d>Your Hotel</d></a>
        </div>

        <nav className="md:flex items-center gap-5">
          {navItems.map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-black no-underline mr-5 px-4 py-2 rounded-md inline-block hover:bg-gray-200"
            >
              <d>{item}</d>
            </a>
          ))}
        </nav>
        <div> </div>

      </div>
    </header>
  );
}

export default HeaderNavBar;
