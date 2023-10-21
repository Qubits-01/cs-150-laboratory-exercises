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
        mock = new day_based_schedule_1.default("MWF", "8:30 AM - 10:00 AM");
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
