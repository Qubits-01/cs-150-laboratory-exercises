"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const deep_copy_1 = __importDefault(require("../deep_copy"));
/**
 * A singleton class that contains the list of GE courses.
 *
 * That is, we only need one instance of it. This is to prevent
 * repeated file reads and repeated list creations during the
 * program's runtime.
 */
class GECoursesSingleton {
    /**
     * Create a new instance of this class.
     * Will only be called once since this is a singleton class.
     *
     * @param {string} _filePath The path to the ge_courses.txt file.
     * Defaults to "utils/ge_courses_singleton/ge_courses.txt".
     */
    constructor(_filePath = "utils/ge_courses_singleton/ge_courses.txt") {
        this._filePath = _filePath;
        /**
         * Read the list of GE courses from the txt file,
         * split it into lines (by line break),
         * filter out empty lines (if any), trim each line.
         *
         * Also, convert each line to lowercase since the GE courses
         * name are case-insensitive (i.e., "CS 11" is the same as "cs 11"),
         * and split each line into tokens (by space).
         *
         * This will be useful later when we compare the course names.
         */
        this._coursesTokens = (0, fs_1.readFileSync)(this._filePath, "utf8")
            .split("\r\n")
            .filter(line => line.length > 0)
            .map(geCourse => geCourse.trim().toLowerCase().split(" "));
    }
    /**
     * Get the singleton instance of this class.
     *
     * @returns {GECoursesSingleton} The singleton instance of this class.
     */
    static getInstance() {
        if (!GECoursesSingleton._instance) {
            GECoursesSingleton._instance = new GECoursesSingleton();
        }
        return GECoursesSingleton._instance;
    }
    // [ UTILITY METHODS. ]
    /**
     * Check if the given course name is a GE course.
     *
     * @param {string} courseName The course name to check.
     * @returns {boolean} True if the given course name is a GE course;
     * false otherwise.
     */
    isGE(courseName) {
        // Tokenize and convert the course name to lowercase since the GE courses
        // name are case-insensitive (i.e., "CS 11" is the same as "cs 11").
        let courseNameTokens = courseName.toLowerCase().split(" ");
        // Check if any of the geCoursesTokens is in match with the courseNameTokens.
        // Token comparison begins at the leftmost index.
        for (let geCourseTokens of this._coursesTokens) {
            let n = geCourseTokens.length;
            let m = 0;
            for (let [index, geToken] of geCourseTokens.entries()) {
                if (geToken !== courseNameTokens[index]) {
                    break;
                }
                m++;
                if (m === n) {
                    return true;
                }
            }
        }
        return false;
    }
    // [ PROXY METHODS, GETTERS, and OTHERS. ]
    // These are for testing purposes only.
    // They are not meant to be used outside of this class.
    /**
     * Proxy getter for the _filePath property.
     *
     * @returns {string} The path to the ge_courses.txt file.
     */
    get _proxyFilePath() { return this._filePath; }
    /**
     * Getter for the total number of GE courses.
     *
     * @returns {number} The total number of GE courses.
     */
    get _numberOfCourses() { return this._coursesTokens.length; }
    /**
     * Proxy getter for the _coursesTokens property.
     *
     * Returns a deep copy of the _coursesTokens property instead.
     * This is to avoid accidental modification of the _coursesTokens property.
     */
    get _proxyCoursesTokens() {
        return (0, deep_copy_1.default)(this._coursesTokens);
    }
}
/**
 * The singleton instance of this class.
 *
 * @returns {GECoursesSingleton} The singleton instance of this class.
 */
GECoursesSingleton._instance = null;
exports.default = GECoursesSingleton;
