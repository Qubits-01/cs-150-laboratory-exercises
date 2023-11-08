/**
 * This program computes the score of an array of integers.
 * The score is the sum of the lowest number in each sequence
 * found in the given nums array.
 * 
 * @param nums Nums contains an array 
 * of integers (negative and positive) in random order.
 * @returns The score of the array.
 */
export function computeScore(nums: number[]): number {
    // Sort nums in ascending order. 
    nums.sort((a, b) => a - b);

    // Find all the sequences in nums (the sequence is incremented by one).
    let sequences: number[][] = [];
    let sequence: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] + 1 === nums[i + 1]) {
            sequence.push(nums[i]);
        } else {
            sequence.push(nums[i]);
            sequences.push(sequence);
            sequence = [];
        }
    }

    // Determine the score (sum of the lowest number in each sequence).
    let score: number = 0;
    for (let i = 0; i < sequences.length; i++) {
        score += sequences[i][0];
    }

    return score;
}

// Test code.
console.log(computeScore([3, 5, 2, 7, -4]));
console.log(computeScore([]));

