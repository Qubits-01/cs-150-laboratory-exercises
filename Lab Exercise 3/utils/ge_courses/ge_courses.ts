import { readFileSync } from "fs";
import deepCopy from "../deep_copy";

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
     * The list of GE courses tokens.
     * For example: 
     * [["cs", "11"], ["cs", "12"], ["soc", "sci", "2"], ...].
     * 
     * @returns {string[][]} The list of GE courses tokens.
     * A 2D array of strings.
     */
    private readonly _coursesTokens: string[][];

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
         * name are case-insensitive (i.e., "CS 11" is the same as "cs 11"),
         * and split each line into tokens (by space).
         * 
         * This will be useful later when we compare the course names.
         */
        this._coursesTokens = readFileSync(this._filePath, "utf8")
            .split("\r\n")
            .filter(line => line.length > 0)
            .map(geCourse => geCourse.trim().toLowerCase().split(" "));
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
    // [ UTILITY METHODS. ]
    /**
     * Check if the given course name is a GE course.
     * 
     * @param {string} courseName The course name to check.
     * @returns {boolean} True if the given course name is a GE course;
     * false otherwise.
     */
    static isGE(courseName: string): boolean {
        return true;
    }

    // [ PROXY METHODS, GETTERS, and OTHERS. ]
    // These are for testing purposes only.
    // They are not meant to be used outside of this class.

    /**
     * Proxy getter for the _filePath property.
     * 
     * @returns {string} The path to the ge_courses.txt file.
     */
    get _proxyFilePath(): string { return this._filePath; }

    /**
     * Getter for the total number of GE courses.
     * 
     * @returns {number} The total number of GE courses.
     */
    get _numberOfCourses(): number { return this._coursesTokens.length; }

    /**
     * Proxy getter for the _coursesTokens property.
     * 
     * Returns a deep copy of the _coursesTokens property instead.
     * This is to avoid accidental modification of the _coursesTokens property.
     */
    get _proxyCoursesTokens(): string[][] {
        return deepCopy<string[][]>(this._coursesTokens);
    }

}
