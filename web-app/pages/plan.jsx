import React, { useEffect, useState } from 'react';
import MapComponent from '@/component/GoogleMaps';

const TripPlanner = () => {
    const [plans, setPlans] = useState(null);
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
    const [address, setAddress] = useState('');
    const [selectedMeal, setSelectedMeal] = useState(''); // Track selected meal

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const planIdResponse = await fetch('/api/plan?id=1');
                const planId = await planIdResponse.json();
                const plan = planId.planId;
                const planResponse = await fetch(`/api/generateTrip?planId=${plan}`);
                const t = await planResponse.json();
                setPlans(t);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };
        fetchPlans();
    }, []);

    const handleSelectDay = (index) => {
        setCurrentPlanIndex(index);
        setSelectedMeal(''); // Reset selected meal when changing days
    };

    const handleSelectMeal = (meal, address) => {
        setSelectedMeal(meal);
        setAddress(address);
    };

    if (!plans) {
        return <div>Loading...</div>;
    }

    const totalDays = Object.keys(plans).length;
    const currentDayKey = `day_${currentPlanIndex + 1}`;
    const currentDay = plans[currentDayKey];

    const mealComponent = (meal, mealData) => (
        <div
            className={`bg-white p-4 rounded-md shadow-md flex items-center cursor-pointer ${
                selectedMeal === meal ? 'bg-blue-100 border-2 border-blue-500' : ''
            }`}
            onClick={() => handleSelectMeal(meal, mealData.address)}
        >
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-black">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                <p className="mb-1 text-black">{mealData.title}</p>
                <p className="mb-1 text-black">{mealData.address}</p>
                <p className="mb-2 text-black">{mealData.description}</p>
                {mealData.link_url && (
                    <a href={mealData.link_url} className="text-blue-500 hover:underline">More Info</a>
                )}
            </div>
            <img src={mealData.imageLink} alt={meal} className="w-32 h-32 object-cover rounded-lg ml-4" />
        </div>
    );

    return (
        <div className="flex min-h-screen">
            <div className="w-1/6 hidden lg:block"></div>

            <div className="p-4 flex flex-col w-2/6">
                {/* Day Selection Buttons (Top) */}
                <div className="flex justify-center mb-4 space-x-2">
                    {Array.from({ length: totalDays }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectDay(index)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPlanIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                        >
                            Day {index + 1}
                        </button>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Trip Plan - Day {currentPlanIndex + 1}</h2>

                    {currentDay ? (
                        <div className="space-y-8">
                            <div className="bg-gray-400 p-6 rounded-lg shadow-lg flex items-center text-white">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-3">Weather</h3>
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="text-2xl font-bold">{currentDay.weather.high}°</p>
                                            <p className="text-sm text-gray">High</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{currentDay.weather.low}°</p>
                                            <p className="text-sm text-gray">Low</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-lg font-medium">{currentDay.weather.condition}</p>
                                </div>
                                <img src={currentDay.weather.imageLink} alt="weather" />
                            </div>

                            {mealComponent('breakfast', currentDay.breakfast)}
                            {mealComponent('morning', currentDay.morning)}
                            {mealComponent('lunch', currentDay.lunch)}
                            {mealComponent('afternoon', currentDay.afternoon)}
                            {mealComponent('dinner', currentDay.dinner)}
                            {mealComponent('night', currentDay.night)}

                        </div>
                    ) : (
                        <p className="text-black">No plan available for this day.</p>
                    )}

                    {/* Day Selection Buttons (Bottom) */}
                    <div className="mt-8 flex justify-center space-x-2">
                        {Array.from({ length: totalDays }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectDay(index)}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPlanIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                }`}
                            >
                                Day {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-1/12"></div>

            <div className="w-2/6">
                <MapComponent address={address} />
            </div>

            <div className="w-1/6 hidden lg:block"></div>
        </div>
    );
};

export default TripPlanner;
