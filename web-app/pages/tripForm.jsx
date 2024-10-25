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
        dateRange: {
            startDate: today,
            endDate: today
        },
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
            dateRange: {
                ...prevFormData.dateRange,
                startDate: date
            }
        }));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormData((prevFormData) => ({
            ...prevFormData,
            dateRange: {
                ...prevFormData.dateRange,
                endDate: date
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <div className="trip-form-container">
        <h2>Plan Your Trip</h2>
        <form onSubmit={handleSubmit} className="trip-form">

            <div className="form-group">
            <label htmlFor="startDate">Start Date: </label>
            <DatePicker 
                selected={startDate} 
                onChange={handleStartDateChange} 
                minDate={today}          
                maxDate={maxSelectableDate} 
            />
            </div>

            <div className="form-group">
            <label htmlFor="endDate">End Date: </label>
            <DatePicker 
                selected={endDate} 
                onChange={handleEndDateChange} 
                minDate={startDate}        
                maxDate={maxSelectableDate}  
            />
            </div>

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
                <option value="Leisure">Leisure</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Leisure">Religious</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
            </select>
            </div>

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

            <button type="submit" className="submit-btn">Submit</button>
        </form>
        </div>
    );
};

export default TripForm;