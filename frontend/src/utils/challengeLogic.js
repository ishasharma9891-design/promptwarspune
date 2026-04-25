/**
 * Validates a user's answer to a challenge.
 * @param {string} answer - The user's input.
 * @param {string} expected - The correct answer or keyword.
 * @returns {boolean}
 */
export const validateChallenge = (answer, expected) => {
  if (!answer || !expected) return false;
  return answer.toLowerCase().includes(expected.toLowerCase());
};

/**
 * Calculates XP reward for completing a challenge.
 * @param {number} difficulty - Difficulty level (1-5).
 * @param {number} timeBonus - Bonus based on speed.
 * @returns {number}
 */
export const calculateReward = (difficulty, timeBonus = 0) => {
  const baseXP = difficulty * 50;
  return baseXP + timeBonus;
};

/**
 * Updates the user's total XP in Firestore.
 * @param {Object} db - Firestore instance.
 * @param {string} uid - User ID.
 * @param {number} xpAmount - XP to add.
 */
export const awardXP = async (db, uid, xpAmount) => {
  if (!db || !uid) return;
  const admin = require('firebase-admin'); // Only if used in backend
  const userRef = db.collection('users').doc(uid);
  await userRef.update({
    total_xp: admin.firestore.FieldValue.increment(xpAmount)
  });
};
