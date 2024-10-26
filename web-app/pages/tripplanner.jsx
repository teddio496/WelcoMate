// pages/trip.js

import { set } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const TripForm = () => {
    const today = new Date(); 
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(today.getDate() + 4); 

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        date_range: { startDate: today, endDate: today },
        purpose_of_trip: '',
        who_is_travelling: '',
        interests: '',
        preferences: '',
        food_preferences: '',
        other_info: ''
    });

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormData((prevFormData) => ({
            ...prevFormData,
            date_range: { ...prevFormData.date_range, startDate: date }
        }));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormData((prevFormData) => ({
            ...prevFormData,
            date_range: { ...prevFormData.date_range, endDate: date }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedFormData = {
            ...formData,
            date_range: {
                start: formData.date_range.startDate.toISOString().split('T')[0],
                end: formData.date_range.endDate.toISOString().split('T')[0]
            }
        };
        console.log(formattedFormData);

        try {
            setLoading(true);
            const response = await fetch('/api/generateTrip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedFormData)
            });
            setLoading(false);
            if (response.ok) {
                console.log(response);
            } else {
                console.log('Error:', response.statusText);
            }
            console.log("Navigating to tripPlannerDisplay");
            window.location.href = '/tripPlannerDisplay';

        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center bg-warm-white  p-4 shadow-xxl">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-7/10 md:w-3/5 lg:w-2/5">
                <h2 className="text-4xl font-medium mb-6 text-center">Plan Your Trip</h2>
                {loading ? (
                    <p className="text-center text-lg font-medium">Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="startDate" className="text-lg font-medium">Start Date:</label>
                            <DatePicker 
                                selected={startDate} 
                                onChange={handleStartDateChange} 
                                minDate={today}          
                                maxDate={maxSelectableDate} 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate" className="text-lg font-medium">End Date:</label>
                            <DatePicker 
                                selected={endDate} 
                                onChange={handleEndDateChange} 
                                minDate={startDate}        
                                maxDate={maxSelectableDate}  
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="purpose_of_trip" className="text-lg font-medium">Purpose of Trip</label>
                            <select
                                id="purpose_of_trip"
                                name="purpose_of_trip"
                                value={formData.purpose_of_trip}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Select a purpose</option>
                                <option value="Leisure">Leisure</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Religious">Religious</option>
                                <option value="Family">Family</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="who_is_travelling" className="text-lg font-medium">Who is travelling with you?</label>
                            <select
                                id="who_is_travelling"
                                name="who_is_travelling"
                                value={formData.who_is_travelling}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="" disabled>Select who is travelling</option>
                                <option value="Alone">Alone</option>
                                <option value="Family">Family</option>
                                <option value="Friends">Friends</option>
                                <option value="Partner">Partner</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="interests" className="text-lg font-medium">Interests/Hobbies</label>
                            <textarea
                                id="interests"
                                name="interests"
                                value={formData.interests}
                                onChange={handleInputChange}
                                placeholder="What are your interests or hobbies?"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="preferences" className="text-lg font-medium">Attraction Preferences</label>
                            <textarea
                                id="preferences"
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleInputChange}
                                placeholder="What type of attractions do you prefer?"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="food_preferences" className="text-lg font-medium">Food Preferences</label>
                            <textarea
                                id="food_preferences"
                                name="food_preferences"
                                value={formData.food_preferences}
                                onChange={handleInputChange}
                                placeholder="What type of food do you prefer?"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="other_info" className="text-lg font-medium">Are there any other things you want to tell us?</label>
                            <textarea
                                id="other_info"
                                name="other_info"
                                value={formData.other_info}
                                onChange={handleInputChange}
                                placeholder="Any other information?"
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full py-2 mt-4 text-white font-medium bg-blue-500 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TripForm;
