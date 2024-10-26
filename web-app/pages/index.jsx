import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Dashboard } from "./dashboard";

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExists, setAccessTokenExists] = useState(false);
  
  useEffect(() => {
    const accessTokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenCookie) {
      const token = accessTokenCookie.split('=')[1];
      try {
        const decodedToken = jwt.decode(token);
        setAccessToken(token);
        setAccessTokenExists(true);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div>
      {accessTokenExists ? (
        <Dashboard />
      ) : (
        <p>Please check in at the receptionist to view your dashboard.</p>
      )}
    </div>
  );
}
