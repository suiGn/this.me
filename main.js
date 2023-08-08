#!/usr/bin/env node
//main.js
const { exec } = require("child_process");
const path = require("path");
const crypto = require('crypto');
const fs = require('fs');
const args = process.argv.slice(2);
const neurons = require("neurons.me");
const cleaker = require("cleaker");
const Atom = require("this.atom");
// Your CLI logic goes here, display welcome message, handle other commands, etc.
function displayWelcomeMessage() {
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
-^^^^^^^^zzzz...
Welcome to .me - Your AI Playground
give me one sec please...
`);
};
//ATOMS ELECTRONS AND PARTICLES IN PROGRESS...
//WE WILL RUN OUR NODE PROCCESSES IN ELECTRON WINDOWS AND EACH ATOM WILL HOLD ELECTRONS WHICH HOLDS THE PROCESSES
//THUS WE WILL KNOW HOW CHARGED AN ATOM IS BY THE NUMBER OF ELECTRONS IT HAS AND HOW MANY PROCESSES IT IS RUNNING.
//WE WILL ALSO BE ABLE TO SEE THE PROCESSES RUNNING IN EACH ELECTRON AND THE ATOMS THAT ARE RUNNING THEM.
function handleViewerCommand() {
  const atom = new Atom();
  atom.createElectron('viewer', {
      width: 800,
      height: 600,
      viewFile: path.resolve(__dirname, 'viewer.html')
  });
  atom.showElectron('viewer');
}
function handleAtomCommand() {
  const atom = new Atom();
  atom.createElectron('electron1', {
      width: 800,
      height: 600,
      viewFile: './view1.html'
  });
  atom.createElectron('electron2', {
      width: 600,
      height: 400,
      viewFile: './view2.html'
  });
  atom.createElectron('electron3', {
      width: 1000,
      height: 800,
      viewFile: './view3.html'
  });
  atom.showAtom();
}

//.. THIS SECTION IS FOR HASHING PURPOSES ...//
/* Create a function that computes the hash of the @src directory.
 'hash-src') to handle hashing when the relevant command is passed to the script.*/
 function getAllFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = entries.filter(fileDirent => fileDirent.isFile()).map(fileDirent => path.join(directory, fileDirent.name));
  const folders = entries.filter(folderDirent => folderDirent.isDirectory());
  for (const folder of folders) {
      files.push(...getAllFiles(path.join(directory, folder.name)));
  }
  return files;
}
function hashThis(directoryOrFilePath) {
  // Ensure path is absolute
  if (!path.isAbsolute(directoryOrFilePath)) {
      throw new Error('Path must be absolute.');
  }
  let allContent = "";
  // Check if it's a directory or a file
  const stat = fs.statSync(directoryOrFilePath);
  if (stat.isDirectory()) {
      // Get all files from the directory recursively
      const allFiles = getAllFiles(directoryOrFilePath);
      // Read all file content and concatenate it
      allContent = allFiles.map(file => fs.readFileSync(file)).join('');
  } else if (stat.isFile()) {
      // Read file content
      allContent = fs.readFileSync(directoryOrFilePath);
  } else {
      throw new Error('Provided path is neither a directory nor a file.');
  }
  // Hash the content using SHA256 (or another hashing algorithm)
  const hash = crypto.createHash('sha256').update(allContent).digest('hex');
  return hash;
}

function hashSrc() {
  try {
      // Adjust this to the exact location of your @src directory
      const srcDirPath = path.resolve(__dirname, '@src');
      const hash = hashThis(srcDirPath);
      console.log(`Hash of @src directory: ${hash}`);
  } catch (error) {
      console.error('Error hashing @src directory:', error.message);
  }
}

// Display the welcome message
displayWelcomeMessage();

// COMMAND HANDLERS
switch(args[0]) {
  case 'hash-src':
        hashSrc();
        break;
  case 'viewer':
      handleViewerCommand();
      break;
  case 'atom':
      handleAtomCommand();
      break;
  default:
      console.log('Command not recognized. Use "viewer" or "atom" as arguments.');
}

module.exports = {
  cleaker,
  neurons,
  Atom,
  getAllFiles,
  hashThis,
  hashSrc
};
