import React from 'react';

function HeaderNavBar() {
  const navItems = ['Service', 'TripPlanner', 'Plan'];

  return (
    <header  style={{ backgroundColor: '#E2DCC8', padding: 12,boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }} > 
      <div className="flex">
        <div className='w-1/6'></div>
        <div className='w-4/6 flex justify-between items-center'>
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
          </div>
        <div className='w-1/6'></div>


      </div>
    </header>
  );
}

export default HeaderNavBar;
