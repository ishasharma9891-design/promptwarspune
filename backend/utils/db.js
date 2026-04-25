const admin = require('firebase-admin');

/**
 * Fetches user profile from Firestore or returns default.
 * @param {Object} db - Firestore instance.
 * @param {string} uid - User ID.
 * @param {Object} fallback - Default profile.
 * @returns {Promise<Object>}
 */
const getUserProfile = async (db, uid, fallback) => {
  if (!db) return fallback;
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? doc.data() : fallback;
};

/**
 * Updates user's last interaction timestamp.
 * @param {Object} db - Firestore instance.
 * @param {string} uid - User ID.
 */
const updateLastInteraction = (db, uid) => {
  if (!db) return;
  db.collection('users').doc(uid).update({
    last_interaction: admin.firestore.FieldValue.serverTimestamp()
  }).catch(e => console.error("Update failed", e));
};

module.exports = { getUserProfile, updateLastInteraction };
