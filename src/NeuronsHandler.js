// ./src/NeuronsHandler.js
const neurons = require('neurons.me');
const { logError } = require('@sui.gn/me/src/errorHandler');
const { showMenu } = require('./utils');
const prompt = (rl, question) => new Promise((resolve) => rl.question(question, resolve));
//neuron handler
module.exports = (rl) => {
const showNeuronMenu = () => {
    console.log('\nNeurons:');
    console.log('0. Back to Main Menu');
    console.log('1. Create a new neuron');
    console.log('2. List all neurons');
    console.log('3. Editing Neurons');
};
const neuronConfig = async (rl, neuron, updateNeuronProperties, cloneNeuron) => {
  console.log(`\nTailoring Neuron ID: ${neuron.processID}`);
  console.log('0. Back to Main Menu');
  console.log('1. Edit Properties.');
  console.log('2. Clone this neuron');
  console.log('3. Back to Neurons Menu');
  const action = await prompt(rl, 'Choose an action: ');
  switch (action.trim()) {
    case '0':
      showMenu(rl);
      break;
    case '1':
      await updateNeuronProperties(neuron, rl, neuronConfig);
      break;
    case '2':
      await cloneNeuron(neuron, rl, neuronConfig);
      break;
    case '3':
      showNeuronMenu();
      break;
    default:
      console.log('Invalid action. Back to Neuron Menu.');
      showNeuronMenu();
  }
};
const showNeuronProperties = (neuron) => {
  console.log('\nSelected Neuron Properties:');
  console.log('Selected Neuron ID:', neuron.processID);
  console.log('Name:', neuron.name);
  console.log('Date:', neuron.date);
  console.log('Time:', neuron.time);
  console.log('Color:', neuron.color);
  console.log('Activation Function:', neuron.activationFunction.toString());
  console.log('Weights:', neuron.weights);
  console.log('Bias:', neuron.bias);
};
const promptNeuronConfig = async (rl, updateNeuronProperties, cloneNeuron, showMenu) => {
  try {
    const option = await prompt('Choose the ID of the neuron you want to access (or "back" to go back): ');
    if (option.toLowerCase() === 'back') {
      showNeuronMenu();
    } else {
      const neuronId = parseInt(option);
      const neuron = neurons.Neuron.map.get(neuronId);
      if (!neuron) {
        console.log('Neuron with the specified ID not found.');
        await promptNeuronConfig(updateNeuronProperties, cloneNeuron, showMenu);
      } else {
        await neuronConfig(neuron, updateNeuronProperties, cloneNeuron, showMenu);
      }
    }
  } catch (error) {
    logError(error);
  }
};
const listAllNeurons = () => {
  const allNeurons = neurons.Neuron.map;
  if (allNeurons.size === 0) {
    console.log('No neurons found.');
  } else {
    console.log('List of all neurons:');
    allNeurons.forEach((neuron, id) => {
      console.log(`${id}.`, neuron);
    });
  }
  showMenu(rl, showNeuronMenu);
};
const createNeuron = async (rl, updateNeuronProperties, cloneNeuron, showMenu) => {
  try {
    const name = await prompt(rl, 'Enter the name of the neuron: ');
    const color = await prompt(rl, 'Enter the color: ');
    const activation = await prompt(rl, 'Enter the activation function: ');
    const weights = await prompt(rl, 'Enter the weights: ');
    const bias = await prompt(rl, 'Enter the bias: ');
    const neuronOptions = {
      name,
      color,
      activation,
      weights,
      bias,
    };
    const neuron = new neurons.Neuron(neuronOptions);
    console.log('New neuron created:', neuron);
    await neuronConfig(rl, neuron, updateNeuronProperties, cloneNeuron, showMenu);
  } catch (error) {
    logError(error);
  }
};
const cloneNeuron = async (neuron, rl, updateNeuronProperties, showMenu) => {
  try {
    const name = await prompt(rl, 'Enter the name of the new neuron: ');

    const clonedNeuron = new neurons.Neuron({
      ...neuron,
      name,
    });

    console.log('New neuron cloned:', clonedNeuron);
    showNeuronActions(clonedNeuron, rl, updateNeuronProperties, cloneNeuron, showMenu);
  } catch (error) {
    logError(error);
  }
};
const updateNeuronProperties = async (rl, neuron, cloneNeuron, showMenu) => {
  try {
    console.log('\nSelected Neuron Properties:');
    showNeuronProperties(neuron);
    const confirmation = await prompt(rl, '\nAre you sure you want to update properties? (yes/no): ');
    if (confirmation.trim().toLowerCase() !== 'yes') {
      console.log('Update canceled. Back to Neuron Menu.');
      showNeuronActions(neuron, rl, updateNeuronProperties, cloneNeuron, showMenu);
      return;
    }
    let updatedActivation = neuron.activationFunction.toString();
    let updatedWeights = neuron.weights;
    let updatedBias = neuron.bias;
    while (true) {
      console.log('\n1. Enter the new activation function');
      console.log('2. Enter the new weights');
      console.log('3. Enter the new bias');
      console.log('4. Update all properties');
      console.log('5. Save changes');
      console.log('6. Back');
      const propertyAction = await prompt(rl, '\nChoose an action: ');
      switch (propertyAction.trim()) {
        case '1':
          updatedActivation = await prompt(rl, 'Enter the new activation function: ');
          break;
        case '2':
          updatedWeights = await prompt(rl, 'Enter the new weights: ');
          break;
        case '3':
          updatedBias = await prompt(rl, 'Enter the new bias: ');
          break;
        case '4':
          const confirmUpdateAll = await prompt(rl, '\nAre you sure you want to update all properties? (yes/no): ');
          if (confirmUpdateAll.trim().toLowerCase() === 'yes') {
            updatedActivation = await prompt(rl, 'Enter the new activation function: ');
            updatedWeights = await prompt(rl, 'Enter the new weights: ');
            updatedBias = await prompt(rl, 'Enter the new bias: ');
          }
          break;
        case '5':
          neuron.activationFunction = eval(updatedActivation); // Converting the updatedActivation string back to a function
          neuron.weights = updatedWeights;
          neuron.bias = updatedBias;
          console.log('\nUpdated Neuron Properties:');
          neuronConfig(rl, neuron, updateNeuronProperties, cloneNeuron, showMenu);
          const finalConfirmation = await prompt(rl, '\nDo you want to apply these changes? (yes/no): ');
          if (finalConfirmation.trim().toLowerCase() !== 'yes') {
            console.log('Changes not applied. Back to Neuron Menu.');
          } else {
            console.log('Neuron properties updated successfully.');
          }
          neuronConfig(rl, neuron, updateNeuronProperties, cloneNeuron, showMenu);
          return;
        case '6':
          console.log('Update canceled. Back to Neuron Menu.');
          neuronConfig(rl, neuron, updateNeuronProperties, cloneNeuron, showMenu);
          return;
        default:
          console.log('Invalid action. Please choose a valid action.');
      }
    }
  } catch (error) {
    logError(error);
  }
};
return {
  showNeuronMenu,
  promptNeuronConfig,
  listAllNeurons,
  createNeuron,
  neuronConfig,
  updateNeuronProperties,
  cloneNeuron
};
}

/*Input Validation: It would be better to add some form of input validation.
 For example, when setting the weights or bias of a neuron,
  you could check that the user's input is a valid number.
Security: Be careful when using eval().
 eval() evaluates a string of JavaScript code in the global context,
  which can lead to security issues. If the string comes from an untrusted source, 
  it can potentially run malicious code. If you need to convert a string to a function, 
  consider safer alternatives.*/