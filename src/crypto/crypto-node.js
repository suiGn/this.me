// crypto-node.js
const crypto = require('crypto');

function signData(privateKey, data) {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(privateKey);
}

function verifySignature(publicKey, data, signature) {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature);
}

module.exports = {
    generateKeyPair() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        return {
            privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
            publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
        };
    },
    signData,
    verifySignature
};
