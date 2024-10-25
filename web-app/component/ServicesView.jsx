import React, { useState, useEffect } from "react";

export const ServicesView = () => {
    const [allServices, setAllServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServiceInfo = async () => {
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

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        overflowX: "auto",
                        padding: "1rem",
                    }}
                >
                    {allServices.map((service) => (
                        <div
                            key={service.id}
                            style={{
                                flex: "0 0 300px",
                                border: "1px solid #ccc",
                                borderRadius: "12px",
                                padding: "24px",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
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
                                        borderRadius: "8px"
                                    }}
                                />
                            )}
                            <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>{service.name}</h2>
                            <p style={{ fontSize: "1rem", textAlign: "center" }}>{service.descriptions}</p>
                            <p style={{ fontSize: "1rem", textAlign: "center" }}>{service.freeService ? "Free Service" : "Paid Service"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesView;
