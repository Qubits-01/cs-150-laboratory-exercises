import { readFileSync } from "fs";

/**
 * A singleton class that contains the list of GE courses.
 * 
 * That is, we only need one instance of it. This is to prevent
 * repeated file reads and repeated list creations during the
 * program's runtime.
 */
export default class GECoursesSingleton {
    /**
     * The singleton instance of this class.
     * 
     * @returns {GECoursesSingleton} The singleton instance of this class.
     */
    private static _instance: GECoursesSingleton | null = null;

    /**
     * The list of GE courses read from the ge_courses.txt file.
     * 
     * @returns {string[]} The list of GE courses.
     */
    private readonly _courses: string[];

    /**
     * Create a new instance of this class.
     * Will only be called once since this is a singleton class.
     * 
     * @param {string} _filePath The path to the ge_courses.txt file.
     * Defaults to "utils/ge_courses/ge_courses.txt".
     */
    private constructor(
        private readonly _filePath: string = "utils/ge_courses/ge_courses.txt"
    ) {
        /**
         * Read the list of GE courses from the txt file,
         * split it into lines (by line break),
         * filter out empty lines (if any), trim each line.
         * 
         * Also, convert each line to lowercase since the GE courses
         * name are case-insensitive (i.e., "CS 11" is the same as "cs 11").
         * This will be useful later when we compare the course names.
         */
        this._courses = readFileSync(this._filePath, "utf8")
            .split("\r\n")
            .filter(line => line.length > 0)
            .map(geCourse => geCourse.trim().toLowerCase());
    }

    /**
     * Get the singleton instance of this class.
     * 
     * @returns {GECoursesSingleton} The singleton instance of this class.
     */
    static getInstance(): GECoursesSingleton {
        if (!GECoursesSingleton._instance) {
            GECoursesSingleton._instance = new GECoursesSingleton();
        }

        return GECoursesSingleton._instance;
    }

    // [ GETTERS. ]
    /**
     * Get the path to the ge_courses.txt file.
     * 
     * @returns {string} The path to the file.
     * Defaults to "utils/ge_courses/ge_courses.txt".
     */
    get filePath(): string { return this._filePath; }

    /**
     * Get the list of GE courses.
     * The returned array is a copy (not by reference).
     * 
     * @returns {string[]} The list of GE courses.
     */
    get courses(): string[] { return [...this._courses]; }

    /**
     * The number of GE courses.
     * This is useful when we want to iterate over the list of GE courses.
     * 
     * @example
     * for (let i = 0; i < GECourses.COURSES_LENGTH; i++) {
     *    // Do something with GECourses.COURSES[i].
     * } 
     */
    get numberOfCourses(): number { return this._courses.length; }

    // [ UTILITY METHODS. ]
    /**
     * Check if the given course name is a GE course.
     * 
     * @param {string} courseName The course name to check.
     * @returns {boolean} True if the given course name is a GE course;
     * false otherwise.
     */
    static isGE(courseName: string): boolean {
        for (let geCourse of GECoursesSingleton.getInstance().courses) {
            if (courseName.toLowerCase().includes(geCourse)) {
                return true;
            }
        }

        return false;
    }
}

let geCourses = GECoursesSingleton.getInstance();
console.log(geCourses);
