"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const globals_1 = require("@jest/globals");
const ge_courses_singleton_1 = __importDefault(require("../../../utils/ge_courses_singleton/ge_courses_singleton"));
(0, globals_1.describe)('[ GECoursesSingleton ]', () => {
    let geCourses;
    (0, globals_1.beforeAll)(() => {
        geCourses = ge_courses_singleton_1.default.getInstance();
    });
    (0, globals_1.describe)(' [ _instance ]', () => {
        (0, globals_1.test)('Should be an instance of GECoursesSingleton.', () => {
            // [ Act. ]
            const actual = geCourses instanceof ge_courses_singleton_1.default;
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        (0, globals_1.test)('Should be a singleton.', () => {
            // [ Arrange. ]
            const expected = geCourses;
            // [ Act. ]
            const actual = ge_courses_singleton_1.default.getInstance();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(expected);
        });
    });
    (0, globals_1.describe)('[ _filePath ]', () => {
        (0, globals_1.test)('Should return "utils/ge_courses_singleton/ge_courses.txt".', () => {
            // [ Arrange. ]
            const expected = "utils/ge_courses_singleton/ge_courses.txt";
            // [ Act. ]
            const actual = geCourses._proxyFilePath;
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(expected);
        });
        (0, globals_1.test)('Should not be an empty string.', () => {
            // [ Act. ]
            const actual = geCourses._proxyFilePath;
            // [ Assert. ]
            (0, globals_1.expect)(actual.length).toBeGreaterThan(0);
        });
    });
    (0, globals_1.describe)('[ _coursesTokens ]', () => {
        (0, globals_1.test)('Should return a non-empty array.', () => {
            // [ Act. ]
            const actual = geCourses._proxyCoursesTokens;
            // [ Assert. ]
            (0, globals_1.expect)(actual.length).toBeGreaterThan(0);
        });
        (0, globals_1.test)('Should return a 2D array of strings', () => {
            // [ Act. ]
            const actual = geCourses._proxyCoursesTokens;
            // [ Assert. ]
            (0, globals_1.expect)(actual.every(courseTokens => courseTokens.every(token => typeof token === "string"))).toBe(true);
        });
        (0, globals_1.test)(`Should return the correct number of GE courses.`, () => {
            // [ Act. ]
            const actual = geCourses._proxyCoursesTokens;
            // [ Assert. ]
            (0, globals_1.expect)(actual.length).toBe(geCourses._numberOfCourses);
        });
    });
    (0, globals_1.describe)('[ isGE ]', () => {
        (0, globals_1.test)('Should return false for CS 150 Lab 4.', () => {
            // [ Arrange. ]
            const courseName = "CS 150 Lab 4";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for CS 11.', () => {
            // [ Arrange. ]
            const courseName = "CS 11";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return true for Anthro 10 S.', () => {
            // [ Arrange. ]
            const courseName = "Anthro 10";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        (0, globals_1.test)('Should return false for CS 153 THU.', () => {
            // [ Arrange. ]
            const courseName = "CS 153 THU";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for CS 11 CLASS 1.', () => {
            // [ Arrange. ]
            const courseName = "CS 11 CLASS 1";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for CS 12 LAB 1.', () => {
            // [ Arrange. ]
            const courseName = "CS 12 LAB 1";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for CS 12 LEC 2.', () => {
            // [ Arrange. ]
            const courseName = "CS 12 LEC 2";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return false for CS 31 THY2.', () => {
            // [ Arrange. ]
            const courseName = "CS 31 THY2";
            // [ Act. ]
            const actual = geCourses.isGE(courseName);
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
        (0, globals_1.test)('Should return true for all of the GE courses in ge_courses.txt.', () => {
            // [ Act. ]
            const actual = geCourses._proxyCoursesTokens.every(courseTokens => geCourses.isGE(courseTokens.join(" ")));
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        // Should return false for all of the entries in random_section_names.txt.
        (0, globals_1.test)('Should return false for all of the entries in random_section_names.txt.', () => {
            // [ Arrange. ]
            const randomSectionNames = (0, fs_1.readFileSync)("tests/fixtures/random_section_names.txt", "utf8")
                .split("\r\n")
                .filter(line => line.length > 0)
                .map(sectionName => sectionName.trim());
            // [ Act. ]
            const actual = randomSectionNames.every(sectionName => geCourses.isGE(sectionName));
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(false);
        });
    });
});
