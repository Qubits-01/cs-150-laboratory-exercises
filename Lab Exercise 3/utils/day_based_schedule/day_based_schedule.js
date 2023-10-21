"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DayBasedSchedule {
    constructor(_rawDays, _rawTime) {
        this._rawDays = _rawDays;
        this._rawTime = _rawTime;
        // [ Days[]. ]
        this._days = this.extractDays(this._rawDays);
        let [start, end] = this._rawTime.split("-");
        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm = this.extractAmOrPm(end);
        this._endTime = this.buildTimeObj(end, () => endAmOrPm);
        // [ startTime. ]
        this._startTime = this.buildTimeObj(start, () => { var _a; return endAmOrPm === "AM" ? "AM" : (_a = this.extractAmOrPm(start)) !== null && _a !== void 0 ? _a : "PM"; });
    }
    // GETTERS.
    get days() {
        // Return a copy of the days array (not by reference).
        return [...this._days];
    }
    get startTime() {
        // Return a copy of the startTime object (not by "reference-like").
        return Object.assign({}, this._startTime);
    }
    get endTime() {
        // Return a copy of the endTime object (not by "reference-like").
        return Object.assign({}, this._endTime);
    }
    // UTILITY METHODS.
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
    extractDays(rawDays) {
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
    extractAmOrPm(time) {
        var _a;
        let amOrPm = (_a = time.match(/([AP]M)?/g)) === null || _a === void 0 ? void 0 : _a.filter(str => str.length > 0)[0];
        return amOrPm === undefined ? null : amOrPm;
    }
    extractHourMinute(time) {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute] = time.match(hourMinuteRegex);
        return [parseInt(hour), minute === undefined ? 0 : parseInt(minute)];
    }
    buildTimeObj(time, amOrPmCB) {
        let [hour, minute] = this.extractHourMinute(time);
        return {
            hour: hour,
            minute: minute,
            amOrPm: amOrPmCB()
        };
    }
    getMinutesSinceMidnight(time) {
        let minutes = time.hour * 60 + time.minute;
        if (time.amOrPm === "PM" && time.hour !== 12) {
            minutes += 12 * 60;
        }
        if (time.amOrPm === "AM" && time.hour === 12) {
            minutes -= 12 * 60;
        }
        return minutes;
    }
}
exports.default = DayBasedSchedule;
