import React, { useState, useEffect } from "react";

export const ServicePage = () => {
    const [allServices, setAllServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Ensures full-screen height
    backgroundColor: "#f0f0f0", // Optional: background color for the page
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

            {/* Content area with h2 and p tags */}
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
                    color: "#007bff", // Blue color to resemble a link
                    cursor: "pointer", // Change cursor to pointer on hover
                    padding: "10px 20px", // Add padding to make it look like a button
                    border: "1px solid #007bff", // Add border to give it a button-like appearance
                    borderRadius: "5px", // Rounded corners
                    display: "inline-block", // Makes sure padding behaves properly
                    transition: "background-color 0.3s ease", // Smooth background color transition
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bff", e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent", e.target.style.color = "#007bff")}
                >
                Book Service
                </p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
    );
}

export default ServicePage;
