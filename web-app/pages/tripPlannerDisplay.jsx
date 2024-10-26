import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/component/googleMaps';

const TripPlanner = () => {
    
    const [plans, setPlans] = useState(null); 
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);  

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                // Fetch all plan IDs for user with ID 1
                const planIdsResponse = await fetch('http://localhost:3000/api/plan?id=1');
                const planIds = await planIdsResponse.json();
                console.log(planIds);

                // Fetch daily plans for each plan ID synchronously
                const plan = planIds.planIds[1]
                const planResponse = await fetch(`http://localhost:3000/api/generateTrip?planId=${plan}`);
                setPlans(await planResponse.json()); 
            } 
            catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);

    const handleBack = () => {
        if (currentPlanIndex > 0) {
            setCurrentPlanIndex(currentPlanIndex - 1);
        }
    };

    const handleNext = () => {
        if (plans && currentPlanIndex < Object.keys(plans).length - 1) {
            setCurrentPlanIndex(currentPlanIndex + 1);
        }
    };

    if (!plans) {
        return <div>Loading...</div>;
    }

    const currentDayKey = `day_${currentPlanIndex + 1}`;
    const currentDay = plans[currentDayKey];

    return (
        <div className="p-4 flex">
            <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Trip Plan - Day {currentPlanIndex + 1}</h2>
            
            {currentDay ? (
                <div className="space-y-8">
                    <div className="bg-gray-300 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-black">Weather</h3>
                        <p className="text-black">High: {currentDay.weather.high} | Low: {currentDay.weather.low}</p>
                        <p className="text-black">Condition: {currentDay.weather.condition}</p>
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Breakfast</h3>
                            <p className="mb-1 text-black">{currentDay.breakfast.title}</p>
                            <p className="mb-1 text-black">{currentDay.breakfast.address}</p>
                            <p className="mb-2 text-black">{currentDay.breakfast.description}</p>
                        </div>
                        <img src={currentDay.breakfast.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>
                    
                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Morning</h3>
                            <p className="mb-1 text-black">{currentDay.morning.title}</p>
                            <p className="mb-1 text-black">{currentDay.morning.address}</p>
                            <p className="mb-2 text-black">{currentDay.morning.description}</p>
                            <a href={currentDay.morning.link_url} className="text-blue-500 hover:underline">More Info</a>
                        </div>
                        <img src={currentDay.morning.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>
                    
                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Lunch</h3>
                            <p className="mb-1 text-black">{currentDay.lunch.title}</p>
                            <p className="mb-1 text-black">{currentDay.lunch.address}</p>
                            <p className="mb-2 text-black">{currentDay.lunch.description}</p>
                        </div>
                        <img src={currentDay.lunch.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Afternoon</h3>
                            <p className="mb-1 text-black">{currentDay.afternoon.title}</p>
                            <p className="mb-1 text-black">{currentDay.afternoon.address}</p>
                            <p className="mb-2 text-black">{currentDay.afternoon.description}</p>
                            <a href={currentDay.afternoon.link_url} className="text-blue-500 hover:underline">More Info</a>
                        </div>
                        <img src={currentDay.afternoon.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Dinner</h3>
                            <p className="mb-1 text-black">{currentDay.dinner.title}</p>
                            <p className="mb-1 text-black">{currentDay.dinner.address}</p>
                            <p className="mb-2 text-black">{currentDay.dinner.description}</p>
                        </div>
                        <img src={currentDay.dinner.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md flex items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-black">Night</h3>
                            <p className="mb-1 text-black">{currentDay.night.title}</p>
                            <p className="mb-1 text-black">{currentDay.night.address}</p>
                            <p className="mb-2 text-black">{currentDay.night.description}</p>
                            <a href={currentDay.night.link_url} className="text-blue-500 hover:underline">More Info</a>
                        </div>
                        <img src={currentDay.night.imageLink} alt="attraction" className="w-32 h-32 object-cover rounded-lg ml-4" />
                    </div>
                </div>
            ) : (
                <p className="text-black">No plan available for this day.</p>
            )}

            <div className="mt-8 flex justify-between">
                <button 
                    onClick={handleBack} 
                    disabled={currentPlanIndex === 0} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Previous Day
                </button>
                <button 
                    onClick={handleNext} 
                    disabled={currentPlanIndex >= Object.keys(plans).length - 1} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Next Day
                </button>
                </div>
                
            </div>
            <GoogleMapComponent />
        </div>
        
    );

};

export default TripPlanner;