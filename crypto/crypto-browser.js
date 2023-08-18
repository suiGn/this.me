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
// ... other cryptographic operations using the Web Cryptography API ...
module.exports = {
    generateKeyPair,
    // ... export other cryptographic functions ...
};

