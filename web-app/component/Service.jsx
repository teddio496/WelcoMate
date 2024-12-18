import React from "react";

const Service = ({ service, onCancel }) => {
  return (
    <>
    <div className="bg-white p-4  shadow-md flex items-center ">
      <div className="flex-1 ">
        <h2 className="text-lg font-semibold text-gray-800">{service.name}</h2>
        <p className="text-sm text-gray-600">{service.descriptions || "No description available."}</p>
        {/*<p className="mb-2 text-black">{service.freeService ? "This is a free service." : "This service has a fee."}</p>*/}
        <button
          className="bg-[#E2DCC8] px-4 py-2 rounded-md "
          onClick={onCancel}>
          Cancel
        </button>
      </div>
      {service.imageLinks && (
        <img
          src={service.imageLinks}
          alt={service.name}
          className="w-32 h-32 object-cover rounded-lg ml-4"
        />
      )}
    </div>
    <hr className="my-4 border-gray-300" />
    </>
  );
};

export default Service;
