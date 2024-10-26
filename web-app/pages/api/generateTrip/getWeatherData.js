import weather from 'weather-js';
import weatherToImage from './weatherToImage';

export default async function fetchWeatherData(startDate, endDate, city) {
    const weatherData = [];
    const endDateObj = new Date(endDate);

    return new Promise((resolve, reject) => {
        weather.find({ search: city, degreeType: 'C' }, (err, result) => {
            if (err) {
                return reject(err);
            }

            const forecastData = result[0].forecast; // forecast for the next 5 days
            let currentDate = new Date(startDate);

            while (currentDate <= endDateObj) {
                const dateStr = currentDate.toISOString().split('T')[0];

                const dayForecast = forecastData.find(forecast => forecast.date === dateStr);

                if (dayForecast) {
                    console.log(dayForecast.skycodeday.toString());
                    const categoryImage = weatherToImage[dayForecast.skycodeday.toString()];

                    weatherData.push({
                        date: dateStr,
                        low: dayForecast.low,
                        high: dayForecast.high,
                        condition: dayForecast.skytextday,
                        imageLink: categoryImage,
                        precipitation: dayForecast.precip + '%',
                    });
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

            resolve(weatherData);
        });
    });
}