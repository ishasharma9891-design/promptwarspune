import { inferLevel, calculateXP, calculateScoreFormula } from './learningLogic';

describe('Learning Logic Unit Tests', () => {
  
  describe('inferLevel', () => {
    test('should return Beginner for low XP and score', () => {
      expect(inferLevel(50, 200)).toBe('Beginner');
    });

    test('should return Intermediate for score above 70', () => {
      expect(inferLevel(75, 200)).toBe('Intermediate');
    });

    test('should return Intermediate for XP above 1000', () => {
      expect(inferLevel(40, 1500)).toBe('Intermediate');
    });

    test('should return Advanced for XP above 5000', () => {
      expect(inferLevel(50, 6000)).toBe('Advanced');
    });

    test('should return Advanced for high score (90+) and XP above 2000', () => {
      expect(inferLevel(95, 2500)).toBe('Advanced');
    });
  });

  describe('calculateXP', () => {
    test('should award base XP for a message', () => {
      expect(calculateXP('message', 1)).toBe(10);
    });

    test('should apply 1.5x multiplier for 6-day streak', () => {
      expect(calculateXP('correct_answer', 6)).toBe(75); // 50 * 1.5
    });

    test('should cap multiplier at 2x', () => {
      expect(calculateXP('challenge_completion', 20)).toBe(200); // 100 * 2
    });
  });

  describe('calculateScoreFormula', () => {
    test('should return 100 for perfect accuracy and fast completion', () => {
      expect(calculateScoreFormula(5, 5, 30)).toBe(100);
    });

    test('should return lower score for poor accuracy', () => {
      expect(calculateScoreFormula(1, 5, 30)).toBe(30); // 20% accuracy + 10 bonus
    });

    test('should return 0 if no questions were asked', () => {
      expect(calculateScoreFormula(0, 0, 100)).toBe(0);
    });
  });
});
