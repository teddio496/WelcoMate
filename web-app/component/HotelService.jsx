import React, { useState, useEffect } from "react";

export const HotelService = ({ accessToken }) => {
    const [guestInfo, setGuestInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setGuestInfo(data);
            } catch (error) {
                setError("Error fetching guest info");
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGuestInfo();
    }, [accessToken]);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Hotel Service</h1>
            {guestInfo ? (
                <>
                    <p>Room Number: {guestInfo.roomNumber}</p>
                    <p>Check-in Date: {guestInfo.checkinDate}</p>
                </>
            ) : (
                <p>No guest information available.</p>
            )}
        </div>
    );
};

export default HotelService;
