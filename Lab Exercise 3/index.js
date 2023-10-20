"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInput = void 0;
// Import the default GECourses static class.
const ge_courses_1 = __importDefault(require("./utils/ge_courses/ge_courses"));
const sample_input = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
CS 12 LAB 1,F 1-4PM lab TL3
CS 12 LEC 2,TTh 1-2PM lec P&G
CS 31 THY2,TTh 4-5:30PM lec CLR3`;
console.log(ge_courses_1.default.COURSES);
console.log(ge_courses_1.default.COURSES.length);
class DayBasedSchedule {
    constructor(_days, _time) {
        this._days = _days;
        this._time = _time;
        let [start, end] = _time.split("-");
        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm = this.extractAmOrPm(end);
        let [endHour, endMinute] = this.extractHourMinute(end);
        this.endTime = {
            hour: endHour,
            minute: endMinute,
            amOrPm: endAmOrPm
        };
        // [ startTime. ]
        let startAmOrPm;
        if (endAmOrPm === "AM") {
            startAmOrPm = "AM";
        }
        else {
            let temp = this.extractAmOrPm(start);
            startAmOrPm = temp === null ? "PM" : temp;
        }
        let [startHour, startMinute] = this.extractHourMinute(end);
        this.startTime = {
            hour: startHour,
            minute: startMinute,
            amOrPm: startAmOrPm
        };
    }
    // GETTERS.
    get days() {
        // Intelligently split the days string into an array of Day.
        // Take not that thursday is represented by "Th" (not a two letter string).
        let temp = [];
        for (let i = 0; i < this._days.length; i++) {
            if (this._days[i] === "T" && this._days[i + 1] === "h") {
                temp.push("Th");
                i++;
            }
            else {
                temp.push(this._days[i]);
            }
        }
        return temp;
    }
    // UTILITY METHODS.
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
}
/**
 * This class represents a Section (w/ day-based schedules).
 *
 * It is immutable by design. That is, once a Section object is created,
 * it cannot be modified. This is to prevent accidental modification
 * of the object's properties. If you want to modify the object,
 * you have to create a new one. This is also why the properties
 * are set to private and readonly.
 */
class Section {
    constructor(_completeName, _dayBasedSchedules) {
        this._completeName = _completeName;
        this._dayBasedSchedules = _dayBasedSchedules;
    }
    hasConflict(other) {
        return false;
    }
    hasSlots() {
        return false;
    }
    // GETTERS.
    /**
     * Returns the course name of this Section object.
     */
    get courseName() {
        // Get the string/s from first to second to the last
        // and then join them with a space.
        return this._completeName.split(" ").slice(0, -1).join(" ");
    }
    /**
     * Returns the section name of this Section object
     */
    get sectionName() {
        // Get the last string and return it.
        return this._completeName.split(" ").slice(-1)[0];
    }
}
function parseInput(input) {
    let sections = [];
    input.split("\n").forEach(line => {
        // Clean the line.
        line = line.trim();
        // Split the input into two parts: the complete name and
        // the day-based schedules.
        let [completeName, dayBasedScheds] = line.split(",");
        // [ Build the DayBasedSchedule object/s. ]
        let dayBasedSchedObjs = [];
        for (let sched of dayBasedScheds.split(";")) {
            // Split the sched into two parts: the day/s and the time interval.
            let [days, time] = sched.trim().split(" ");
            dayBasedSchedObjs.push(new DayBasedSchedule(days, time));
        }
        // [ Build the Section object using the DayBasedSchedule object. ]
        sections.push(new Section(completeName, dayBasedSchedObjs));
    });
    return sections;
}
exports.parseInput = parseInput;
// export function getGEs(sections: Section[]): Section[] {
//     // ...
// }
// export function getAllWithConflict(sections: Section[]): Section[] {
//     // ...
// }
// TESTING CODE.
// Section class.
const sampleSection1 = new Section("CS 153 THU");
console.log(sampleSection1.courseName);
console.log(sampleSection1.sectionName);
const sampleSection2 = new Section("DRMAPS THU");
console.log(sampleSection2.courseName);
console.log(sampleSection2.sectionName);
const sampleSection3 = new Section("Soc Sci 1 THU");
console.log(sampleSection3.courseName);
console.log(sampleSection3.sectionName);
// DayBasedSchedule class.
const sampleDayBasedSchedule1 = new DayBasedSchedule("TTh", "10-11:30AM");
console.log(sampleDayBasedSchedule1.days);
const sampleDayBasedSchedule2 = new DayBasedSchedule("MTWThFS", "10-11:30AM");
console.log(sampleDayBasedSchedule2.days);
const sampleDayBasedSchedule3 = new DayBasedSchedule("Th", "10-11:30AM");
console.log(sampleDayBasedSchedule3.days);
const sampleDayBasedSchedule4 = new DayBasedSchedule("MT", "10-11:30AM");
console.log(sampleDayBasedSchedule4.days);
const sampleDayBasedSchedule5 = new DayBasedSchedule("ThFS", "10-11:30AM");
console.log(sampleDayBasedSchedule5.days);
// Whole program.
parseInput(sample_input);
