import React from "react";

const Activity = ({ activity }) => {
  // activity is the current itinerary for a singular day
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.keys(activity).map((timeOfDay) => (
        <div key={timeOfDay} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={activity[timeOfDay].imageLink}
            alt={activity[timeOfDay].title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{activity[timeOfDay].title}</h2>
            <p className="text-sm text-gray-600">{activity[timeOfDay].address}</p>
            {activity[timeOfDay].link_url && (
              <a
                href={activity[timeOfDay].link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                More info
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;

