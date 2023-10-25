const cryptoModule = require('./crypto/crypto-browser');
const MeCore = require('./me-core');

class MeBrowser extends MeCore {
    constructor(name, email, birthDate, location = {}, preferences = {}) {
        super(cryptoModule, name, email, birthDate, location, preferences);
    }
}

module.exports = MeBrowser;
