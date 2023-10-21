"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ge_courses_1 = __importDefault(require("../../../utils/ge_courses/ge_courses"));
(0, globals_1.describe)('[ GECourses ]', () => {
    (0, globals_1.describe)('[ COURSES_FILE_PATH ]', () => {
        (0, globals_1.test)('Should return "utils/ge_courses/ge_courses.txt".', () => {
            // [ Arrange. ]
            const EXPECTED_COURSES_FILE_PATH = "utils/ge_courses/ge_courses.txt";
            // [ Act. ]
            const actual = ge_courses_1.default.COURSES_FILE_PATH;
            // [ Assert. ]
            (0, globals_1.expect)(actual).toBe(EXPECTED_COURSES_FILE_PATH);
        });
    });
    (0, globals_1.describe)('COURSES', () => {
        (0, globals_1.test)('Should return a non-empty array.', () => {
            // [ Act. ]
            const actual = ge_courses_1.default.COURSES;
            // [ Assert. ]
            (0, globals_1.expect)(actual.length).toBeGreaterThan(0);
        });
    });
});
