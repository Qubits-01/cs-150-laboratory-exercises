import { Day, Time, AmOrPm } from "../custom_types";

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

    // GETTERS.
    get days(): Day[] {
        // Return a copy of the days array (not by reference).
        return [...this._days];
    }

    get startTime(): Time {
        // Return a copy of the startTime object (not by "reference-like").
        return { ...this._startTime };
    }

    get endTime(): Time {
        // Return a copy of the endTime object (not by "reference-like").
        return { ...this._endTime };
    }

    // UTILITY METHODS.
    hasConflict(other: DayBasedSchedule): boolean {
        for (let day of this.days) {
            if (other.days.includes(day)) {

            }
        }

        return false;
    }

    /**
     * Intelligently split the days string into an array of Day.
     * Take not that thursday is represented by "Th" (not a two letter string).
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

    private _extractAmOrPm(time: string): AmOrPm | null {
        let amOrPm: string | undefined =
            time.match(/([AP]M)?/g)?.filter(str => str.length > 0)[0];

        return amOrPm === undefined ? null : amOrPm as AmOrPm;
    }

    private _extractHourMinute(time: string): [number, number] {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute]: [string, string | undefined] =
            time.match(hourMinuteRegex) as [string, string | undefined];

        return [parseInt(hour), minute === undefined ? 0 : parseInt(minute)];
    }

    private _buildTimeObj(time: string, amOrPmCB: () => AmOrPm): Time {
        let [hour, minute]: [number, number] = this._extractHourMinute(time);

        return {
            hour: hour,
            minute: minute,
            amOrPm: amOrPmCB()
        };
    }

    private _getMinutesSinceMidnight(time: Time): number {
        let minutes: number = time.hour * 60 + time.minute;

        if (time.amOrPm === "PM" && time.hour !== 12) { minutes += 12 * 60; }
        if (time.amOrPm === "AM" && time.hour === 12) { minutes -= 12 * 60; }

        return minutes;
    }

    // [ FOR TESTING - Proxy Methods ]
    // These methods are only for testing purposes.
    // They are used to test private methods.
    // They should not be used outside of testing.

    /**
     * Proxy method for extractDays.
     * 
     * @param {string} rawDays The raw days input string.
     * @returns {Days[]} An array of Day objects.
     */
    _proxyExtractDays(rawDays: string): Day[] {
        return this._extractDays(rawDays);
    }

    /**
     * Proxy method for extractAmOrPm.
     * 
     * @param {string} time The raw time input string.
     * @returns {AmOrPm | null} The extracted AmOrPm.
     */
    _proxyExtractAmOrPm(time: string): AmOrPm | null {
        return this._extractAmOrPm(time);
    }

    /**
     * Proxy method for extractHourMinute.
     * 
     * @param {string} time The raw time input string.
     * @returns {[number, number]} The extracted hour and minute.
     */
    _proxyExtractHourMinute(time: string): [number, number] {
        return this._extractHourMinute(time);
    }

    /**
     * Proxy method for buildTimeObj.
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
     * 
     * @param {Time} time The Time object.
     * @returns {number} The minutes since midnight.
     */
    _proxyGetMinutesSinceMidnight(time: Time): number {
        return this._getMinutesSinceMidnight(time);
    }
}
