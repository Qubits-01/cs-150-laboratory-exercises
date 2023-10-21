import { describe, expect, test, beforeAll } from '@jest/globals';
import DayBasedSchedule from '../../../utils/day_based_schedule/day_based_schedule';
import { Time } from '../../../utils/custom_types';

describe('getMinuteSinceMidnight', () => {
    let mock: DayBasedSchedule;
    beforeAll(() => {
        // The arguments are not really needed here, just placeholders.
        mock = new DayBasedSchedule("MWF", "8:30 AM - 10:00 AM");
    });

    // This is not really needed since the earliest time
    // for a class is 7:00 AM. This is just for sanity check.
    test('Should return 0 or 12:00 AM.', () => {
        // [ Arrange. ]
        let time: Time = mock._proxyBuildTimeObj("12:00 AM", () => "AM");

        // [ Act. ]
        let minutes: number = mock._proxyGetMinutesSinceMidnight(time);

        // [ Assert. ]
        expect(minutes).toBe(0);
    });
});

