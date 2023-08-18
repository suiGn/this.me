const path = require('path');

module.exports = {
  entry: './me.js', // Your main file
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist') // Directory where bundle.js will be placed
  },
  mode: 'production', // Use 'development' for debugging and development purposes
  module: {
    rules: [
      // You can add loaders here if needed, for instance, for processing other file types or transpiling code.
    ]
  },
  plugins: [
    // Add any webpack plugins here if necessary.
  ]
};
