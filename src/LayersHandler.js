const neurons = require('neurons.me');
const { logError } = require('./errorHandler');
module.exports = (rl) => {
const showLayerMenu = () => {
    console.log('\nLayers:');
    console.log('1. Create a new layer');
    console.log('2. List all layers');
    console.log('3. Back to Main Menu');
  };

  const createLayer = () => {
    // Logic to create a new layer
    const layer = new neurons.Layer();
    console.log('New layer created:', layer);
    };

    const listAllLayers = () => {
        const allLayers = neurons.Layer.map;
        if (allLayers.size === 0) {
          console.log('No layers found.');
        } else {
          console.log('List of all layers:');
          allLayers.forEach((layer, id) => {
            console.log(`Layer ID: ${id}`, layer);
          });
        }
      };
      return { showLayerMenu, createLayer, listAllLayers };
    };// end module exports