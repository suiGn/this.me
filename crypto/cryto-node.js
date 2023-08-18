// crypto-node.js
const crypto = require('crypto');
function generateKeyPair() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    return {
        privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
        publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
    };
}
// ... other cryptographic operations using Node's crypto module ...
module.exports = {
    generateKeyPair,
    // ... export other cryptographic functions ...
};
