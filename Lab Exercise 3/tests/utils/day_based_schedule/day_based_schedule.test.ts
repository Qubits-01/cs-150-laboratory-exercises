import { describe, expect, test, beforeAll } from '@jest/globals';
import DayBasedSchedule from '../../../utils/day_based_schedule/day_based_schedule';
import { Time } from '../../../utils/custom_types';

describe(' [ _buildTimeObj ]', () => {

});

describe('[ _getMinuteSinceMidnight ]', () => {
    let mock: DayBasedSchedule;
    beforeAll(() => {
        // The arguments are not really needed here, just placeholders.
        mock = new DayBasedSchedule("MWF", "8:30 AM - 10:00 AM");
    });

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

