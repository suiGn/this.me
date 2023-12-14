import inquirer from 'inquirer';
import path from 'path';
import os from 'os';
import fs from 'fs';
import Me from '../me.js';

/***Interactive Shell:
 * Leverages the `inquirer` package to provide an interactive shell experience with prompts.
 * The `main` function orchestrates the CLI interactions.
 */

/** 
 * View Existing Profiles, Create New Profile, Exit.
 * @returns {Promise<string>} The user's choice. 
 */
async function selectMe() {
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
  async function createMe() {
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
          validate: function(value) {
              const pass = value.match(
                  /^\d{4}-\d{2}-\d{2}$/
              );
              if (pass) {
                  return true;
              }
              return 'Please enter a valid date (YYYY-MM-DD)';
          }
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
  * @param {Me} meProfile - The Me object to be saved.
  */
  function writeMe(meProfile) {
    const meDirectory = path.join(os.homedir(), '.me');
    if (!fs.existsSync(meDirectory)) {
        fs.mkdirSync(meDirectory, { recursive: true });
    }
    
    const filePath = path.join(meDirectory, `${meProfile.name}.me`);
    // Encrypting the data here before writing to the filesystem
    //fs.writeFileSync(filePath, JSON.stringify(meProfile.getIdentityObject()));
    //console.log('Profile created successfully.');
    fs.writeFileSync(filePath, JSON.stringify(meProfile.getIdentityObject()));
      console.log('Profile created successfully.');
  }
  
  /**
   * Lists all the .me profile file paths in the user's .me directory.
   * @returns {string[]} An array of full file paths for each .me profile.
   */
  function listMeProfiles() {
    const meDirectory = path.join(os.homedir(), '.me');
    if (fs.existsSync(meDirectory)) {
        const profileFiles = fs.readdirSync(meDirectory)
            .filter(file => file.endsWith('.me'));
        return profileFiles.map(file => path.join(meDirectory, file));
    } else {
        console.log('No profiles found.');
        return [];
    }
  }
  
  /**
   * Prompts the user to select a .me profile or go back to the main menu.
   * @returns {Promise<string>} The file path of the selected profile or 'back' to go to the main menu.
   */
  async function selectProfile() {
    const profiles = listMeProfiles();
    if (profiles.length === 0) {
        console.log('No profiles found.');
        return 'back';
    }
  
    const choices = profiles.map(file => ({
        name: path.basename(file, '.me'),
        value: file
    })).concat([{ name: 'Go Back to Main Menu', value: 'back' }]);
  
    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'selectedProfile',
        message: 'Select a profile to view or go back:',
        choices: choices
    }]);
    return answer.selectedProfile;
  }

export const shell = {
    selectMe,
    createMe,
    writeMe,
    listMeProfiles,
    selectProfile,
  };