import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import HotelService from "@/component/HotelService";
import ActivitiesPanel from '@/component/ActivitiesPanel';
import ServicesView from '@/component/ServicesView';

export const Dashboard = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [guestInfo, setGuestInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessTokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenCookie) {
      const token = accessTokenCookie.split('=')[1];
      try {
        const decodedToken = jwt.decode(token);
        setAccessToken(token);
        setRoomNumber(decodedToken.roomNumber);
        setCheckinDate(decodedToken.checkinDate.split('T')[0]);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/protected/get-guest-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch guest info: ${response.status}`);
        }
        const data = await response.json();
        setGuestInfo(data.guestInfo);
      } catch (error) {
        setError("Error fetching guest info");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (accessToken) {
      fetchGuestInfo();
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      {/* Full-width card */}

      <div className="flex w-full">
        <div className="w-1/6 hidden lg:block"></div>
        
        <div className="w-full lg:w-4/6 p-4 bg-warm-white rounded-lg" style={{ boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)' }}>
          <div className="relative">
            <img
              src="https://www.shhotelsandresorts.com/sites/default/files/styles/scale_crop_1280x600/public/brandfolder/sbx829qxqctgttnvnpb44gf/231218_1_Hotel_MR_Kingw1921.png?h=f0fb51a5&itok=g8hn-K2z"
              alt="Hotel"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40">
              <div className="bg-white bg-opacity-40 backdrop-blur-md shadow-md rounded-lg p-8 w-11/12 sm:w-7/10 md:w-3/5">
                <h6 className="text-5xl font-normal whitespace-nowrap">
                  Welcome, {guestInfo?.fullname || 'User'}!
                </h6>
                <d className="text-2xl mt-4">
                  Room Number: <strong>{roomNumber || 'Unavailable'}</strong>
                </d>
                <hr className="my-6 border-gray-300" />
                <div className="flex justify-between">
                  <div>
                    <d className="text-xl">Check-in:</d><br />
                    <d className="text-xl text-blue-600 font-medium">{checkinDate || 'Unavailable'}</d>
                  </div>
                  <div>
                    <d className="text-xl">Check-out:</d><br />
                    <d className="text-xl text-red-600 font-medium">{guestInfo?.checkoutDate?.split('T')[0] || 'Unavailable'}</d>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-8 bg-[#E2DCC8] bg-opacity-40 backdrop-blur-md rounded-lg shadow-md my-6">
              <h1 className="text-3xl font-semibold text-center mb-4">Plan a Trip!</h1>
              <p className="text-lg text-center mb-4">
                Discover the future of travel with our AI-powered trip planning service. Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, our AI tailors every aspect of your journey to your preferences.
              </p>
              <div className="text-center mb-4">
                <a href="/tripplanner" className="text-lg font-medium px-6 py-2 bg-white text-black rounded-full hover:bg-[#E2DCC8] transition duration-300 inline-block shadow">
                  Go Planning
                </a>
              </div>
          </div>

          {accessToken ? (
            <div className="flex">
              <div className="w-1/2 p-16">
                <h1 className="p-1 text-2xl mb-2">Booked Services</h1>
                <HotelService />
              </div>
              <div className="w-1/2 p-16">
                <h1 className="p-1 text-2xl mb-2">Trip Itinerary
                  <span className="ml-2 px-2 py-1 rounded-lg bg-gray-200">Day 1</span>
                </h1>
                <ActivitiesPanel />
              </div>
            </div>
          ) : (
            <p className="text-xl">Please log in to access your dashboard services.</p>
          )}
          
          <h1 className="p-1 text-2xl">Available Services</h1>
          <ServicesView />
        </div>
        
        <div className="w-1/6 hidden lg:block"></div>
      </div>
    </div>
  );
};
