#!/usr/bin/env node
//main.js
const { exec } = require("child_process");
const path = require("path");
const crypto = require('crypto');
const fs = require('fs');
const args = process.argv.slice(2);
const neurons = require("neurons.me");
const cleaker = require("cleaker");
const netget = require("netget");
const Atom = require("this.atom");
//User Context.
const Me = require("./me");
const os = require('os');
const me = new Me(
  'Me', 
  'replace@email.me', 
  'replaceDateOfBirth',
   { city: 'replaceCity',
    country: 'replaceCountry' }, 
    { theme: 'dark' }
    );
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
`);
console.log(me.getPublicKey());
const cleaked = new cleaker();
console.log(`Host_Session@ ${os.userInfo().username}`);
console.log("System Role: ", cleaked.role);
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
 'hashSrc') to handle hashing when the relevant command is passed to the script.*/
 const { fork } = require('child_process');
 const { getAllFiles, hashThis } = require('./hash/hashing');
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
      // Here you can define what you'd like to happen when no arguments are passed.
      displayWelcomeMessage();
      // And any other functionality you'd like to execute
      break;
}

module.exports = {
  cleaker,
  netget,
  neurons,
  Atom,
  getAllFiles,
  hashThis,
  hashSrc
};
