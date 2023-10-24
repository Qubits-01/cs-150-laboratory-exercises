"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_copy_1 = __importDefault(require("../deep_copy"));
/**
 * A class that represents a day-based schedule.
 *
 * It is immutable by design. That is, once a DayBasedSchedule object is created,
 * it cannot be modified. This is to prevent accidental modification
 * of the object's properties. If you want to modify the object,
 * you have to create a new one.
 */
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
    // [ UTILITY METHODS. ]
    /**
     * Check if this DayBasedSchedule object has a conflict with the given
     * other DayBasedSchedule object.
     *
     * @param {DayBasedSchedule} other The other DayBasedSchedule object.
     * @returns {boolean} True if there is a conflict, false otherwise.
     */
    hasConflict(other) {
        for (let day of this._days) {
            if (other._days.includes(day)) {
                let [thisStartTime, thisEndTime] = this._convertStartEndToMinutes(this);
                let [otherStartTime, otherEndTime] = this._convertStartEndToMinutes(other);
                if (thisStartTime < otherEndTime && thisEndTime > otherStartTime) {
                    return true; // There is a time overlap, indicating a conflict.
                }
            }
        }
        return false;
    }
    /**
     * Create a copy of this DayBasedSchedule object with the given
     * rawDays and rawTime (optional).
     *
     * @param {string} rawDays The raw days input string.
     * @param {string} rawTime The raw time input string.
     * @returns {DayBasedSchedule} The copied DayBasedSchedule object.
     */
    copyWith(rawDays, rawTime) {
        return new DayBasedSchedule(rawDays !== null && rawDays !== void 0 ? rawDays : this._rawDays, rawTime !== null && rawTime !== void 0 ? rawTime : this._rawTime);
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
     * @example
     * //* Accepted time string format samples:
     * "8:00AM", "08:30AM", "10PM",
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
     * @example
     * //* Accepted time string format samples:
     * "8:00AM", "08:30AM", "10PM",
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
     * @example
     * //* Accepted time string format samples:
     * "8:00AM", "08:30AM", "10PM",
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
    /**
     * Convert the given DayBasedSchedule object's start and end time
     * to minutes since midnight.
     *
     * @param {DayBasedSchedule} sched The DayBasedSchedule object.
     * @returns {[number, number]} The start and end minutes since midnight,
     */
    _convertStartEndToMinutes(sched) {
        return [
            this._getMinutesSinceMidnight(sched._startTime),
            this._getMinutesSinceMidnight(sched._endTime)
        ];
    }
    // [ PROXY METHODS, GETTERS, and OTHERS. ]
    // These methods are only for testing purposes.
    // They are used to test private methods.
    // They should not be used outside of testing.
    /**
     * Proxy getter for the _days property.
     * The returned array is a copy (not by reference).
     *
     * @returns {Day[]} An array of Day objects.
     */
    get _proxyDays() { return (0, deep_copy_1.default)(this._days); }
    /**
     * Proxy getter for the _startTime property.
     * The returned Time object is a copy (not by reference-like).
     *
     * @returns {Time} The start Time object.
     */
    get _proxyStartTime() { return (0, deep_copy_1.default)(this._startTime); }
    /**
     * Proxy getter for the _endTime property.
     * The returned Time object is a copy (not by reference-like).
     *
     * @returns {Time} The end Time object.
     */
    get _proxyEndTime() { return (0, deep_copy_1.default)(this._endTime); }
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
    /**
     * Proxy method for convertStartEndToMinutes.
     * For testing purposes only.
     *
     * @param {DayBasedSchedule} sched The DayBasedSchedule object.
     * @returns {[number, number]} The start and end minutes since midnight,
     */
    _proxyConvertStartEndToMinutes(sched) {
        return this._convertStartEndToMinutes(sched);
    }
    ;
}
exports.default = DayBasedSchedule;
