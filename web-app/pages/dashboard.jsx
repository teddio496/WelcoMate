import React, { useEffect, useState } from 'react';

export const Dashboard = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [checkinDate, setCheckinDate] = useState('');

  useEffect(() => {
    // const async () => {
      
    // };

    const accessTokenCookie = document.cookie.ssplit('; ').find(row => row.startsWith('accessToken='));
    console.log("HERE IS THE COOKIE: " + document.cookie);
  }, []);  // Empty dependency array ensures this runs once after the initial render

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Room Number: {roomNumber}</p>
      <p>Check-in Date: {checkinDate}</p>
    </div>
  );
};