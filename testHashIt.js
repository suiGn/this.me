const { hashThis } = require('./main.js');
const hashValueForFile = hashThis('/');
console.log(`Hash value for the file: ${hashValueForFile}`);