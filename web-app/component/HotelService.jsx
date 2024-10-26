import React, { useState, useEffect } from "react";
import Service from "../component/Service";

const HotelService = () => {
  const [guestInfo, setGuestInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
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

        const servicePromises = guestInfo.serviceBookings.map((serviceBooking) => {
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
          const { service } = await response.json();
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

  const handleCancelBooking = async (serviceId) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      .split("=")[1];
    try {
      const cancelResponse = await fetch(`/api/auth/protected/cancel-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (!cancelResponse.ok) {
        throw new Error(`Error cancelling service: ${cancelResponse.status}`);
      }

      // Update services state after cancellation
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      console.log(`Service ${serviceId} canceled successfully.`);
    } catch (e) {
      console.error("Error cancelling service: ", e);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-y-auto h-[700px] shadow-lg border border-black border-4 rounded-lg">
      {guestInfo ? (
        services.length > 0 ? (
          services.map((service) => (
            <Service
              key={service.id}
              service={service}
              onCancel={() => handleCancelBooking(service.id)}
            />
          ))
        ) : (
          <p>No services booked.</p>
        )
      ) : (
        <p>No guest information available.</p>
      )}
    </div>
  );
};

export default HotelService;
