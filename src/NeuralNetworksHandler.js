const neurons = require('neurons.me');
const { logError } = require('./errorHandler');
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

module.exports = (rl) => {
  const showNeuralNetworkMenu = () => {
    console.log('\nNeural Networks:');
    console.log('1. Create a new neural network');
    console.log('2. List all neural networks');
    console.log('3. Back to Main Menu');
  };

  const createNeuralNetwork = () => {
    // Logic to create a new neural network
    const neuralNetwork = new neurons.NeuralNetwork();
    console.log('New neural network created:', neuralNetwork);
  };

  const listAllNeuralNetworks = () => {
    const allNeuralNetworks = neurons.NeuralNetwork.map;
    if (allNeuralNetworks.size === 0) {
      console.log('No neural networks found.');
    } else {
      console.log('List of all neural networks:');
      allNeuralNetworks.forEach((neuralNetwork, id) => {
        console.log(`Neural Network ID: ${id}`, neuralNetwork);
      });
    }
  };

  return { showNeuralNetworkMenu, createNeuralNetwork, listAllNeuralNetworks };
};
