const neurons = require('neurons.me');
//cleaking
const Cleaker = require('cleaker');
let cleaked = new Cleaker();
console.log('printing cleaked');
console.log(cleaked);
//cleaked completed
console.log('printing neurons.me module functionality');
console.log(neurons);

console.log('Creating a new neuron with neurons.createNeuron()');
let neuron = neurons.createNeuron();
console.log(neuron);


// Custom options for the neuron
let options = {
  name: 'x', // Custom name for the neuron
  color: 'rgb', // Custom color
  activationFunction: x => x * 2 // Custom activation function
};
// Create a neuron with custom options
let neuron2 = new neurons.createNeuron({ options: options });
console.log(neuron2);
// Create Layer
console.log('creating layer');
let layer = new neurons.Layer();  
console.log('printing layer');
console.log(layer);
//adding neurons to layer
layer.addNeurons(neuron, neuron2);
console.log('printing layer.neurons');
console.log(layer.neurons);
console.log('printing layer.map');
console.log(layer.map);


