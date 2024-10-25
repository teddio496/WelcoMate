import React from "react";

const Service = ({ service }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-black">{service.name}</h3>
        <p className="mb-1 text-black">{service.descriptions || "No description available."}</p>
        {/*<p className="mb-2 text-black">{service.freeService ? "This is a free service." : "This service has a fee."}</p>*/}
      </div>
      {service.imageLinks && (
        <img
          src={service.imageLinks}
          alt={service.name}
          className="w-32 h-32 object-cover rounded-lg ml-4"
        />
      )}
    </div>
  );
};

export default Service;
