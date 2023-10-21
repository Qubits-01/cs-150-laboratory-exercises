import { describe, expect, test, beforeAll } from '@jest/globals';
import GECourses from '../../../utils/ge_courses/ge_courses';

describe('[ GECourses ]', () => {
    describe('[ COURSES_FILE_PATH ]', () => {
        test('Should return "utils/ge_courses/ge_courses.txt".', () => {
            // [ Arrange. ]
            const EXPECTED_COURSES_FILE_PATH = "utils/ge_courses/ge_courses.txt";

            // [ Act. ]
            const actual: string = GECourses.COURSES_FILE_PATH;

            // [ Assert. ]
            expect(actual).toBe(EXPECTED_COURSES_FILE_PATH);
        });
    });

    describe('COURSES', () => {
        test('Should return a non-empty array.', () => {
            // [ Act. ]
            const actual: string[] = GECourses.COURSES;

            // [ Assert. ]
            expect(actual.length).toBeGreaterThan(0);
        });
    });
});

