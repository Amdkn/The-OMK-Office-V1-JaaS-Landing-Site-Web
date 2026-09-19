import { describe, it, expect } from 'vitest';
import { calculateProgress, Milestone } from '../../src/lib/progress/progressEngine';

describe('Progress Engine', () => {
  it('returns 0 for empty milestones', () => {
    expect(calculateProgress([])).toBe(0);
  });

  it('calculates 100% when all milestones are completed', () => {
    const milestones: Milestone[] = [
      { id: 1, status: 'completed' },
      { id: 2, status: 'completed' },
    ];
    expect(calculateProgress(milestones)).toBe(100);
  });

  it('calculates correct percentage for mixed states', () => {
    const milestones: Milestone[] = [
      { id: 1, status: 'completed' },
      { id: 2, status: 'completed' },
      { id: 3, status: 'current' },
      { id: 4, status: 'upcoming' },
      { id: 5, status: 'blocked' },
    ];
    // 2 completed out of 5 = 40%
    expect(calculateProgress(milestones)).toBe(40);
  });

  it('handles rounding correctly', () => {
    const milestones: Milestone[] = [
      { id: 1, status: 'completed' },
      { id: 2, status: 'current' },
      { id: 3, status: 'upcoming' },
    ];
    // 1 / 3 = 33.333% -> 33
    expect(calculateProgress(milestones)).toBe(33);
  });
});
