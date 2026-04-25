import { validateSubmission, calculateReward } from './challengeLogic';

describe('Challenge Logic Engine', () => {
  test('validateSubmission identifies correct answers case-insensitively', () => {
    const task = { answer: 'React' };
    expect(validateSubmission(task, 'react')).toBe(true);
    expect(validateSubmission(task, 'REACT')).toBe(true);
    expect(validateSubmission(task, 'Vue')).toBe(false);
  });

  test('calculateReward applies level multipliers correctly', () => {
    expect(calculateReward('Beginner')).toBe(50);
    expect(calculateReward('Intermediate')).toBe(100);
    expect(calculateReward('Advanced')).toBe(200);
  });

  test('validateSubmission handles empty or null inputs', () => {
    const task = { answer: 'test' };
    expect(validateSubmission(task, '')).toBe(false);
    expect(validateSubmission(task, null)).toBe(false);
  });
});
