import { describe, expect, test, beforeAll } from '@jest/globals';
import DayBasedSchedule from '../../../utils/day_based_schedule/day_based_schedule';
import { Day, AmOrPm, Time } from '../../../utils/custom_types';

describe('[ DayBasedSchedule ]', () => {
    let mock: DayBasedSchedule;
    beforeAll(() => {
        // The arguments are not really needed here, just random input data.
        mock = new DayBasedSchedule("MWF", "8:30AM-10:00AM");
    });

    describe('[ days ]', () => {
        let mock: DayBasedSchedule;
        let days: string;

        beforeAll(() => {
            days = "MWThF";
            // The time argument is not really needed here, just random input data.
            mock = new DayBasedSchedule(days, "8:30AM-10:00AM");

        });

        test('Should return an array of correct Day objects.', () => {
            // [ Arrange.]
            const EXPECTED: Day[] = mock.days;

            // [ Act. ]
            const ACTUAL: Day[] = mock._proxyExtractDays(days);

            // [ Assert. ]
            expect(ACTUAL).toEqual(EXPECTED);
        });

        test('Returned array should not be modifiable outside of this class.', () => {
            // [ Arrange. ]
            const EXPECTED: Day[] = mock.days;

            // [ Act. ]
            const MODIFIED_DAYS: Day[] = mock.days;
            MODIFIED_DAYS.push("M");

            // [ Assert. ]
            expect(MODIFIED_DAYS).not.toEqual(EXPECTED);
        });
    });

    describe('[ startTime ]', () => {
        let time: string;
        let mock: DayBasedSchedule;

        beforeAll(() => {
            time = "8:30AM";
            // The days argument is not really needed here, just random input data.
            mock = new DayBasedSchedule("MWF", `${time}-10:00AM`);
        });

        test('Should return a correct Time object.', () => {
            // [ Arrange. ]
            const EXPECTED: Time = mock.startTime;

            // [ Act. ]
            const ACTUAL: Time = mock._proxyBuildTimeObj(time, () => "AM");
            console.log(ACTUAL);

            // [ Assert. ]
            expect(ACTUAL).toEqual(EXPECTED);
        });

        test(
            'Returned Time object should not be modifiable outside of this class.',
            () => {
                // [ Arrange. ]
                const EXPECTED: Time = mock.startTime;

                // [ Act. ]
                const MODIFIED_TIME: Time = mock.startTime;
                MODIFIED_TIME.hour = 69;
                MODIFIED_TIME.minute = 42;

                // [ Assert. ] 
                expect(MODIFIED_TIME).not.toEqual(EXPECTED);
            }
        );
    });

    describe('[ endTime ]', () => {
        let time: string;
        let mock: DayBasedSchedule;

        beforeAll(() => {
            time = "10:00AM";
            // The days argument is not really needed here, just random input data.
            mock = new DayBasedSchedule("MWF", `8:30AM-${time}`);
        });

        test('Should return a correct Time object.', () => {
            // [ Arrange. ]
            const EXPECTED: Time = mock.endTime;

            // [ Act. ]
            const ACTUAL: Time = mock._proxyBuildTimeObj(time, () => "AM");

            // [ Assert. ]
            expect(ACTUAL).toEqual(EXPECTED);
        });

        test(
            'Returned Time object should not be modifiable outside of this class.',
            () => {
                // [ Arrange. ]
                const EXPECTED: Time = mock.endTime;

                // [ Act. ]
                const MODIFIED_TIME: Time = mock.endTime;
                MODIFIED_TIME.hour = 69;
                MODIFIED_TIME.minute = 42;

                // [ Assert. ] 
                expect(MODIFIED_TIME).not.toEqual(EXPECTED);
            }
        );
    });

    describe('[ hasConflict ]', () => {
        test('Should return true for 8:30-10AM and 9:00-10AM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "8:30-10AM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "9:00-10AM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(true);
        });

        test('Should return true for 8:30-10AM and 8:30-9AM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "8:30-10AM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "8:30-9AM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(true);
        });

        test('Should return false for 8:30-10AM and 10-1PM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "8:30-10AM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "10-1PM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(false);
        });

        test('Should return false for 2:30-3:30PM and 7AM-2:30PM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "2:30-3:30PM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "7AM-2:30PM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(false);
        });

        test('Should return false for 2:30-3:30PM and 4-5PM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "2:30-3:30PM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "4-5PM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(false);
        });

        test('Should return false for 10:45AM-3PM and 7:30-8AM.', () => {
            // [ Arrange. ]
            let sched1: DayBasedSchedule = new DayBasedSchedule("MWF", "10:45AM-3PM");
            let sched2: DayBasedSchedule = new DayBasedSchedule("MWF", "7:30-8AM");

            // [ Act. ]
            let hasConflict: boolean = sched1.hasConflict(sched2);

            // [ Assert. ]
            expect(hasConflict).toBe(false);
        });
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

    describe('[ _extractAmOrPm ]', () => {
        test('Should return "AM" for 8:30AM.', () => {
            // [ Arrange. ]
            const rawTime = "8:30AM";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBe("AM");
        });

        test('Should return "AM" for 10AM.', () => {
            // [ Arrange. ]
            const rawTime = "10AM";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBe("AM");
        });

        test('Should return "PM" for 5:30PM.', () => {
            // [ Arrange. ]
            const rawTime = "5:30PM";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBe("PM");
        });

        test('Should return "PM" for 2PM.', () => {
            // [ Arrange. ]
            const rawTime = "2PM";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBe("PM");
        });

        test('Should return null for 11.', () => {
            // [ Arrange. ]
            const rawTime = "11";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBeNull();
        });

        test('Should return null for 3:30.', () => {
            // [ Arrange. ]
            const rawTime = "3:30";

            // [ Act. ]
            let amOrPm: AmOrPm | null = mock._proxyExtractAmOrPm(rawTime);

            // [ Assert. ]
            expect(amOrPm).toBeNull();
        });
    });

    describe('[ _extractHourMinute ]', () => {
        test('Should return [8, 30] for 8:30AM.', () => {
            // [ Arrange. ]
            const rawTime = "8:30AM";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(8);
            expect(minute).toBe(30);
        });

        test('Should return [10, 0] for 10AM.', () => {
            // [ Arrange. ]
            const rawTime = "10AM";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(10);
            expect(minute).toBe(0);
        });

        test('Should return [5, 30] for 5:30PM.', () => {
            // [ Arrange. ]
            const rawTime = "5:30PM";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(5);
            expect(minute).toBe(30);
        });

        test('Should return [2, 0] for 2PM.', () => {
            // [ Arrange. ]
            const rawTime = "2PM";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(2);
            expect(minute).toBe(0);
        });

        test('Should return [11, 0] for 11.', () => {
            // [ Arrange. ]
            const rawTime = "11";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(11);
            expect(minute).toBe(0);
        });

        test('Should return [3, 30] for 3:30.', () => {
            // [ Arrange. ]
            const rawTime = "3:30";

            // [ Act. ]
            let [hour, minute]: [number, number] =
                mock._proxyExtractHourMinute(rawTime);

            // [ Assert. ]
            expect(hour).toBe(3);
            expect(minute).toBe(30);
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

    describe('[ _convertStartEndToMinutes ]', () => {
        test('Should return [495, 600] for 8:15-10:00AM.', () => {
            // [ Arrange. ]
            let sched: DayBasedSchedule = new DayBasedSchedule("MWF", "8:15-10:00AM");

            // [ Act. ]
            let [start, end]: [number, number] =
                mock._proxyConvertStartEndToMinutes(sched);

            // [ Assert. ]
            expect(start).toBe(495);
            expect(end).toBe(600);
        });

        test('Should return [780, 840] for 1:00-2:00PM.', () => {
            // [ Arrange. ]
            let sched: DayBasedSchedule = new DayBasedSchedule("MWF", "1:00-2:00PM");

            // [ Act. ]
            let [start, end]: [number, number] =
                mock._proxyConvertStartEndToMinutes(sched);

            // [ Assert. ]
            expect(start).toBe(780);
            expect(end).toBe(840);
        });

        test('Should return [1140, 1200] for 7-8PM.', () => {
            // [ Arrange. ]
            let sched: DayBasedSchedule = new DayBasedSchedule("MWF", "7-8PM");

            // [ Act. ]
            let [start, end]: [number, number] =
                mock._proxyConvertStartEndToMinutes(sched);

            // [ Assert. ]
            expect(start).toBe(1140);
            expect(end).toBe(1200);
        });

        test('Should return [690, 780] for 11:30AM-1PM.', () => {
            // [ Arrange. ]
            let sched: DayBasedSchedule = new DayBasedSchedule("MWF", "11:30AM-1PM");

            // [ Act. ]
            let [start, end]: [number, number] =
                mock._proxyConvertStartEndToMinutes(sched);

            // [ Assert. ]
            expect(start).toBe(690);
            expect(end).toBe(780);
        });

        test('Should return [495, 600] for 8:15AM-10AM.', () => {
            // [ Arrange. ]
            let sched: DayBasedSchedule = new DayBasedSchedule("MWF", "8:15AM-10AM");

            // [ Act. ]
            let [start, end]: [number, number] =
                mock._proxyConvertStartEndToMinutes(sched);

            // [ Assert. ]
            expect(start).toBe(495);
            expect(end).toBe(600);
        }
        );
    });
});
