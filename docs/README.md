# This.Me  
<img src="./cleak_me-removebg.png" alt="SVG Image" style="width:89px;">
<img src="./this.me.png" alt="SVG Image" style="width:89px;">

**This.Me** defines a digital identity through a cryptographic lens. Each user is equipped with a unique **'Me'** identity, secured by public-private key cryptography, enabling robust autonomous identity verification and transactional security.

**This.Me** incorporates hashing for unimpeachable data integrity and digital signatures for undeniable authenticity. Users gain unparalleled control over their digital footprint, marking a shift towards a user-centric model of data management.

In essence, **This.Me** grants users a self-sovereign digital identity, fully within their control and independent from external entities.

### CLI Usage:
Install globally to use `this.me` as a CLI tool:

```js
npm install -g this.me
```

Then, interact with `this.me` directly from your command line.


### Usage in Node.js:

## Installation

```bash
npm install this.me
```

```js
const ThisMe = require('this.me');
// Create a new user identity
const user = new ThisMe('John', 'Doe', '1990-01-01', 'mypassword123', '1234');
// Retrieve the user's identity object
const identityObject = user.getIdentityObject();
```

## Core Principles

- The `Me` class encapsulates personal information like name, last name, birthday, password, and PIN. This serves as the identity representation in our system.

The `all.this` collection of packages, along with the proposed `cleaker` functionality, is an approach to create a modular system where each module (like `this.text`, `this.video`, `this.img`, etc.) (all.this family) represents a distinct data structure or class. These modules, when combined with `cleaker`, generate unique **public and private key pairs**, essentially giving each instance its cryptographic identity.

### Hashing and Digital Signatures

**This.Me** leverages hashing to protect data integrity, with each transaction generating a unique, tamper-proof hash. Digital signatures, created using private keys, provide a layer of authenticity and non-repudiation, linking data unmistakably to its owner.

## Contextual Environment

**This.Me** adapts to various environments, enabling `.me` objects to function both locally and within a network. A `.me` object authenticated on a network accesses data beyond the local scope, while unauthenticated instances are confined to local data. This dual functionality ensures seamless interoperability and heightened security.

## Setting up your Context. 	👋🏻👋🏼👋🏽👋🏾👋🏿

Defining the **environment** and context in which your code runs, especially when you're interacting with intelligent agents or services like **me.**

Having a clear declaration of the environment and the context can have a series of implications for security, interoperability, and clarity. The codebase is often vast, dynamic, and continually evolving. Given the dynamic nature of such environments, ensuring the integrity of the code and data becomes paramount. You wouldn't want an agent to execute or rely on code that has been tampered with or is different from the expected version. This is where hashing comes into play.

`.me` objects to serve as both a local identity on the user's host machine and as an identity within a larger network. When a `.me` object is authenticated on a network, it can access data not only on the local host but also from other nodes within that network. Conversely, if it's not authenticated or recognized by the network, it should only access local data. 

