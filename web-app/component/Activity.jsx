import React from "react";

const Activity = ({ activity }) => {
  return (
    <>
      {Object.keys(activity).slice(1).map((timeOfDay) => (
        <>
          <div key={timeOfDay} className="bg-white p-4 flex items-center ">
          <div className="flex-1">
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
            <img
              src={activity[timeOfDay].imageLink}
              alt={activity[timeOfDay].title}
              className="w-32 h-32 object-cover rounded-lg ml-4"
            />
        </div>
          <hr className="my-4 border-gray-300" />
        </>
      ))}
    </>
  );
};

export default Activity;

