import loadCSVData from './loadDataHelper.js';
import process from 'process';

const filename = process.argv[2];

if (!filename) {
    console.error('Please provide a filename as an argument');
    process.exit(1);
}

try {
    loadCSVData(filename);
}
catch (error) {
    console.error('Error loading data:', error);
}