import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export const ServicePage = () => {
    const [allServices, setAllServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(null); // Track booking status
    const [showModal, setShowModal] = useState(false); // Track modal visibility
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const fetchServiceInfo = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3000/api/auth/protected/get-all-service", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch services info: ${response.status}`);
                }

                const data = await response.json();
                setAllServices(data.service);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServiceInfo();
    }, []);

    useEffect(() => {
        const accessTokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
  
        if (accessTokenCookie) {
            const token = accessTokenCookie.split('=')[1];
            try {
                jwt.decode(token);
                setAccessToken(token);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('Access token not found in cookies');
        }
    }, []);

    // Function to handle booking creation
    const handleBookService = async (serviceId) => {
        setIsBooking(true);
        setBookingStatus(null);

        try {
          console.log("Booking service with ID:", serviceId);
            const response = await fetch("http://localhost:3000/api/auth/protected/create-booking", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId,
                    hotelId: 1, // Replace with actual hotel ID if dynamic
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to book service: ${response.status}`);
            }

            setBookingStatus("Service booked successfully!");
            setShowModal(true); // Show modal on success
        } catch (error) {
            console.error("Error booking service:", error);
            setBookingStatus("Failed to book service.");
            setShowModal(true); // Show modal on error
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
                <h2 className="text-4xl font-medium mb-6 text-center">Our Services</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "2rem",
                            padding: "1rem",
                        }}
                    >
                        {allServices.map((service) => (
                            <div
                                key={service.id}
                                style={{
                                    flexBasis: "calc(50% - 2rem)",
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                    padding: "24px",
                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "1rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                {service.imageLinks && (
                                    <img
                                        src={service.imageLinks}
                                        alt={service.name}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: "250px",
                                            borderRadius: "8px",
                                            objectFit: "contain",
                                        }}
                                    />
                                )}
                                <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
                                    <h2
                                        style={{
                                            fontSize: "1.5rem",
                                            textAlign: "left",
                                            flexBasis: "40%",
                                            margin: "5px",
                                            padding: "5px",
                                        }}
                                    >
                                        {service.name}
                                    </h2>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            flexBasis: "60%",
                                            margin: "5px",
                                            padding: "5px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "1rem",
                                                textAlign: "left",
                                                maxHeight: "100px",
                                                overflow: "auto",
                                                padding: "5px",
                                            }}
                                        >
                                            {service.descriptions}
                                        </p>
                                        <p style={{ fontSize: "1rem", textAlign: "left" }}>
                                            {service.freeService ? "Free Service" : "Paid Service"}
                                        </p>
                                    </div>
                                </div>

                                <p
                                    style={{
                                        fontSize: "1rem",
                                        textAlign: "left",
                                        color: "#007bff",
                                        cursor: "pointer",
                                        padding: "10px 20px",
                                        border: "1px solid #007bff",
                                        borderRadius: "5px",
                                        display: "inline-block",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bff", e.target.style.color = "#fff")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent", e.target.style.color = "#007bff")}
                                    onClick={() => handleBookService(service.id)}
                                >
                                    Book Service
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Show popup modal if available */}
                {showModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => setShowModal(false)} // Close on click outside
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "10px",
                                width: "90%",
                                maxWidth: "500px",
                                textAlign: "center",
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <h3>{bookingStatus}</h3>
                            <button onClick={() => setShowModal(false)} style={{ marginTop: "10px" }}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;
