"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../index"));
const globals_1 = require("@jest/globals");
const index_2 = require("../index");
const day_based_schedule_1 = __importDefault(require("../utils/day_based_schedule/day_based_schedule"));
(0, globals_1.describe)('[ Section ]', () => {
    (0, globals_1.describe)('[ hasConflict ]', () => {
        let sampleInput;
        let sections;
        (0, globals_1.beforeAll)(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;
            sections = (0, index_2.parseInput)(sampleInput);
        });
        (0, globals_1.test)('Should return false for sections[0] and sections[1] ' +
            '(w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section1 = sections[0];
            let section2 = sections[1];
            // [ Act. ]
            let actual = section1.hasConflict(section2);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for sections[1] and sections[2] ' +
            '(w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section1 = sections[1];
            let section2 = sections[2];
            // [ Act. ]
            let actual = section1.hasConflict(section2);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return true for sections[3] and sections[5] ' +
            '(w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section1 = sections[3];
            let section2 = sections[5];
            // [ Act. ]
            let actual = section1.hasConflict(section2);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        (0, globals_1.test)('Should return true for sections[2] and sections[5] ' +
            '(w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section1 = sections[2];
            let section2 = sections[5];
            // [ Act. ]
            let actual = section1.hasConflict(section2);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
    });
    (0, globals_1.describe)('[ isGE ]', () => {
        let sampleInput;
        let sections;
        (0, globals_1.beforeAll)(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA
                Araling Kapampangan 10, F 1-4PM lec TBA`;
            sections = (0, index_2.parseInput)(sampleInput);
        });
        (0, globals_1.test)('Should return false for sections[0] (w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section = sections[0];
            // [ Act. ]
            let actual = section.isGE();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for sections[1] (w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section = sections[1];
            // [ Act. ]
            let actual = section.isGE();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return true for sections[5] (w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section = sections[5];
            // [ Act. ]
            let actual = section.isGE();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        (0, globals_1.test)('Should return true for sections[6] (w/ respect to sample input).', () => {
            // [ Arrange. ]
            let section = sections[6];
            // [ Act. ]
            let actual = section.isGE();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
    });
    (0, globals_1.describe)('[ hasSlots ]', () => {
        (0, globals_1.test)('Should always return true (for now).', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "10AM-12PM");
            let section = new index_1.default("CS 11 CLASS 1", [sched]);
            // [ Assert. ]
            (0, globals_1.expect)(section.hasSlots()).toBe(true);
        });
    });
    (0, globals_1.describe)('[ _completeName ]', () => {
        (0, globals_1.test)('Should return the correct complete name.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "10AM-12PM");
            let section = new index_1.default("CS 11 CLASS 1", [sched]);
            // [ Assert. ]
            (0, globals_1.expect)(section._proxyCompleteName).toBe("CS 11 CLASS 1");
        });
    });
    (0, globals_1.describe)('[ _dayBasedSchedules ]', () => {
        // beforeAll
        let sampleInput;
        let sections;
        (0, globals_1.beforeAll)(() => {
            sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
                CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
                CS 12 LAB 1,F 1-4PM lab TL3
                CS 12 LEC 2,TTh 1-2PM lec P&G
                CS 31 THY2,TTh 4-5:30PM lec CLR3
                Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;
            sections = (0, index_2.parseInput)(sampleInput);
        });
        (0, globals_1.test)('Should return the correct day based schedules ' +
            '(w/ respect to sample input).', () => {
            // [ Assert. ]
            (0, globals_1.expect)(sections[0]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["T", "Th"]);
            (0, globals_1.expect)(sections[1]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["W"]);
            (0, globals_1.expect)(sections[1]._proxyDayBasedSchedules[1]._proxyDays)
                .toStrictEqual(["F"]);
            (0, globals_1.expect)(sections[2]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["F"]);
            (0, globals_1.expect)(sections[3]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["T", "Th"]);
            (0, globals_1.expect)(sections[4]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["T", "Th"]);
            (0, globals_1.expect)(sections[5]._proxyDayBasedSchedules[0]._proxyDays)
                .toStrictEqual(["M", "Th", "S"]);
            (0, globals_1.expect)(sections[5]._proxyDayBasedSchedules[1]._proxyDays)
                .toStrictEqual(["F"]);
        });
        // The returned array should not be a reference to the original array.
        (0, globals_1.test)('Should return a copy of the day based schedules ' +
            '(w/ respect to sample input).', () => {
            // [ Assert. ]
            (0, globals_1.expect)(sections[0]._proxyDayBasedSchedules[0]).not.toBe(sections[0]._proxyDayBasedSchedules[0]);
        });
        (0, globals_1.test)('Should return an array of DayBasedSchedule objects ' +
            '(w/ respect to sample input).', () => {
            // [ Assert. ]
            (0, globals_1.expect)(sections[0]._proxyDayBasedSchedules.every(dayBasedSched => dayBasedSched instanceof day_based_schedule_1.default)).toBe(true);
        });
    });
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
        (0, globals_1.expect)(actual[1]._proxyDayBasedSchedules.length).toBe(2);
    });
    (0, globals_1.test)('Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]._proxyDayBasedSchedules.length).toBe(1);
    });
    (0, globals_1.test)('Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]._proxyCompleteName).toBe("CS 153 THU");
        (0, globals_1.expect)(actual[1]._proxyCompleteName).toBe("CS 11 CLASS 1");
        (0, globals_1.expect)(actual[2]._proxyCompleteName).toBe("CS 12 LAB 1");
        (0, globals_1.expect)(actual[3]._proxyCompleteName).toBe("CS 12 LEC 2");
        (0, globals_1.expect)(actual[4]._proxyCompleteName).toBe("CS 31 THY2");
    });
    // Should return with the correct day-based schedules.
    (0, globals_1.test)('Should return the Section objects with the correct day-based schedules ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_2.parseInput)(sampleInput);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
        (0, globals_1.expect)(actual[1]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["W"]);
        (0, globals_1.expect)(actual[1]._proxyDayBasedSchedules[1]._proxyDays).toStrictEqual(["F"]);
        (0, globals_1.expect)(actual[2]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["F"]);
        (0, globals_1.expect)(actual[3]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
        (0, globals_1.expect)(actual[4]._proxyDayBasedSchedules[0]._proxyDays).toStrictEqual(["T", "Th"]);
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
        (0, globals_1.expect)(actual.every(section => section._proxyDayBasedSchedules.every(isTypeDayBasedSchedule))).toBe(true);
    });
});
(0, globals_1.describe)('[ getGEs ]', () => {
    let sampleInput;
    let sections;
    (0, globals_1.beforeAll)(() => {
        sampleInput = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
            CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
            CS 12 LAB 1,F 1-4PM lab TL3
            CS 12 LEC 2,TTh 1-2PM lec P&G
            CS 31 THY2,TTh 4-5:30PM lec CLR3
            Soc Sci 2 CL1,MThS 8AM-5PM; F 2-3:45PM lec TBA`;
        sections = (0, index_2.parseInput)(sampleInput);
    });
    (0, globals_1.test)('Should return 5 sections (w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_1.getGEs)(sections);
        // [ Assert. ]
        (0, globals_1.expect)(actual.length).toBe(5);
    });
    (0, globals_1.test)('Should return 1 section with 2 day-based schedules ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_1.getGEs)(sections);
        // [ Assert. ]
        (0, globals_1.expect)(actual[1]._proxyDayBasedSchedules.length).toBe(2);
    });
    (0, globals_1.test)('Should return 1 section with 1 day-based schedule ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_1.getGEs)(sections);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]._proxyDayBasedSchedules.length).toBe(1);
    });
    (0, globals_1.test)('Should return a copy of the Section objects ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_1.getGEs)(sections);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]).not.toBe(sections[0]);
        (0, globals_1.expect)(actual).not.toBe(sections);
    });
    (0, globals_1.test)('Should return the Section objects in the same order as the input ' +
        '(w/ respect to sampleInput 1).', () => {
        // [ Act. ]
        const actual = (0, index_1.getGEs)(sections);
        // [ Assert. ]
        (0, globals_1.expect)(actual[0]._proxyCompleteName).toBe("CS 153 THU");
        (0, globals_1.expect)(actual[1]._proxyCompleteName).toBe("CS 11 CLASS 1");
        (0, globals_1.expect)(actual[2]._proxyCompleteName).toBe("CS 12 LAB 1");
        (0, globals_1.expect)(actual[3]._proxyCompleteName).toBe("CS 12 LEC 2");
        (0, globals_1.expect)(actual[4]._proxyCompleteName).toBe("CS 31 THY2");
    });
});
