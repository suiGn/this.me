//Me.js
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
        // Social Media Accounts
        this.socialMedia = {
            facebook: {
                appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your actual Facebook App ID
                token: null
            }
            // ... You can add more platforms here
        };
        // Generate key pair upon instantiation
        this.keyPair = cryptoModule.generateKeyPair();
    }
    
    connectFacebook(token) {
        this.socialMedia.facebook.token = token;
        // You can expand this function to do more, like fetch the user's profile data using the token.
    }

    getFacebookToken() {
        return this.socialMedia.facebook.token;
    }

    // the public key can be shared for verification
    getPublicKey() {
        return this.keyPair.publicKey;
    }
    // Use the private key for signing data.
    signData(data) {
        try {
            const sign = cryptoModule.createSign('SHA256');
            sign.update(data);
            sign.end();
            return sign.sign(this.keyPair.privateKey);
        } catch (err) {
            console.error("Error during signing data: ", err);
            return null;
        }
    }

    verifySignature(data, signature) {
        try {
            const verify = cryptoModule.createVerify('SHA256');
            verify.update(data);
            verify.end();
            return verify.verify(this.keyPair.publicKey, signature);
        } catch (err) {
            console.error("Error during verifying signature: ", err);
            return false;
        }
    }

    updateLocation(newLocation) {
        this.location = newLocation;
    }
}

module.exports = Me;