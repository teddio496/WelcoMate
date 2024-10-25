import React from "react";
import jwt from "jsonwebtoken";

export const HotelService = (accessToken) => {
    const payload = jwt.verify(accessToken);
    return (
        <div>
            <h1>Hotel Service</h1>
            <p>Room Number: {payload.roomNumber}</p>
            <p>Check-in Date: {payload.checkinDate}</p>
        </div>
    );
}

