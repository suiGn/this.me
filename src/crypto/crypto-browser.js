// crypto-browser.js
async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["sign", "verify"]
    );
    return keyPair;
}

async function signData(key, data) {
    const encodedData = new TextEncoder().encode(data);
    const signature = await window.crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5"
        },
        key.privateKey,
        encodedData
    );
    return new Uint8Array(signature);
}

async function verifySignature(key, data, signature) {
    const encodedData = new TextEncoder().encode(data);
    const isValid = await window.crypto.subtle.verify(
        {
            name: "RSASSA-PKCS1-v1_5"
        },
        key.publicKey,
        signature,
        encodedData
    );
    return isValid;
}

module.exports = {
    generateKeyPair,
    signData,
    verifySignature
};
