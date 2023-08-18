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
//User Context.
const Me = require("this.me/me");
const os = require('os');
const me = new Me(
  'Me', 
  'replace@email.me', 
  'replaceDateOfBirth',
   { city: 'replaceCity',
    country: 'replaceCountry' }, 
    { theme: 'dark' }
    );
//CLI LOGIC
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


//.. THIS SECTION IS FOR HASHING PURPOSES ...//
/* Create a function that computes the hash of the @src directory.
 'hashSrc') to handle hashing when the relevant command is passed to the script.*/
 const { fork } = require('child_process');
 const { getAllFiles, hashThis } = require('this.me/crypto/hash/hashing');
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
      console.log("Atom");
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
  getAllFiles,
  hashThis,
  hashSrc
};
