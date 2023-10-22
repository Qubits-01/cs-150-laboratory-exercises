"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/**
 * A class that contains the list of GE courses.
 * It is meant to be used as a static class.
 * That is, it should not be instantiated.
 */
class GECourses {
    /**
     * Private constructor to prevent accidental instantiation.
     */
    constructor() { }
}
/**
 * The path to the ge_courses.txt file.
 */
GECourses.COURSES_FILE_PATH = "utils/ge_courses/ge_courses.txt";
/**
 * The list of GE courses read from the ge_courses.txt file.
 *
 * Read the list of GE courses from the txt file,
 * split it into lines (by line break),
 * filter out empty lines (if any), trim each line.
 *
 * Also, convert each line to lowercase since the GE courses
 * name are case-insensitive (i.e., "CS 11" is the same as "cs 11").
 * This will be useful later when we compare the course names.
 */
GECourses.COURSES = (0, fs_1.readFileSync)(GECourses.COURSES_FILE_PATH, "utf8")
    .split("\r\n")
    .filter(line => line.length > 0)
    .map(geCourse => geCourse.trim().toLowerCase());
exports.default = GECourses;
