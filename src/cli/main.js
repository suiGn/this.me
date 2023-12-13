#!/usr/bin/env node
import os from 'os';
import Me from '../me.js';
import { Command } from 'commander';
const program = new Command();
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import printWelcome from './ascii_art/welcome.js';
import crypto from 'crypto';
/**
 * @module CLI
 * @description
 * .Me Command Line Interface Functionalities.
 *  The CLI application's code structure is categorized into two main parts:
 *  Command Definitions and Interactive Shell.*/

/***Command Definitions.*/
/**
 * The 'program' variable is an instance of 'Command' from the commander package. 
 * It's utilized to define commands and options for the CLI application.*/
program
    .option('-o, --options', 'View options and commands.');

program
    .command('user <username> <pin>')
    .description('Authenticate and start a .me session.')
    .action((username, pin) => {
        console.log(`Attempting to authenticate user: ${username}`);
        // Authentication logic here
    });

import { selectMe, createMe, writeMe, listMeProfiles, selectProfile } from './interactive_shell/options.js';

/** Welcome.
@function welcome_Me
*/
function welcome_Me() {
    printWelcome();
    console.log(`Host_Session@ ${os.userInfo().username}`);
    console.log(`v.path@ ${os.homedir()}/.me`);
}

/**
* Main function to handle the CLI interactions.
* Continuously prompts the user for actions until an exit command is given.
*/

async function main() {
  welcome_Me();
  let exit = false;
  while (!exit) {
      const choice = await selectMe();
      switch (choice) {
         /**
             * Handles the 'View Existing Profiles' choice.
             * Lists and displays all existing .me profiles.
             */
         case 'View Existing Profiles':
          const selectedProfile = await selectProfile();
          if (selectedProfile === 'back') {
              break;
          }
          // Read and display the selected profile details here
          console.log(`Selected profile: ${selectedProfile}`);
          // Add logic to handle the selected profile
          break;
          case 'Create New Profile':
            const newProfile = await createMe(); // Or createMe if that's the name you're using
            writeMe(newProfile);
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



