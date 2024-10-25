import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import HotelService from "@/component/HotelService";
import ActivitiesPanel from '@/component/ActivitiesPanel';
import ServicesView from '@/component/ServicesView';

export const Dashboard = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [checkinDate, setCheckinDate] = useState('');
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        console.log('Dashboard component rendered');
        const title = document.title;
        console.log("Document Title: ", title);

        const accessTokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        console.log("HERE IS THE COOKIE: " + document.cookie);

        if (accessTokenCookie) {
            const token = accessTokenCookie.split('=')[1];
            try {
                const decodedToken = jwt.decode(token);  
                setAccessToken(token);
                setRoomNumber(decodedToken.roomNumber);
                setCheckinDate(decodedToken.checkinDate);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('Access token not found in cookies');
        }
    }, []);

    return (
        <div className="flex min-h-screen">
        {/* Left Column - 15% Width */}
        <div className="w-1/6 bg-gray-100 hidden lg:block"></div>

        {/* Main Content - 70% Width */}
        <div className="w-full lg:w-4/6 p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-2">Room Number: {roomNumber || 'Unavailable'}</p>
            <p className="mb-4">Check-in Date: {checkinDate || 'Unavailable'}</p>
            {accessToken ? (
                <> 
                <div className='flex'>
                    <div className='w-1/2 border-white'>
                    <h1>Hotel Service</h1>
                        <HotelService accessToken={accessToken} /> 
                    </div>
                    <div className='w-1/2'>
                        <ActivitiesPanel accessToken={accessToken}/>
                    </div>
                </div>

                </>
            ) : (
                <p>Please log in to access your dashboard services.</p>
            )}
            <ServicesView />
        </div>

        {/* Right Column - 15% Width */}
        <div className="w-1/6 bg-gray-100 hidden lg:block"></div>
    </div>
    );
};