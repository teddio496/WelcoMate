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
        <div>
            <h1>Dashboard</h1>
            <p>Room Number: {roomNumber}</p>
            <p>Check-in Date: {checkinDate}</p>
            <HotelService accessToken={accessToken} /> 
            <ActivitiesPanel accessToken={accessToken} />
            <ServicesView />
        </div>
    );
};