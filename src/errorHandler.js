const logError = (error) => {
    console.error('An error occurred:', error.message);
    process.exit(1);
  };
  
  module.exports = {
    logError,
  };
  