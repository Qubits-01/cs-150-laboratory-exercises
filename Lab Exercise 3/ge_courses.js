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
     * Private constructor to prevent instantiation.
     */
    constructor() { }
}
/**
 * The list of GE courses read from the ge_courses.txt file.
 *
 * Read the list of GE courses from the txt file,
 * split it into lines (and \r - carriage return),
 * and filter out empty lines (if any).
 */
GECourses.COURSES = (0, fs_1.readFileSync)("ge_courses.txt", "utf8")
    .split("\r\n")
    .filter(line => line.length > 0);
exports.default = GECourses;
