import { Day, Time, AmOrPm } from "../custom_types";

/**
 * A class that represents a day-based schedule.
 * 
 * It is immutable by design. That is, once a DayBasedSchedule object is created,
 * it cannot be modified. This is to prevent accidental modification
 * of the object's properties. If you want to modify the object,
 * you have to create a new one.
 */
export default class DayBasedSchedule {
    // Should not be modifiable outside this class. Use getters instead.
    private readonly _days: Day[];
    private readonly _startTime: Time;
    private readonly _endTime: Time;

    constructor(
        private readonly _rawDays: string,
        private readonly _rawTime: string,
    ) {
        // [ Days[]. ]
        this._days = this._extractDays(this._rawDays);

        let [start, end]: [string, string] =
            this._rawTime.split("-") as [string, string];

        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm: AmOrPm = this._extractAmOrPm(end) as AmOrPm;
        this._endTime = this._buildTimeObj(end, () => endAmOrPm);

        // [ startTime. ]
        this._startTime = this._buildTimeObj(
            start,
            () => endAmOrPm === "AM" ? "AM" : this._extractAmOrPm(start) ?? "PM"
        );
    }

    // [ GETTERS. ]
    /**
     * Get the days of the week of this DayBasedSchedule object.
     * The returned array is a copy (not by reference).
     * 
     * @returns {Day[]} An array of Day objects.
     */
    get days(): Day[] { return [...this._days]; }

    /**
     * Get the start time of this DayBasedSchedule object.
     * The returned Time object is a copy (not by reference-like).
     * 
     * @returns {Time} The start Time object.
     */
    get startTime(): Time { return { ...this._startTime }; }

    /**
     * Get the end time of this DayBasedSchedule object.
     * The returned Time object is a copy (not by reference-like).
     * 
     * @returns {Time} The end Time object.
     */
    get endTime(): Time { return { ...this._endTime }; }

    // [ UTILITY METHODS. ]
    /**
     * Check if this DayBasedSchedule object has a conflict with the given
     * other DayBasedSchedule object.
     * 
     * @param {DayBasedSchedule} other The other DayBasedSchedule object.
     * @returns {boolean} True if there is a conflict, false otherwise.
     */
    hasConflict(other: DayBasedSchedule): boolean {
        for (let day of this.days) {
            if (other.days.includes(day)) {
                let [thisStartTime, thisEndTime]: [number, number] =
                    this._convertStartEndToMinutes(this);
                let [otherStartTime, otherEndTime]: [number, number] =
                    this._convertStartEndToMinutes(other);

                if (thisStartTime < otherEndTime && thisEndTime > otherStartTime) {
                    return true; // There is a time overlap, indicating a conflict.
                }
            }
        }

        return false;
    }

    /**
     * Intelligently split the days string into an array of Day.
     * Take not that thursday is represented as "Th" 
     * (not a one letter string unlike the other days).
     * 
     * Accepted days string format samples: "MWF", "TTh", "MWFTh"
     * 
     * Also, the returned array is sorted according to the order
     * of the days in the input string.
     * 
     * @param {string} rawDays The raw days input string.
     * @returns {Days[]} An array of Day objects.
     */
    private _extractDays(rawDays: string): Day[] {
        let days: Day[] = [];
        for (let i = 0; i < rawDays.length; i++) {
            if (rawDays[i] === "T" && rawDays[i + 1] === "h") {
                days.push("Th");
                i++;
            } else {
                days.push(rawDays[i] as Day);
            }
        }

        return days;
    }

    /**
     * Extract the AM or PM from the given time string.
     * 
     * Accepted time string format samples: "8:00AM", "08:30AM", "10PM",
     * "9", "3:30"
     * 
     * @param {string} time The raw time input string.
     * @returns {AmOrPm | null} The extracted AmOrPm.
     */
    private _extractAmOrPm(time: string): AmOrPm | null {
        let amOrPm: string | undefined =
            time.match(/([AP]M)?/g)?.filter(str => str.length > 0)[0];

        return amOrPm === undefined ? null : amOrPm as AmOrPm;
    }

