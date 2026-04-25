/**
 * Infers expertise level based on score and total XP.
 * @param {number} score - Current session score (0-100)
 * @param {number} totalXP - Cumulative XP
 * @returns {string} - 'Beginner', 'Intermediate', or 'Advanced'
 */
export const inferLevel = (score, totalXP) => {
  if (totalXP > 5000 || (score > 90 && totalXP > 2000)) return 'Advanced';
  if (totalXP > 1000 || score > 70) return 'Intermediate';
  return 'Beginner';
};

/**
 * Calculates XP for a given activity.
 * @param {string} activityType - 'message', 'correct_answer', 'challenge_completion'
 * @param {number} streak - Current day streak
 * @returns {number} - XP awarded
 */
export const calculateXP = (activityType, streak = 1) => {
  const baseXP = {
    message: 10,
    correct_answer: 50,
    challenge_completion: 100,
  };
  
  const multiplier = Math.min(1 + (streak - 1) * 0.1, 2); // Max 2x multiplier for streaks
  return Math.round((baseXP[activityType] || 0) * multiplier);
};

/**
 * Formula for session score.
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total questions asked
 * @param {number} timeSpent - Time spent in seconds
 * @returns {number} - Score (0-100)
 */
export const calculateScoreFormula = (correctAnswers, totalQuestions, timeSpent) => {
  if (totalQuestions === 0) return 0;
  
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const timeBonus = Math.max(0, 10 - timeSpent / 60); // Bonus for fast completion (max 10 points)
  
  return Math.min(100, Math.round(accuracy + timeBonus));
};
