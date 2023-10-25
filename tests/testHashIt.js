const { hashThis } = require('../src/main.js');
const hashValueForFile = hashThis('/');
console.log(`Hash value for the file: ${hashValueForFile}`);