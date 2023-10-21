import { describe, expect, test, beforeAll } from '@jest/globals';
import DayBasedSchedule from '../../../utils/day_based_schedule/day_based_schedule';
import { Day, AmOrPm, Time } from '../../../utils/custom_types';

describe('[ DayBasedSchedule ]', () => {
    let mock: DayBasedSchedule;
    beforeAll(() => {
        // The arguments are not really needed here, just random input data.
        mock = new DayBasedSchedule("MWF", "8:30 AM - 10:00 AM");
    });

    describe('[ _extractDays ]', () => {
        test('Should return an array of correct Day objects for TTh.', () => {
            // [ Arrange. ]
            const rawDays = "TTh";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["T", "Th"];
            expect(days).toEqual(EXPECTED_DAYS);
        });

        test('Should return an array of correct Day objects for MTWThFS.', () => {
            // [ Arrange. ]
            const rawDays = "MTWThFS";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["M", "T", "W", "Th", "F", "S"];
            expect(days).toEqual(EXPECTED_DAYS);
        });

        test('Should return an array of correct Day objects for Th.', () => {
            // [ Arrange. ]
            const rawDays = "Th";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["Th"];
            expect(days).toEqual(EXPECTED_DAYS);
        });

        test('Should return an array of correct Day objects for MT.', () => {
            // [ Arrange. ]
            const rawDays = "MT";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["M", "T"];
            expect(days).toEqual(EXPECTED_DAYS);
        });

        test('Should return an array of correct Day objects for ThFS.', () => {
            // [ Arrange. ]
            const rawDays = "ThFS";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["Th", "F", "S"];
            expect(days).toEqual(EXPECTED_DAYS);
        });

        test('Should return an array of correct Day objects for ThTMF.', () => {
            // [ Arrange. ]
            const rawDays = "ThTMF";

            // [ Act. ]
            let days: Day[] = mock._proxyExtractDays(rawDays);

            // [ Assert. ]
            const EXPECTED_DAYS: Day[] = ["Th", "T", "M", "F"];
            expect(days).toEqual(EXPECTED_DAYS);
        });
    });

    describe('[ _buildTimeObj ]', () => {
        test('Should return a correct Time object for 8:30AM.', () => {
            // [ Arrange. ]
            let rawTime = "8:30AM";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "AM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 10AM.', () => {
            // [ Arrange. ]
            let rawTime = "10AM";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "AM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 11AM.', () => {
            // [ Arrange. ]
            let rawTime = "11";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "AM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 10:30AM.', () => {
            // [ Arrange. ]
            let rawTime = "10:30";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "AM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 5:30PM.', () => {
            // [ Arrange. ]
            let rawTime = "5:30PM";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "PM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 2PM.', () => {
            // [ Arrange. ]
            let rawTime = "2PM";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "PM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 1PM.', () => {
            // [ Arrange. ]
            let rawTime = "1";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "PM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });

        test('Should return a correct Time object for 3:30PM.', () => {
            // [ Arrange. ]
            let rawTime = "3:30";
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);
            let amOrPm: AmOrPm = mock._proxyExtractAmOrPm(rawTime) ?? "PM";

            // [ Act. ]
            let time: Time = mock._proxyBuildTimeObj(rawTime, () => amOrPm);

            // [ Assert. ]
            const EXPECTED_TIME: Time = { hour, minute, amOrPm };
            expect(time).toEqual(EXPECTED_TIME);
        });
    });

    describe('[ _getMinuteSinceMidnight ]', () => {
        describe('12 o\'clock edge cases.', () => {
            // This is not really needed since the earliest time
            // for a class is 7:00 AM. This is just for sanity check.
            test('Should return 0 for 12:00AM.', () => {
                // [ Arrange. ]
                let time: Time = mock._proxyBuildTimeObj("12:00AM", () => "AM");

                // [ Act. ]
                let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

                // [ Assert. ]
                expect(minutes).toBe(0);
            });

            test('Should return 720 for 12:00PM.', () => {
                // [ Arrange. ]
                let time: Time = mock._proxyBuildTimeObj("12:00PM", () => "PM");

                // [ Act. ]
                let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

                // [ Assert. ]
                expect(minutes).toBe(720);
            });

            test('Should return 45 for 12:45AM.', () => {
                // [ Arrange. ]
                let time: Time = mock._proxyBuildTimeObj("12:45", () => "AM");

                // [ Act. ]
                let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

                // [ Assert. ]
                expect(minutes).toBe(45);
            });

            test('Should return 750 for 12:30PM.', () => {
                // [ Arrange. ]
                let time: Time = mock._proxyBuildTimeObj("12:30", () => "PM");

                // [ Act. ]
                let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

                // [ Assert. ]
                expect(minutes).toBe(750);
            });
        });

        test('Should return 1140 for 7PM.', () => {
            // [ Arrange. ]
            let time: Time = mock._proxyBuildTimeObj("7", () => "PM");

            // [ Act. ]
            let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

            // [ Assert. ]
            expect(minutes).toBe(1140);
        });

        test('Should return 690 for 11:30AM.', () => {
            // [ Arrange. ]
            let time: Time = mock._proxyBuildTimeObj("11:30AM", () => "AM");

            // [ Act. ]
            let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

            // [ Assert. ]
            expect(minutes).toBe(690);
        });

        test('Should return 780 for 1:00PM.', () => {
            // [ Arrange. ]
            let time: Time = mock._proxyBuildTimeObj("1", () => "PM");

            // [ Act. ]
            let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

            // [ Assert. ]
            expect(minutes).toBe(780);
        });

        test('Should return 495 for 8:15AM.', () => {
            // [ Arrange. ]
            let time: Time = mock._proxyBuildTimeObj("8:15AM", () => "AM");

            // [ Act. ]
            let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

            // [ Assert. ]
            expect(minutes).toBe(495);
        });
    });
});
