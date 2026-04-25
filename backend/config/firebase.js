require('dotenv').config();
const admin = require('firebase-admin');

/**
 * Initializes Firebase Admin SDK.
 * @returns {Object} Firestore instance.
 */
const initFirebase = () => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault()
      });
    } catch (e) {
      console.warn("Firebase not initialized: running locally.");
    }
  }
  return admin.apps.length ? admin.firestore() : null;
};

module.exports = { initFirebase };
