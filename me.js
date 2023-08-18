// me.js
let cryptoModule;
if (typeof window !== 'undefined' && typeof window.crypto !== 'undefined') {
    cryptoModule = require('./crypto/crypto-browser');
} else {
    cryptoModule = require('./crypto/crypto-node');
}
class Me {
    constructor(name, email, birthDate, location = {}, preferences = {}) {
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.location = location;
        this.preferences = preferences;
        // Generate key pair upon instantiation
        this.keyPair = cryptoModule.generateKeyPair();
        // ... rest of your class logic using the cryptoModule abstraction ...
    }
    // ... other methods ...
}
module.exports = Me;


