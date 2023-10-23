"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ge_courses_1 = __importDefault(require("../../../utils/ge_courses/ge_courses"));
(0, globals_1.describe)('[ GECoursesSingleton ]', () => {
    let geCourses;
    (0, globals_1.beforeAll)(() => {
        geCourses = ge_courses_1.default.getInstance();
    });
    (0, globals_1.describe)(' [ _instance ]', () => {
        (0, globals_1.test)('Should be an instance of GECoursesSingleton.', () => {
            // [ Act. ]
            const actual = geCourses instanceof ge_courses_1.default;
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(true);
        });
        (0, globals_1.test)('Should be a singleton.', () => {
            // [ Arrange. ]
            const expected = geCourses;
            // [ Act. ]
            const actual = ge_courses_1.default.getInstance();
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(expected);
        });
    });
    (0, globals_1.describe)('[ _filePath ]', () => {
        (0, globals_1.test)('Should return "utils/ge_courses/ge_courses.txt".', () => {
            // [ Arrange. ]
            const expected = "utils/ge_courses/ge_courses.txt";
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
    });
});
