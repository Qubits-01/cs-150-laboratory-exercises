"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const globals_1 = require("@jest/globals");
const index_2 = require("../index");
const day_based_schedule_1 = __importDefault(require("../utils/day_based_schedule/day_based_schedule"));
(0, globals_1.describe)('[ Section ]', () => {
});
(0, globals_1.describe)('[ parseInput ]', () => {
    let sampleInput;
    (0, globals_1.beforeAll)(() => {
        sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
            CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
            CS 12 LAB 1,F 1-4PM lab TL3
            CS 12 LEC 2,TTh 1-2PM lec P&G
            CS 31 THY2,TTh 4-5:30PM lec CLR3`;
    });
    (0, globals_1.test)('Should return 5 sections (w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual.length).toBe(5);
    });
    (0, globals_1.test)('Should return 1 section with 2 day-based schedules (w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[1].dayBasedSchedules.length).toBe(2);
    });
    (0, globals_1.test)('Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0].dayBasedSchedules.length).toBe(1);
    });
    (0, globals_1.test)('Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0].completeName).toBe("CS 153 THU");
        (0, globals_1.expect)(actual[1].completeName).toBe("CS 11 CLASS 1");
        (0, globals_1.expect)(actual[2].completeName).toBe("CS 12 LAB 1");
        (0, globals_1.expect)(actual[3].completeName).toBe("CS 12 LEC 2");
        (0, globals_1.expect)(actual[4].completeName).toBe("CS 31 THY2");
    });
    // Should return with the correct day-based schedules.
    (0, globals_1.test)('Should return the Section objects with the correct day-based schedules ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
        (0, globals_1.expect)(actual[1].dayBasedSchedules[0].days).toStrictEqual(["W"]);
        (0, globals_1.expect)(actual[1].dayBasedSchedules[1].days).toStrictEqual(["F"]);
        (0, globals_1.expect)(actual[2].dayBasedSchedules[0].days).toStrictEqual(["F"]);
        (0, globals_1.expect)(actual[3].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
        (0, globals_1.expect)(actual[4].dayBasedSchedules[0].days).toStrictEqual(["T", "Th"]);
    });
    (0, globals_1.test)('Should not return an empty array when the input is an empty string.', () => {
        // [ Arrange. ]
        const emptyInput = "";
        // [ Act. ]
        const actual = (0, index_2.parseInput)(emptyInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual.length).toBe(0);
    });
    (0, globals_1.test)('Should return an array that contains Section objects.', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual.every(section => section instanceof index_1.default)).toBe(true);
    });
    (0, globals_1.test)('Should return an array that contains Section objects ' +
        'with DayBasedSchedule objects.', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        let isTypeDayBasedSchedule = (dayBasedSchedule) => dayBasedSchedule instanceof day_based_schedule_1.default;
        // [ Assert. ]
        (0, globals_1.expect)(actual.every(section => section.dayBasedSchedules.every(isTypeDayBasedSchedule))).toBe(true);
    });
});
