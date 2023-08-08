#!/usr/bin/env node
//main.js
const { exec } = require("child_process");
const path = require("path");
const args = process.argv.slice(2);
const neurons = require("neurons.me");
const cleaker = require("cleaker");
const Atom = require("this.atom");
// Your CLI logic goes here, display welcome message, handle other commands, etc.
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

if (args[0] === 'viewer') {
  // Create an instance of the Atom class
  const atom = new Atom();
  // Create a new Electron window with viewer.html inside
  atom.createElectron('viewer', { width: 800, height: 600, viewFile: path.resolve(__dirname, 'viewer.html') });
  // Show the Electron window
  atom.showElectron('viewer');
}

if (args[0] === 'atom') {
  // Create an instance of the Atom class
  const atom = new Atom();
  // Create Electrons for Atom 1
  atom.createElectron('electron1', { width: 800, height: 600, viewFile: './view1.html' });
  atom.createElectron('electron2', { width: 600, height: 400, viewFile: './view2.html' });
  // Create Electrons for Atom 2
  atom.createElectron('electron3', { width: 1000, height: 800, viewFile: './view3.html' });
  // Show the Atom window with electrons
  atom.showAtom();
}

module.exports = {
  cleaker,
  neurons,
  Atom
};




