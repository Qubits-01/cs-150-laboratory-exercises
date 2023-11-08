import { expect, it, describe } from 'vitest'
import { computeScore } from './main'

describe('#computeScore', () => {
    it('should return 0 for an empty array', () => {
        expect(computeScore([])).toBe(0);
    });

    it('should return 10 for input array [3, 5, 2, 7, -4]', () => {
        expect(computeScore([3, 5, 2, 7, -4])).toBe(10);
    });

    it('should return the lowest number in a sorted input array', () => {
        expect(computeScore([-4, -3, -2, -1])).toBe(-4);
    });
});
