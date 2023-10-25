const cryptoModule = require('./crypto/crypto-node');
const MeCore = require('./me-core');

class MeNode extends MeCore {
    constructor(name, email, birthDate, location = {}, preferences = {}) {
        super(cryptoModule, name, email, birthDate, location, preferences);
    }
}

module.exports = MeNode;


