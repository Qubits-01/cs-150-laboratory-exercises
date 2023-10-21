"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const day_based_schedule_1 = __importDefault(require("../../../utils/day_based_schedule/day_based_schedule"));
(0, globals_1.describe)('[ DayBasedSchedule ]', () => {
    let mock;
    (0, globals_1.beforeAll)(() => {
        // The arguments are not really needed here, just random input data.
        mock = new day_based_schedule_1.default("MWF", "8:30AM-10:00AM");
    });
    (0, globals_1.describe)('[ days ]', () => {
        let mock;
        let days;
        (0, globals_1.beforeAll)(() => {
            days = "MWThF";
            // The time argument is not really needed here, just random input data.
            mock = new day_based_schedule_1.default(days, "8:30 AM - 10:00 AM");
        });
        (0, globals_1.test)('Should return an array of correct Day objects.', () => {
            // [ Arrange.]
            const EXPECTED = mock.days;
            // [ Act. ]
            const ACTUAL = mock._proxyExtractDays(days);
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned array should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock.days;
            // [ Act. ]
            const MODIFIED_DAYS = mock.days;
            MODIFIED_DAYS.push("M");
            // [ Assert. ]
            (0, globals_1.expect)(MODIFIED_DAYS).not.toEqual(EXPECTED);
        });
    });
    (0, globals_1.describe)('[ startTime ]', () => {
        let time;
        let mock;
        (0, globals_1.beforeAll)(() => {
            time = "8:30AM";
            // The days argument is not really needed here, just random input data.
            mock = new day_based_schedule_1.default("MWF", `${time}-10:00AM`);
        });
        (0, globals_1.test)('Should return a correct Time object.', () => {
            // [ Arrange. ]
            const EXPECTED = mock.startTime;
            // [ Act. ]
            const ACTUAL = mock._proxyBuildTimeObj(time, () => "AM");
            console.log(ACTUAL);
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned Time object should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock.startTime;
            // [ Act. ]
            const MODIFIED_TIME = mock.startTime;
            MODIFIED_TIME.hour = 69;
            MODIFIED_TIME.minute = 42;
            // [ Assert. ] 
            (0, globals_1.expect)(MODIFIED_TIME).not.toEqual(EXPECTED);
        });
    });
    (0, globals_1.describe)('[ endTime ]', () => {
        let time;
        let mock;
        (0, globals_1.beforeAll)(() => {
            time = "10:00AM";
            // The days argument is not really needed here, just random input data.
            mock = new day_based_schedule_1.default("MWF", `8:30AM-${time}`);
        });
        (0, globals_1.test)('Should return a correct Time object.', () => {
            // [ Arrange. ]
            const EXPECTED = mock.endTime;
            // [ Act. ]
            const ACTUAL = mock._proxyBuildTimeObj(time, () => "AM");
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned Time object should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock.endTime;
            // [ Act. ]
            const MODIFIED_TIME = mock.endTime;
            MODIFIED_TIME.hour = 69;
            MODIFIED_TIME.minute = 42;
            // [ Assert. ] 
            (0, globals_1.expect)(MODIFIED_TIME).not.toEqual(EXPECTED);
        });
    });
    (0, globals_1.describe)('[ _extractDays ]', () => {
        (0, globals_1.test)('Should return an array of correct Day objects for TTh.', () => {
            // [ Arrange. ]
            const rawDays = "TTh";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["T", "Th"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
        (0, globals_1.test)('Should return an array of correct Day objects for MTWThFS.', () => {
            // [ Arrange. ]
            const rawDays = "MTWThFS";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["M", "T", "W", "Th", "F", "S"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
        (0, globals_1.test)('Should return an array of correct Day objects for Th.', () => {
            // [ Arrange. ]
            const rawDays = "Th";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["Th"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
        (0, globals_1.test)('Should return an array of correct Day objects for MT.', () => {
            // [ Arrange. ]
            const rawDays = "MT";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["M", "T"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
        (0, globals_1.test)('Should return an array of correct Day objects for ThFS.', () => {
            // [ Arrange. ]
            const rawDays = "ThFS";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["Th", "F", "S"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
        (0, globals_1.test)('Should return an array of correct Day objects for ThTMF.', () => {
            // [ Arrange. ]
            const rawDays = "ThTMF";
            // [ Act. ]
            let days = mock._proxyExtractDays(rawDays);
            // [ Assert. ]
            const EXPECTED_DAYS = ["Th", "T", "M", "F"];
            (0, globals_1.expect)(days).toEqual(EXPECTED_DAYS);
        });
    });
    (0, globals_1.describe)('[ _extractAmOrPm ]', () => {
        (0, globals_1.test)('Should return "AM" for 8:30AM.', () => {
            // [ Arrange. ]
            const rawTime = "8:30AM";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBe("AM");
        });
        (0, globals_1.test)('Should return "AM" for 10AM.', () => {
            // [ Arrange. ]
            const rawTime = "10AM";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBe("AM");
        });
        (0, globals_1.test)('Should return "PM" for 5:30PM.', () => {
            // [ Arrange. ]
            const rawTime = "5:30PM";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBe("PM");
        });
        (0, globals_1.test)('Should return "PM" for 2PM.', () => {
            // [ Arrange. ]
            const rawTime = "2PM";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBe("PM");
        });
        (0, globals_1.test)('Should return null for 11.', () => {
            // [ Arrange. ]
            const rawTime = "11";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBeNull();
        });
        (0, globals_1.test)('Should return null for 3:30.', () => {
            // [ Arrange. ]
            const rawTime = "3:30";
            // [ Act. ]
            let amOrPm = mock._proxyExtractAmOrPm(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(amOrPm).toBeNull();
        });
    });
    (0, globals_1.describe)('[ _extractHourMinute ]', () => {
        (0, globals_1.test)('Should return [8, 30] for 8:30AM.', () => {
            // [ Arrange. ]
            const rawTime = "8:30AM";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(8);
            (0, globals_1.expect)(minute).toBe(30);
        });
        (0, globals_1.test)('Should return [10, 0] for 10AM.', () => {
            // [ Arrange. ]
            const rawTime = "10AM";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(10);
            (0, globals_1.expect)(minute).toBe(0);
        });
        (0, globals_1.test)('Should return [5, 30] for 5:30PM.', () => {
            // [ Arrange. ]
            const rawTime = "5:30PM";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(5);
            (0, globals_1.expect)(minute).toBe(30);
        });
        (0, globals_1.test)('Should return [2, 0] for 2PM.', () => {
            // [ Arrange. ]
            const rawTime = "2PM";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(2);
            (0, globals_1.expect)(minute).toBe(0);
        });
        (0, globals_1.test)('Should return [11, 0] for 11.', () => {
            // [ Arrange. ]
            const rawTime = "11";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(11);
            (0, globals_1.expect)(minute).toBe(0);
        });
        (0, globals_1.test)('Should return [3, 30] for 3:30.', () => {
            // [ Arrange. ]
            const rawTime = "3:30";
            // [ Act. ]
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            // [ Assert. ]
            (0, globals_1.expect)(hour).toBe(3);
            (0, globals_1.expect)(minute).toBe(30);
        });
    });
    (0, globals_1.describe)('[ _buildTimeObj ]', () => {
        (0, globals_1.test)('Should return a correct Time object for 8:30AM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "8:30AM";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "AM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 10AM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "10AM";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "AM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 11AM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "11";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "AM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 10:30AM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "10:30";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "AM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 5:30PM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "5:30PM";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "PM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 2PM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "2PM";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "PM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 1PM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "1";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "PM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
        (0, globals_1.test)('Should return a correct Time object for 3:30PM.', () => {
            var _a;
            // [ Arrange. ]
            let rawTime = "3:30";
            let [hour, minute] = mock._proxyExtractHourMinute(rawTime);
            let amOrPm = (_a = mock._proxyExtractAmOrPm(rawTime)) !== null && _a !== void 0 ? _a : "PM";
            // [ Act. ]
            let time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);
            // [ Assert. ]
            const EXPECTED_TIME = { hour, minute, amOrPm };
            (0, globals_1.expect)(time).toEqual(EXPECTED_TIME);
        });
    });
    (0, globals_1.describe)('[ _getMinuteSinceMidnight ]', () => {
        (0, globals_1.describe)('12 o\'clock edge cases.', () => {
            // This is not really needed since the earliest time
            // for a class is 7:00 AM. This is just for sanity check.
            (0, globals_1.test)('Should return 0 for 12:00AM.', () => {
                // [ Arrange. ]
                let time = mock._proxyBuildTimeObj("12:00AM", () => "AM");
                // [ Act. ]
                let minutes = mock._proxyGetMinutesSinceMidnight(time);
                // [ Assert. ]
                (0, globals_1.expect)(minutes).toBe(0);
            });
            (0, globals_1.test)('Should return 720 for 12:00PM.', () => {
                // [ Arrange. ]
                let time = mock._proxyBuildTimeObj("12:00PM", () => "PM");
                // [ Act. ]
                let minutes = mock._proxyGetMinutesSinceMidnight(time);
                // [ Assert. ]
                (0, globals_1.expect)(minutes).toBe(720);
            });
            (0, globals_1.test)('Should return 45 for 12:45AM.', () => {
                // [ Arrange. ]
                let time = mock._proxyBuildTimeObj("12:45", () => "AM");
                // [ Act. ]
                let minutes = mock._proxyGetMinutesSinceMidnight(time);
                // [ Assert. ]
                (0, globals_1.expect)(minutes).toBe(45);
            });
            (0, globals_1.test)('Should return 750 for 12:30PM.', () => {
                // [ Arrange. ]
                let time = mock._proxyBuildTimeObj("12:30", () => "PM");
                // [ Act. ]
                let minutes = mock._proxyGetMinutesSinceMidnight(time);
                // [ Assert. ]
                (0, globals_1.expect)(minutes).toBe(750);
            });
        });
        (0, globals_1.test)('Should return 1140 for 7PM.', () => {
            // [ Arrange. ]
            let time = mock._proxyBuildTimeObj("7", () => "PM");
            // [ Act. ]
            let minutes = mock._proxyGetMinutesSinceMidnight(time);
            // [ Assert. ]
            (0, globals_1.expect)(minutes).toBe(1140);
        });
        (0, globals_1.test)('Should return 690 for 11:30AM.', () => {
            // [ Arrange. ]
            let time = mock._proxyBuildTimeObj("11:30AM", () => "AM");
            // [ Act. ]
            let minutes = mock._proxyGetMinutesSinceMidnight(time);
            // [ Assert. ]
            (0, globals_1.expect)(minutes).toBe(690);
        });
        (0, globals_1.test)('Should return 780 for 1:00PM.', () => {
            // [ Arrange. ]
            let time = mock._proxyBuildTimeObj("1", () => "PM");
            // [ Act. ]
            let minutes = mock._proxyGetMinutesSinceMidnight(time);
            // [ Assert. ]
            (0, globals_1.expect)(minutes).toBe(780);
        });
        (0, globals_1.test)('Should return 495 for 8:15AM.', () => {
            // [ Arrange. ]
            let time = mock._proxyBuildTimeObj("8:15AM", () => "AM");
            // [ Act. ]
            let minutes = mock._proxyGetMinutesSinceMidnight(time);
            // [ Assert. ]
            (0, globals_1.expect)(minutes).toBe(495);
        });
    });
});
