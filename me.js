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
    // ... methods ...
    generateKeyPair() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        return {
            privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
            publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
        };
    }
    getPublicKey() {
        return this.keyPair.publicKey;
    }
    // Use the private key for signing data, and the public key can be shared for verification
    signData(data) {
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();
        return sign.sign(this.keyPair.privateKey);
    }
    verifySignature(data, signature) {
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(this.keyPair.publicKey, signature);
    }
    updateLocation(newLocation) {
        this.location = newLocation;
    }
}
module.exports = Me;


