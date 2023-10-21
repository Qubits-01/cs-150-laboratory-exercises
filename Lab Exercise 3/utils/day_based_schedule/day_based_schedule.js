"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DayBasedSchedule {
    constructor(_rawDays, _rawTime) {
        this._rawDays = _rawDays;
        this._rawTime = _rawTime;
        // [ Days[]. ]
        this._days = this._extractDays(this._rawDays);
        let [start, end] = this._rawTime.split("-");
        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm = this._extractAmOrPm(end);
        this._endTime = this._buildTimeObj(end, () => endAmOrPm);
        // [ startTime. ]
        this._startTime = this._buildTimeObj(start, () => { var _a; return endAmOrPm === "AM" ? "AM" : (_a = this._extractAmOrPm(start)) !== null && _a !== void 0 ? _a : "PM"; });
    }
    // [ GETTERS. ]
    /**
     * Get the days of the week of this DayBasedSchedule object.
     *
     * @returns {Day[]} An array of Day objects.
     */
    get days() {
        // Return a copy of the days array (not by reference).
        return [...this._days];
    }
    /**
     * Get the start time of this DayBasedSchedule object.
     *
     * @returns {Time} The start Time object.
     */
    get startTime() {
        // Return a copy of the startTime object (not by "reference-like").
        return Object.assign({}, this._startTime);
    }
    /**
     * Get the end time of this DayBasedSchedule object.
     *
     * @returns {Time} The end Time object.
     */
    get endTime() {
        // Return a copy of the endTime object (not by "reference-like").
        return Object.assign({}, this._endTime);
    }
    // [ UTILITY METHODS. ]
    /**
     * Check if this DayBasedSchedule object has a conflict with the given
     * DayBasedSchedule object.
     *
     * @param {DayBasedSchedule} other The other DayBasedSchedule object.
     * @returns {boolean} True if there is a conflict, false otherwise.
     */
    hasConflict(other) {
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
    _extractDays(rawDays) {
        let days = [];
        for (let i = 0; i < rawDays.length; i++) {
            if (rawDays[i] === "T" && rawDays[i + 1] === "h") {
                days.push("Th");
                i++;
            }
            else {
                days.push(rawDays[i]);
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
    _extractAmOrPm(time) {
        var _a;
        let amOrPm = (_a = time.match(/([AP]M)?/g)) === null || _a === void 0 ? void 0 : _a.filter(str => str.length > 0)[0];
        return amOrPm === undefined ? null : amOrPm;
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
    _extractHourMinute(time) {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute] = time.match(hourMinuteRegex);
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
    _buildTimeObj(time, amOrPmCB) {
        let [hour, minute] = this._extractHourMinute(time);
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
    _getMinutesSinceMidnight(time) {
        let minutes = time.hour * 60 + time.minute;
        if (time.amOrPm === "PM" && time.hour !== 12) {
            minutes += 12 * 60;
        }
        if (time.amOrPm === "AM" && time.hour === 12) {
            minutes -= 12 * 60;
        }
        return minutes;
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
    _proxyExtractDays(rawDays) {
        return this._extractDays(rawDays);
    }
    /**
     * Proxy method for extractAmOrPm.
     * For testing purposes only.
     *
     * @param {string} time The raw time input string.
     * @returns {AmOrPm | null} The extracted AmOrPm.
     */
    _proxyExtractAmOrPm(time) {
        return this._extractAmOrPm(time);
    }
    /**
     * Proxy method for extractHourMinute.
     * For testing purposes only.
     *
     * @param {string} time The raw time input string.
     * @returns {[number, number]} The extracted hour and minute.
     */
    _proxyExtractHourMinute(time) {
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
    _proxyBuildTimeObj(time, amOrPmCB) {
        return this._buildTimeObj(time, amOrPmCB);
    }
    /**
     * Proxy method for getMinutesSinceMidnight.
     * For testing purposes only.
     *
     * @param {Time} time The Time object.
     * @returns {number} The minutes since midnight.
     */
    _proxyGetMinutesSinceMidnight(time) {
        return this._getMinutesSinceMidnight(time);
    }
}
exports.default = DayBasedSchedule;