    /**
     * Extract the hour and minute from the given time string.
     * 
     * Accepted time string format samples: "8:00AM", "08:30AM", "10PM",
     * "9", "3:30"
     * 
     * @param {string} time The raw time input string.
     * @returns {[number, number]} The extracted hour and minute, respectively.
     */
    private _extractHourMinute(time: string): [number, number] {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute]: [string, string | undefined] =
            time.match(hourMinuteRegex) as [string, string | undefined];

        return [parseInt(hour), minute === undefined ? 0 : parseInt(minute)];
    }

    /**
     * Build a Time object from the given time string and 
     * the given callback function that returns AmOrPm.
     * 
     * Accepted time string format samples: "8:00AM", "08:30AM", "10PM",
     * "9", "3:30"
     * 
     * @param {string} time The raw time input string.
     * @param {AmOrPm} amOrPmCB The callback function that returns AmOrPm.
     * @returns {Time} The built Time object.
     */
    private _buildTimeObj(time: string, amOrPmCB: () => AmOrPm): Time {
        let [hour, minute]: [number, number] = this._extractHourMinute(time);

        return {
            hour: hour,
            minute: minute,
            amOrPm: amOrPmCB()
        };
    }

    /**
     * Get the minutes since midnight of the given Time object.
     * 
     * @param {Time} time The Time object.
     * @returns {number} The number of minutes since midnight.
     */
    private _getMinutesSinceMidnight(time: Time): number {
        let minutes: number = time.hour * 60 + time.minute;

        if (time.amOrPm === "PM" && time.hour !== 12) { minutes += 12 * 60; }
        if (time.amOrPm === "AM" && time.hour === 12) { minutes -= 12 * 60; }

        return minutes;
    }

    /**
     * Convert the given DayBasedSchedule object's start and end time
     * to minutes since midnight.
     * 
     * @param {DayBasedSchedule} sched The DayBasedSchedule object.
     * @returns {[number, number]} The start and end minutes since midnight,
     */
    private _convertStartEndToMinutes(sched: DayBasedSchedule): [number, number] {
        return [
            this._getMinutesSinceMidnight(sched.startTime),
            this._getMinutesSinceMidnight(sched.endTime)
        ];
    }

    // [ FOR TESTING - Proxy Methods ]
    // These methods are only for testing purposes.
    // They are used to test private methods.
    // They should not be used outside of testing.

    /**
     * Proxy method for extractDays.
     * For testing purposes only.
     * 
     * @param {string} rawDays The raw days input string.
     * @returns {Days[]} An array of Day objects.
     */
    _proxyExtractDays(rawDays: string): Day[] {
        return this._extractDays(rawDays);
    }

    /**
     * Proxy method for extractAmOrPm.
     * For testing purposes only.
     * 
     * @param {string} time The raw time input string.
     * @returns {AmOrPm | null} The extracted AmOrPm.
     */
    _proxyExtractAmOrPm(time: string): AmOrPm | null {
        return this._extractAmOrPm(time);
    }

    /**
     * Proxy method for extractHourMinute.
     * For testing purposes only.
     * 
     * @param {string} time The raw time input string.
     * @returns {[number, number]} The extracted hour and minute.
     */
    _proxyExtractHourMinute(time: string): [number, number] {
        return this._extractHourMinute(time);
    }

    /**
     * Proxy method for buildTimeObj.
     * For testing purposes only.
     * 
     * @param {string} time The raw time input string.
     * @param {() => AmOrPm} amOrPmCB The callback function that returns AmOrPm.
     * @returns {Time} The built Time object.
     */
    _proxyBuildTimeObj(time: string, amOrPmCB: () => AmOrPm): Time {
        return this._buildTimeObj(time, amOrPmCB);
    }

    /**
     * Proxy method for getMinutesSinceMidnight.
     * For testing purposes only.
     * 
     * @param {Time} time The Time object.
     * @returns {number} The minutes since midnight.
     */
    _proxyGetMinutesSinceMidnight(time: Time): number {
        return this._getMinutesSinceMidnight(time);
    }

    /**
     * Proxy method for convertStartEndToMinutes.
     * For testing purposes only.
     * 
     * @param {DayBasedSchedule} sched The DayBasedSchedule object.
     * @returns {[number, number]} The start and end minutes since midnight,
     */
    _proxyConvertStartEndToMinutes(sched: DayBasedSchedule): [number, number] {
        return this._convertStartEndToMinutes(sched);
    };
}
