import { describe, expect, test, beforeAll } from '@jest/globals';
import GECoursesSingleton from '../../../utils/ge_courses/ge_courses';

describe('[ GECoursesSingleton ]', () => {
    let geCourses: GECoursesSingleton;
    beforeAll(() => {
        geCourses = GECoursesSingleton.getInstance();
    });

    describe(' [ _instance ]', () => {
        test('Should be an instance of GECoursesSingleton.', () => {
            // [ Act. ]
            const actual: boolean = geCourses instanceof GECoursesSingleton;

            // [ Assert. ]
            expect(actual).toBe(true);
        });

        test('Should be a singleton.', () => {
            // [ Arrange. ]
            const expected: GECoursesSingleton = geCourses;

            // [ Act. ]
            const actual: GECoursesSingleton = GECoursesSingleton.getInstance();

            // [ Assert. ]
            expect(actual).toBe(expected);
        });
    });

    describe('[ _filePath ]', () => {
        test('Should return "utils/ge_courses/ge_courses.txt".', () => {
            // [ Arrange. ]
            const expected: string = "utils/ge_courses/ge_courses.txt";

            // [ Act. ]
            const actual: string = geCourses._proxyFilePath;

            // [ Assert. ]
            expect(actual).toBe(expected);
        });

        test('Should not be an empty string.', () => {
            // [ Act. ]
            const actual: string = geCourses._proxyFilePath;

            // [ Assert. ]
            expect(actual.length).toBeGreaterThan(0);
        });
    });

    describe('[ _coursesTokens ]', () => {
        test('Should return a non-empty array.', () => {
            // [ Act. ]
            const actual: string[][] = geCourses._proxyCoursesTokens;

            // [ Assert. ]
            expect(actual.length).toBeGreaterThan(0);
        });

        test('Should return a 2D array of strings', () => {
            // [ Act. ]
            const actual: string[][] = geCourses._proxyCoursesTokens;

            // [ Assert. ]
            expect(
                actual.every(
                    courseTokens => courseTokens.every(
                        token => typeof token === "string"
                    )
                )
            ).toBe(true);
        });

        test(`Should return the correct number of GE courses.`, () => {
            // [ Act. ]
            const actual: string[][] = geCourses._proxyCoursesTokens;

            // [ Assert. ]
            expect(actual.length).toBe(geCourses._numberOfCourses);
        });
    });

    describe('[ isGE ]', () => {

    });
});

