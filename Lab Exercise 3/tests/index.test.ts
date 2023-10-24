import Section from '../index';
import { describe, expect, test, beforeAll } from '@jest/globals';
import { parseInput } from '../index';
import DayBasedSchedule from '../utils/day_based_schedule/day_based_schedule';

describe('[ Section ]', () => {

});

describe('[ parseInput ]', () => {
    let sampleInput: string;
    beforeAll(() => {
        sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
            CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
            CS 12 LAB 1,F 1-4PM lab TL3
            CS 12 LEC 2,TTh 1-2PM lec P&G
            CS 31 THY2,TTh 4-5:30PM lec CLR3`;
    });

    test('Should return 5 sections (w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = parseInput(sampleInput);

        // [ Assert. ]
        expect(actual.length).toBe(5);
    });

    test(
        'Should return 1 section with 2 day-based schedules (w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[1].dayBasedSchedules.length).toBe(2);
        }
    );

    test(
        'Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[0].dayBasedSchedules.length).toBe(1);
        }
    );

    test(
        'Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[0].completeName).toBe("CS 153 THU");
            expect(actual[1].completeName).toBe("CS 11 CLASS 1");
            expect(actual[2].completeName).toBe("CS 12 LAB 1");
            expect(actual[3].completeName).toBe("CS 12 LEC 2");
            expect(actual[4].completeName).toBe("CS 31 THY2");
        }
    );

    // Should return with the correct day-based schedules.
    test(
        'Should return the Section objects with the correct day-based schedules ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[0].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
            expect(actual[1].dayBasedSchedules[0].days).toStrictEqual(["W"]);
            expect(actual[1].dayBasedSchedules[1].days).toStrictEqual(["F"]);
            expect(actual[2].dayBasedSchedules[0].days).toStrictEqual(["F"]);
            expect(actual[3].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
            expect(actual[4].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
        }
    );

    test('Should not return an empty array when the input is an empty string.', () => {
        // [ Arrange. ]
        const emptyInput: string = "";

        // [ Act. ]
        const actual = parseInput(emptyInput);

        // [ Assert. ]
        expect(actual.length).toBe(0);
    });

    test('Should return an array that contains Section objects.', () => {
        // [ Act. ]
        const actual = parseInput(sampleInput);

        // [ Assert. ]
        expect(actual.every(section => section instanceof Section)).toBe(true);
    });

    test(
        'Should return an array that contains Section objects ' +
        'with DayBasedSchedule objects.',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);
            let isTypeDayBasedSchedule =
                (dayBasedSchedule: DayBasedSchedule) =>
                    dayBasedSchedule instanceof DayBasedSchedule;

            // [ Assert. ]
            expect(
                actual.every(
                    section => section.dayBasedSchedules.every(isTypeDayBasedSchedule)
                )
            ).toBe(true);
        }
    );
});
