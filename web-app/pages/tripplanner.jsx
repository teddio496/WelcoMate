// pages/trip.js

import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TripForm = () => {
    const today = new Date(); 
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(today.getDate() + 4); 

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [formData, setFormData] = useState({
        dateRange: { startDate: today, endDate: today },
        purposeOfTrip: '',
        whoIsTravelling: '',
        interests: '',
        preferences: '',
        otherInfo: ''
    });

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormData((prevFormData) => ({
            ...prevFormData,
            dateRange: { ...prevFormData.dateRange, startDate: date }
        }));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormData((prevFormData) => ({
            ...prevFormData,
            dateRange: { ...prevFormData.dateRange, endDate: date }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className=" flex justify-center bg-warm-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-7/10 md:w-3/5 lg:w-2/5">
                <h2 className="text-4xl font-medium mb-6 text-center">Plan Your Trip</h2>
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
                        <label htmlFor="purposeOfTrip" className="text-lg font-medium">Purpose of Trip</label>
                        <select
                            id="purposeOfTrip"
                            name="purposeOfTrip"
                            value={formData.purposeOfTrip}
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
                        <label htmlFor="whoIsTravelling" className="text-lg font-medium">Who is travelling with you?</label>
                        <select
                            id="whoIsTravelling"
                            name="whoIsTravelling"
                            value={formData.whoIsTravelling}
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
                            placeholder="Do you prefer indoor or outdoor attractions?"
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="otherInfo" className="text-lg font-medium">Are there any other things you want to tell us?</label>
                        <textarea
                            id="otherInfo"
                            name="otherInfo"
                            value={formData.otherInfo}
                            onChange={handleInputChange}
                            placeholder="Any other information?"
                            className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-2 mt-4 text-white font-medium bg-blue-500 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripForm;
