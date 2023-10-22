import { describe, expect, test, beforeAll } from '@jest/globals';
import GECourses from '../../../utils/ge_courses/ge_courses';

describe('[ GECourses ]', () => {
    describe('[ COURSES_FILE_PATH ]', () => {
        test('Should return "utils/ge_courses/ge_courses.txt".', () => {
            // [ Act. ]
            const actual: string = GECourses.COURSES_FILE_PATH;

            // [ Assert. ]
            const EXPECTED_COURSES_FILE_PATH = "utils/ge_courses/ge_courses.txt";
            expect(actual).toBe(EXPECTED_COURSES_FILE_PATH);
        });
    });

    describe('[ COURSES ]', () => {
        test('Should return a non-empty array.', () => {
            // [ Act. ]
            const actual: string[] = GECourses.COURSES;

            // [ Assert. ]
            expect(actual.length).toBeGreaterThan(0);
        });

        test('Should return an array of strings.', () => {
            // [ Act. ]
            const actual: string[] = GECourses.COURSES;

            // [ Assert. ]
            for (let course of actual) {
                expect(typeof course).toBe("string");
            }
        });

        // Should return 82 courses.
        test('Should return 82 courses.', () => {
            // [ Act. ]
            const actual: string[] = GECourses.COURSES;

            // [ Assert. ]
            const EXPECTED_COURSES_COUNT = 82;
            expect(actual.length).toBe(EXPECTED_COURSES_COUNT);
        });
    });
});

