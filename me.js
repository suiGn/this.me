// me.js
class Me {
    constructor(name, email, birthDate, location = {}, preferences = {}) {
        this.name = name; // Full name
        this.email = email; // Email address
        this.birthDate = birthDate; // Birthdate
        this.location = location; // Location object { city: '...', country: '...', ...}
        this.preferences = preferences; // User's preferences or settings, it could be an object { theme: 'dark', notifications: true, ...}
        // Add other attributes pertinent to the profile as needed.
    }
    // Method to update location
    updateLocation(newLocation) {
        this.location = newLocation;
    }
    // Add other methods to get, set, or update profile details as needed.
}

module.exports = Me;