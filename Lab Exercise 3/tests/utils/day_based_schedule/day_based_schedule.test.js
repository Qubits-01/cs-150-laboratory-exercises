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
            mock = new day_based_schedule_1.default(days, "8:30AM-10:00AM");
        });
        (0, globals_1.test)('Should return an array of correct Day objects.', () => {
            // [ Arrange.]
            const EXPECTED = mock._proxyDays;
            // [ Act. ]
            const ACTUAL = mock._proxyExtractDays(days);
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned array should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock._proxyDays;
            // [ Act. ]
            const MODIFIED_DAYS = mock._proxyDays;
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
            const EXPECTED = mock._proxyStartTime;
            // [ Act. ]
            const ACTUAL = mock._proxyBuildTimeObj(time, () => "AM");
            console.log(ACTUAL);
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned Time object should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock._proxyStartTime;
            // [ Act. ]
            const MODIFIED_TIME = mock._proxyStartTime;
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
            const EXPECTED = mock._proxyEndTime;
            // [ Act. ]
            const ACTUAL = mock._proxyBuildTimeObj(time, () => "AM");
            // [ Assert. ]
            (0, globals_1.expect)(ACTUAL).toEqual(EXPECTED);
        });
        (0, globals_1.test)('Returned Time object should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED = mock._proxyEndTime;
            // [ Act. ]
            const MODIFIED_TIME = mock._proxyEndTime;
            MODIFIED_TIME.hour = 69;
            MODIFIED_TIME.minute = 42;
            // [ Assert. ] 
            (0, globals_1.expect)(MODIFIED_TIME).not.toEqual(EXPECTED);
        });
    });
    (0, globals_1.describe)('[ hasConflict ]', () => {
        (0, globals_1.describe)('Same days.', () => {
            (0, globals_1.test)('Should return true for 8:30-10AM and 9:00-10AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MWF", "9:00-10AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return true for 8:30-10AM and 8:30-9AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MWF", "8:30-9AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return true for 4-5PM and 4:15-4:45PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "4-5PM");
                let sched2 = new day_based_schedule_1.default("MWF", "4:15-4:45PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return true for 8:30-10AM and 9-11AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MWF", "9-11AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return true for 12:30-4PM and 8AM-1PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "12:30-4PM");
                let sched2 = new day_based_schedule_1.default("MWF", "8AM-1PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return false for 8:30-10AM and 10-1PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MWF", "10-1PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for 2:30-3:30PM and 7AM-2:30PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "2:30-3:30PM");
                let sched2 = new day_based_schedule_1.default("MWF", "7AM-2:30PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for 2:30-3:30PM and 4-5PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "2:30-3:30PM");
                let sched2 = new day_based_schedule_1.default("MWF", "4-5PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for 10:45AM-3PM and 7:30-8AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MWF", "10:45AM-3PM");
                let sched2 = new day_based_schedule_1.default("MWF", "7:30-8AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
        });
        (0, globals_1.describe)('Varying days.', () => {
            (0, globals_1.test)('Should return true for MTW 8:30-10AM and WThF 9:00-10AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("MTW", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("WThF", "9:00-10AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return false for ThFS 8:30-10AM and MT 8:30-9AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("ThFS", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MT", "8:30-9AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return true for WF 4-5PM and MTW 4:15-4:45PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("WF", "4-5PM");
                let sched2 = new day_based_schedule_1.default("MTW", "4:15-4:45PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(true);
            });
            (0, globals_1.test)('Should return false for TF 8:30-10AM and MTh 9-11AM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("TF", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MTh", "9-11AM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for Th 12:30-4PM and T 8AM-1PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("Th", "12:30-4PM");
                let sched2 = new day_based_schedule_1.default("T", "8AM-1PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for FSM 8:30-10AM and MThT 10-1PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("FSM", "8:30-10AM");
                let sched2 = new day_based_schedule_1.default("MThT", "10-1PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for WThF 2:30-3:30PM and ThS 7AM-2:30PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("WThF", "2:30-3:30PM");
                let sched2 = new day_based_schedule_1.default("ThS", "7AM-2:30PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
            (0, globals_1.test)('Should return false for SM 2:30-3:30PM and MF 4-5PM.', () => {
                // [ Arrange. ]
                let sched1 = new day_based_schedule_1.default("SM", "2:30-3:30PM");
                let sched2 = new day_based_schedule_1.default("MF", "4-5PM");
                // [ Act. ]
                let hasConflict = sched1.hasConflict(sched2);
                // [ Assert. ]
                (0, globals_1.expect)(hasConflict).toBe(false);
            });
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
    (0, globals_1.describe)('[ _convertStartEndToMinutes ]', () => {
        (0, globals_1.test)('Should return [495, 600] for 8:15-10:00AM.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "8:15-10:00AM");
            // [ Act. ]
            let [start, end] = mock._proxyConvertStartEndToMinutes(sched);
            // [ Assert. ]
            (0, globals_1.expect)(start).toBe(495);
            (0, globals_1.expect)(end).toBe(600);
        });
        (0, globals_1.test)('Should return [780, 840] for 1:00-2:00PM.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "1:00-2:00PM");
            // [ Act. ]
            let [start, end] = mock._proxyConvertStartEndToMinutes(sched);
            // [ Assert. ]
            (0, globals_1.expect)(start).toBe(780);
            (0, globals_1.expect)(end).toBe(840);
        });
        (0, globals_1.test)('Should return [1140, 1200] for 7-8PM.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "7-8PM");
            // [ Act. ]
            let [start, end] = mock._proxyConvertStartEndToMinutes(sched);
            // [ Assert. ]
            (0, globals_1.expect)(start).toBe(1140);
            (0, globals_1.expect)(end).toBe(1200);
        });
        (0, globals_1.test)('Should return [690, 780] for 11:30AM-1PM.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "11:30AM-1PM");
            // [ Act. ]
            let [start, end] = mock._proxyConvertStartEndToMinutes(sched);
            // [ Assert. ]
            (0, globals_1.expect)(start).toBe(690);
            (0, globals_1.expect)(end).toBe(780);
        });
        (0, globals_1.test)('Should return [495, 600] for 8:15AM-10AM.', () => {
            // [ Arrange. ]
            let sched = new day_based_schedule_1.default("MWF", "8:15AM-10AM");
            // [ Act. ]
            let [start, end] = mock._proxyConvertStartEndToMinutes(sched);
            // [ Assert. ]
            (0, globals_1.expect)(start).toBe(495);
            (0, globals_1.expect)(end).toBe(600);
        });
    });
});
