import React, { useState, useEffect } from "react";
import Service from "../component/Service";

const HotelService = () => {
  const [guestInfo, setGuestInfo] = useState(null);
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken=')).split('=')[1];
      try {
        const guestResponse = await fetch("/api/auth/protected/get-guest-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!guestResponse.ok) {
          throw new Error(`Error fetching guest info: ${guestResponse.status}`);
        }

        const { guestInfo } = await guestResponse.json();
        console.log("GUEST FETCHED: ", guestInfo);
        setGuestInfo(guestInfo);

        const servicePromises = guestInfo.serviceBookings.map(serviceBooking => {
          const id = serviceBooking.id;
          return fetch(`/api/auth/protected/get-service/?id=${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        });

        const serviceResponses = await Promise.all(servicePromises);
        const servicesData = [];
        for (const response of serviceResponses) {
          if (!response.ok) {
            throw new Error(`Error fetching service: ${response.status}`);
          }
          const { service } = await response.json(); // Await each JSON parsing
          servicesData.push(service);
          console.log(service);
        }
        setServices(servicesData);
      } catch (e) {
        console.error("Error fetching guest or services data: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Hotel Services</h1>
      {guestInfo ? (
        <>
          <p>Room Number: {guestInfo.roomNumber}</p>
          <p>Check-in Date: {guestInfo.checkinDate}</p>

          {
            services.length > 0 ? (
              services.map((service) => <Service key={service.id} service={service} />)
            ) : <p>No services available.</p>
          }
        </>
      ) : (
        <p>No guest information available.</p>
      )}
    </div>
  );
};

export default HotelService;
