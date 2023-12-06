#!/usr/bin/env node
/**
 * @module CLI
 * @description Command Line Interface Functionalities for .me
 * Author: SuiGn
 */

import os from 'os';
import Me from '../me.js';
import program from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

program
    .command('user <username> <pin>')
    .description('Authenticate and start a session for a given user')
    .action((username, pin) => {
        console.log(`Attempting to authenticate user: ${username}`);
        // Authentication logic here
    });

program
    .option('-o, --options', 'View options and commands');

/**
 * Display a welcome message to the user.
 */
function welcomeToMe() {
    console.log(`
          ___________                                 
         [------------]                              
         | .--------. |                             
         | |01010101| |       __________              
         | |11010101| |      /__________\             
[--------|  --------  |------|   --*--  |-------]
|        [----_-.-----]      |o ======  |       | 
|       ______|_|_______     |__________|       | 
|      /  %%%%%%%%%%%%  \                       | 
|     /  %%%%%%%%%%%%%%  \                      | 
|     ^^^^^^^^^^^^^^^^^^^^                      | 
[---------------------------------.me-----------]
-^^^^^^^^...
Welcome to .me.
`);
    console.log(`Host_Session@ ${os.userInfo().username}`);
    console.log(`v.path@ ${os.homedir()}/this.me`);
}

/**
 * Prompts the user to select an action and returns their choice.
 * @returns {Promise<string>} The user's choice.
 */
async function getUserChoice() {
  const choices = ['View Existing Profiles', 'Create New Profile', 'Exit'];
  const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: choices
  }]);
  return answer.action;
}

/**
* Prompts the user for details to create a new profile.
* @returns {Promise<Me>} The new Me object with user details.
*/
async function getNewProfileDetails() {
  const questions = [
      {
          type: 'input',
          name: 'name',
          message: 'What is your first name?',
          // Add validation as needed
      },
      {
          type: 'input',
          name: 'lastname',
          message: 'What is your last name?',
          // Add validation as needed
      },
      {
          type: 'input',
          name: 'birthday',
          message: 'What is your birthday? (YYYY-MM-DD)',
          // Add validation as needed
      },
      {
          type: 'password',
          name: 'password',
          message: 'Choose a password:',
          // Add validation as needed
      },
      {
          type: 'input',
          name: 'pin',
          message: 'Choose a PIN:',
          // Add validation as needed
      },
      // ... Add more questions as needed
  ];
  const userDetails = await inquirer.prompt(questions);
  return new Me(
      userDetails.name, 
      userDetails.lastname, 
      userDetails.birthday,
      userDetails.password, 
      userDetails.pin
  );
}

/**
* Writes the .me object to the filesystem.
* @param {Me} meObject - The Me object to be saved.
*/
function writeMeObjectToFile(meObject) {
  const meDirectory = path.join(os.homedir(), '.thisme');
  if (!fs.existsSync(meDirectory)) {
      fs.mkdirSync(meDirectory, { recursive: true });
  }

  const filePath = path.join(meDirectory, `${meObject.name}.me`);
  // Consider encrypting the data here before writing to the filesystem
  fs.writeFileSync(filePath, JSON.stringify(meObject.getIdentityObject()));
  console.log('Profile created successfully.');
}

/**
* Function to display options and commands.
*/
function displayOptionsAndCommands() {
  console.log(program.helpInformation());
}

/**
* Main function to handle the CLI interactions.
* Continuously prompts the user for actions until an exit command is given.
*/
async function main() {
  welcomeToMe();
  let exit = false;
  while (!exit) {
      const choice = await getUserChoice();
      switch (choice) {
          case 'View Existing Profiles':
              console.log('Existing profiles will be displayed here.');
              break;
              case 'Create New Profile':
                const meObject = await getNewProfileDetails();
                writeMeObjectToFile(meObject);
                break;
          case 'Exit':
              console.log('Exiting .me CLI.');
              exit = true;
              break;
          default:
              console.log('Invalid choice. Please try again.');
      }
  }
}

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  main();
}

// Error handling for CLI
process.on('uncaughtException', (err) => {
  console.error('An error occurred in the CLI:', err.message);
  process.exit(1);
});


