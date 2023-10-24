import Section, { getAllWithConflict, getGEs } from '../index';
import { describe, expect, test, beforeAll } from '@jest/globals';
import { parseInput } from '../index';
import DayBasedSchedule from '../utils/day_based_schedule/day_based_schedule';

describe('[ Section ]', () => {
    describe('[ hasConflict ]', () => {
        let sampleInput: string;
        let sections: Section[];

        beforeAll(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;

            sections = parseInput(sampleInput);
        });

        test(
            'Should return false for sections[0] and sections[1] ' +
            '(w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section1: Section = sections[0];
                let section2: Section = sections[1];

                // [ Act. ]
                let actual = section1.hasConflict(section2);

                // [ Assert. ]
                expect(actual).toBe(false);
            }
        );

        test(
            'Should return false for sections[1] and sections[2] ' +
            '(w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section1: Section = sections[1];
                let section2: Section = sections[2];

                // [ Act. ]
                let actual = section1.hasConflict(section2);

                // [ Assert. ]
                expect(actual).toBe(false);
            }
        );

        test(
            'Should return true for sections[3] and sections[5] ' +
            '(w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section1: Section = sections[3];
                let section2: Section = sections[5];

                // [ Act. ]
                let actual = section1.hasConflict(section2);

                // [ Assert. ]
                expect(actual).toBe(true);
            }
        );

        test(
            'Should return true for sections[2] and sections[5] ' +
            '(w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section1: Section = sections[2];
                let section2: Section = sections[5];

                // [ Act. ]
                let actual = section1.hasConflict(section2);

                // [ Assert. ]
                expect(actual).toBe(true);
            }
        );
    });

    describe('[ isGE ]', () => {
        let sampleInput: string;
        let sections: Section[];

        beforeAll(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA
                Araling Kapampangan 10, F 1-4PM lec TBA`;

            sections = parseInput(sampleInput);
        });

        test(
            'Should return false for sections[0] (w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section: Section = sections[0];

                // [ Act. ]
                let actual = section.isGE();

                // [ Assert. ]
                expect(actual).toBe(false);
            }
        );

        test(
            'Should return false for sections[1] (w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section: Section = sections[1];

                // [ Act. ]
                let actual = section.isGE();

                // [ Assert. ]
                expect(actual).toBe(false);
            }
        );

        test(
            'Should return true for sections[5] (w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section: Section = sections[5];

                // [ Act. ]
                let actual = section.isGE();

                // [ Assert. ]
                expect(actual).toBe(true);
            }
        );

        test(
            'Should return true for sections[6] (w/ respect to sample input).',
            () => {
                // [ Arrange. ]
                let section: Section = sections[6];

                // [ Act. ]
                let actual = section.isGE();

                // [ Assert. ]
                expect(actual).toBe(true);
            }
        );
    });

    describe('[ hasSlots ]', () => {
        test('Should always return true (for now).', () => {
            // [ Arrange. ]
            let sched = new DayBasedSchedule("MWF", "10AM-12PM");
            let section = new Section("CS 11 CLASS 1", [sched]);

            // [ Assert. ]
            expect(section.hasSlots()).toBe(true);
        });
    });

    describe('[ copyWith ]', () => {
        test('Should return a copy of the Section object (not by reference).', () => {
            // [ Arrange. ]
            let sched = new DayBasedSchedule("MWF", "10AM-12PM");
            let section = new Section("CS 11 CLASS 1", [sched]);

            // [ Act. ]
            let actual = section.copyWith();

            // [ Assert. ]
            expect(actual).not.toBe(section);
            expect(actual._proxyCompleteName).toBe(section._proxyCompleteName);
            expect(actual._proxyDayBasedSchedules).toStrictEqual(
                section._proxyDayBasedSchedules
            );
        });

        test('Should return a copy of the Section object w/ the given complete name.', () => {
            // [ Arrange. ]
            let sched = new DayBasedSchedule("MWF", "10AM-12PM");
            let section = new Section("CS 11 CLASS 1", [sched]);

            // [ Act. ]
            let actual = section.copyWith("CS 11 CLASS 2");

            // [ Assert. ]
            expect(actual).not.toBe(section);
            expect(actual._proxyCompleteName).toBe("CS 11 CLASS 2");
            expect(actual._proxyDayBasedSchedules).toStrictEqual(
                section._proxyDayBasedSchedules
            );
        }
        );
    });

    describe('[ _completeName ]', () => {
        test('Should return the correct complete name.', () => {
            // [ Arrange. ]
            let sched = new DayBasedSchedule("MWF", "10AM-12PM");
            let section = new Section("CS 11 CLASS 1", [sched]);

            // [ Assert. ]
            expect(section._proxyCompleteName).toBe("CS 11 CLASS 1");
        });
    });

    describe('[ _dayBasedSchedules ]', () => {
        // beforeAll
        let sampleInput: string;
        let sections: Section[];

        beforeAll(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;

            sections = parseInput(sampleInput);
        });


        test(
            'Should return the correct day based schedules ' +
            '(w/ respect to sample input).',
            () => {
                // [ Assert. ]
                expect(sections[0]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["T", "Th"]);
                expect(sections[1]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["W"]);
                expect(sections[1]._proxyDayBasedSchedules[1]._proxyDays)
                    .toStrictEqual(["F"]);
                expect(sections[2]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["F"]);
                expect(sections[3]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["T", "Th"]);
                expect(sections[4]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["T", "Th"]);
                expect(sections[5]._proxyDayBasedSchedules[0]._proxyDays)
                    .toStrictEqual(["M", "Th", "S"]);
                expect(sections[5]._proxyDayBasedSchedules[1]._proxyDays)
                    .toStrictEqual(["F"]);
            }
        );

        // The returned array should not be a reference to the original array.
        test(
            'Should return a copy of the day based schedules ' +
            '(w/ respect to sample input).',
            () => {
                // [ Assert. ]
                expect(sections[0]._proxyDayBasedSchedules[0]).not.toBe(
                    sections[0]._proxyDayBasedSchedules[0]
                );
            }
        );

        test(
            'Should return an array of DayBasedSchedule objects ' +
            '(w/ respect to sample input).',
            () => {
                // [ Assert. ]
                expect(
                    sections[0]._proxyDayBasedSchedules.every(
                        dayBasedSched => dayBasedSched instanceof DayBasedSchedule
                    )
                ).toBe(true);
            }
        );
    });
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
            expect(actual[1]._proxyDayBasedSchedules.length).toBe(2);
        }
    );

    test(
        'Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[0]._proxyDayBasedSchedules.length).toBe(1);
        }
    );

    test(
        'Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = parseInput(sampleInput);

            // [ Assert. ]
            expect(actual[0]._proxyCompleteName).toBe("CS 153 THU");
            expect(actual[1]._proxyCompleteName).toBe("CS 11 CLASS 1");
            expect(actual[2]._proxyCompleteName).toBe("CS 12 LAB 1");
            expect(actual[3]._proxyCompleteName).toBe("CS 12 LEC 2");
            expect(actual[4]._proxyCompleteName).toBe("CS 31 THY2");
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
            expect(actual[0]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
            expect(actual[1]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["W"]);
            expect(actual[1]._proxyDayBasedSchedules[1]._proxyDays).toStrictEqual(["F"]);
            expect(actual[2]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["F"]);
            expect(actual[3]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
            expect(actual[4]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
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
                    section => section._proxyDayBasedSchedules.every(isTypeDayBasedSchedule)
                )
            ).toBe(true);
        }
    );
});

describe('[ getGEs ]', () => {
    let sampleInput: string;
    let sections: Section[];

    beforeAll(() => {
        sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
            CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
            CS 12 LAB 1,F 1-4PM lab TL3
            CS 12 LEC 2,TTh 1-2PM lec P&G
            CS 31 THY2,TTh 4-5:30PM lec CLR3
            Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;

        sections = parseInput(sampleInput);
    });

    test(
        'Should return 5 sections (w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = getGEs(sections);

            // [ Assert. ]
            expect(actual.length).toBe(5);
        }
    );

    test(
        'Should return 1 section with 2 day-based schedules ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = getGEs(sections);

            // [ Assert. ]
            expect(actual[1]._proxyDayBasedSchedules.length).toBe(2);
        }
    );

    test(
        'Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = getGEs(sections);

            // [ Assert. ]
            expect(actual[0]._proxyDayBasedSchedules.length).toBe(1);
        }
    );

    test(
        'Should return a copy of the Section objects ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = getGEs(sections);

            // [ Assert. ]
            expect(actual[0]).not.toBe(sections[0]);
            expect(actual).not.toBe(sections);
        }
    );

    test(
        'Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).',
        () => {
            // [ Act. ]
            const actual = getGEs(sections);

            // [ Assert. ]
            expect(actual[0]._proxyCompleteName).toBe("CS 153 THU");
            expect(actual[1]._proxyCompleteName).toBe("CS 11 CLASS 1");
            expect(actual[2]._proxyCompleteName).toBe("CS 12 LAB 1");
            expect(actual[3]._proxyCompleteName).toBe("CS 12 LEC 2");
            expect(actual[4]._proxyCompleteName).toBe("CS 31 THY2");
        }
    );
});

describe('[ getAllWithConflict ]', () => {
    let sampleInput: string;
    let sections: Section[];

    beforeAll(() => {
        sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
            CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
            CS 12 LAB 1,F 1-4PM lab TL3
            CS 12 LEC 2,TTh 1-2PM lec P&G
            CS 31 THY2,TTh 4-5:30PM lec CLR3`;

        sections = parseInput(sampleInput);
    });

    test(
        'Should return an empty array since there are no conflicts ' +
        '(w/ respect to sampleInput).',
        () => {
            // [ Act. ]
            const actual = getAllWithConflict(sections);

            // [ Assert. ]
            expect(actual.length).toBe(0);
        }
    );

    test(
        'Should return the correct sections ' +
        '(w/ respect to sampleInput).',
        () => {
            // [ Arrange. ]
            sections.push(new Section(
                "Soc Sci 2 CL1",
                [new DayBasedSchedule("MThS", "8AM-5PM"),]
            ));

            // [ Act. ]
            const actual = getAllWithConflict(sections);

            // [ Assert. ]
            expect(actual.length).toBe(4);
        }
    );

    test(
        'Should return a copy of the Section objects (not by reference)' +
        '(w/ respect to the modified sampleInput).',
        () => {
            // [ Act. ]
            const actual = getAllWithConflict(sections);

            // [ Assert. ]
            expect(actual[0]).not.toBe(sections[0]);
            expect(actual).not.toBe(sections);
        }
    );

    test(
        'Should return the correct sections ' +
        '(w/ respect to the modified sampleInput).',
        () => {
            // [ Arrange. ]
            // remove the last elem
            sections.pop();
            sections.push(new Section(
                "Soc Sci 2 CL1",
                [
                    new DayBasedSchedule("MThS", "8AM-5PM"),
                    new DayBasedSchedule("F", "2-3:45PM")
                ]
            ));

            // [ Act. ]
            const actual = getAllWithConflict(sections);

            // [ Assert. ]
            expect(actual.length).toBe(5);
        }
    );
});
