const Me = require('./me2.js');
// Create a new Me instance
const suign = new Me('Suign Name', 'suign@email.com', '01/01/1990', { city: 'SampleCity', country: 'SampleCountry' }, { theme: 'dark', notifications: true });
// Print out the public key (for demonstration purposes)
console.log("Suign's Public Key:", suign.getPublicKey());
// Example: Sign some data
const dataToSign = "Hello, World!";
const signature = suign.signData(dataToSign);
console.log("Signature for 'Hello, World!':", signature.toString('base64')); // Base64 encoding just to make the signature more readable in console.
// Example: Verify the signature
const isValidSignature = suign.verifySignature(dataToSign, signature);
console.log("Is the signature valid?", isValidSignature);