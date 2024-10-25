import loadAttractions from './attractions/loadAttractions.js';
import loadHotelServices from './hotel_services/loadHotelServices.js';
import process from 'process';

const loadingFunc = process.argv[2];
const filename = process.argv[3];

if (!filename) {
    console.error('Please provide a filename as an argument');
    process.exit(1);
}

try {
    console.log()
    if (loadingFunc === 'attractions') {
        loadAttractions(filename);
    }
    else if (loadingFunc === 'hotel_services') {
        loadHotelServices(filename);
    }
}
catch (error) {
    console.error('Error loading data:', error);
}