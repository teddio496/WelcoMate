import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export const TripForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [formData, setFormData] = useState({
        dateRange: '',
        purposeOfTrip: '',
        interests: '',
        preferences: '',
        otherInfo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, like sending data to a server or displaying it in another component.
        console.log(formData);
    };

    return (
        <div className="trip-form-container">
        <h2>Plan Your Trip</h2>
        <form onSubmit={handleSubmit} className="trip-form">
            {/* Date Range Input */}
            <div className="form-group">
            <label htmlFor="startDate">Start Date: </label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            {/* Date Range Input */}
            <div className="form-group">
            <label htmlFor="endDate">End Date: </label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>

            {/* Purpose of Trip Dropdown */}
            <div className="form-group">
            <label htmlFor="purposeOfTrip">Purpose of Trip</label>
            <select
                id="purposeOfTrip"
                name="purposeOfTrip"
                value={formData.purposeOfTrip}
                onChange={handleInputChange}
                required
            >
                <option value="" disabled>Select a purpose</option>
                <option value="Vacation">Vacation</option>
                <option value="Business">Business</option>
                <option value="Leisure">Leisure</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
            </select>
            </div>

            {/* Who is travelling with you? */}
            <div className="form-group">
            <label htmlFor="whoIsTravelling">Who is travelling with you?</label>
            <select
                id="whoIsTravelling"
                name="whoIsTravelling"
                value={formData.whoIsTravelling}
                onChange={handleInputChange}
                required
            >
                <option value="" disabled>Select who is travelling</option>
                <option value="Alone">Alone</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Partner">Partner</option>
            </select>
            </div>

            {/* Interests/Hobbies Textbox */}
            <div className="form-group">
            <label htmlFor="interests">Interests/Hobbies</label>
            <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="What are your interests or hobbies?"
                required
            ></textarea>
            </div>

            {/* Attraction Preferences Textbox */}
            <div className="form-group">
            <label htmlFor="preferences">Attraction Preferences</label>
            <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences}
                onChange={handleInputChange}
                placeholder="Do you prefer indoor or outdoor attractions?"
                required
            ></textarea>
            </div>

            {/* Other Information Textbox */}
            <div className="form-group">
            <label htmlFor="otherInfo">Are there any other things you want to tell us?</label>
            <textarea
                id="otherInfo"
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleInputChange}
                placeholder="Any other information?"
            ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">Submit</button>
        </form>
        </div>
    );
};
