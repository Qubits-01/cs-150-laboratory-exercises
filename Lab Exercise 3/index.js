"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWithConflict = exports.getGEs = exports.parseInput = void 0;
// Import the default export.
const day_based_schedule_1 = __importDefault(require("./utils/day_based_schedule/day_based_schedule"));
const ge_courses_1 = __importDefault(require("./utils/ge_courses/ge_courses"));
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
    constructor(_completeName, _dayBasedSchedules, _geCoursesSingleton = ge_courses_1.default.getInstance()) {
        this._completeName = _completeName;
        this._dayBasedSchedules = _dayBasedSchedules;
        this._geCoursesSingleton = _geCoursesSingleton;
    }
    // [ GETTERS. ]
    /**
     * Get the complete name of this Section object.
     *
     * For definitiveness sake, the complete name is the course name and section
     * name combined (e.g., "CS 11 CLASS 1" - CS 11 is the course name
     * and CLASS 1 is the section name).
     *
     * @returns {string} The complete name of this Section object.
     */
    get completeName() { return this._completeName; }
    /**
     * Get the day based schedules of this Section object.
     * The returned array is a copy (not by reference).
     *
     * @returns {DayBasedSchedule[]} An array of DayBasedSchedule objects.
     */
    get dayBasedSchedules() {
        // Return a copy of the dayBasedSchedules array (not by reference).
        // Note that the DayBasedSchedule objects are still by reference.
        // This is still safe since the DayBasedSchedule objects are immutable
        // by design.
        return [...this._dayBasedSchedules];
    }
    // [ UTILITY METHODS. ]
    /**
     * Check if this Section object has a scheduling conflict with the other
     * Section object.
     *
     * @param {Section} other The other Section object.
     * @returns {boolean} True if this Section object has a scheduling conflict
     * with the other Section object; false otherwise.
     */
    hasConflict(other) {
        // Check if the other section has the same day-based schedule
        // as this section.
        for (let thisSched of this.dayBasedSchedules) {
            for (let otherSched of other.dayBasedSchedules) {
                if (thisSched.hasConflict(otherSched)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Check if this Section object is a GE course.
     *
     * @returns {boolean} True if this Section object is a GE course; false otherwise.
     * @see GECoursesSingleton.isGE
     */
    isGE() { return this._geCoursesSingleton.isGE(this.completeName); }
    // TODO: Will ask sir about this. The sample input string has no 
    // "slots" related data.
    /**
     * Check if this Section object has slots.
     *
     * @returns {boolean} True if this Section object has slots; false otherwise.
     */
    hasSlots() {
        return true;
    }
}
exports.default = Section;
/**
 * This function parses the input string and returns an array of Section objects.
 *
 * That is, parseInput takes in a string and tries to create an array containing
 * Section objects corresponding to each entry in the input string.
 *
 * @param {string} input The input string.
 * @returns {Section[]} An array of Section objects.
 */
function parseInput(input) {
    if (input === "") {
        return [];
    }
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
            dayBasedSchedObjs.push(new day_based_schedule_1.default(days, time));
        }
        // [ Build the Section object using the DayBasedSchedule object. ]
        sections.push(new Section(completeName.trim(), dayBasedSchedObjs));
    });
    return sections;
}
exports.parseInput = parseInput;
/**
 * This function should return a new array of Section objects with the same
 * sort order of the input array, but with all sections that correspond to
 * GEs filtered out.
 *
 * @param {Section[]} sections The array of Section objects.
 * @returns {Section[]} The filtered array of Section objects.
 */
function getGEs(sections) {
    return [];
}
exports.getGEs = getGEs;
/**
 * This function should return a new array of Section objects with at
 * least one scheduling conflict with any of the other Section objects
 * in the input array (apart from itself).
 *
 * @param {Section[]} sections The array of Section objects.
 * @returns {Section[]} The filtered array of Section objects.
 */
function getAllWithConflict(sections) {
    return [];
}
exports.getAllWithConflict = getAllWithConflict;
