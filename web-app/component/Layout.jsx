import React from 'react';
import HeaderNavBar from './HeaderNavBar';

function Layout({ children }) {
  return (
    <div>
    <HeaderNavBar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
