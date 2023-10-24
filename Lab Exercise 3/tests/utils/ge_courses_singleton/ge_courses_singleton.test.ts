import { readFileSync } from "fs";
import { describe, expect, test, beforeAll } from '@jest/globals';
import GECoursesSingleton from '../../../utils/ge_courses_singleton/ge_courses_singleton';

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
        test('Should return "utils/ge_courses_singleton/ge_courses.txt".', () => {
            // [ Arrange. ]
            const expected: string = "utils/ge_courses_singleton/ge_courses.txt";

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
        test('Should return false for CS 150 Lab 4.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 150 Lab 4";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return false for CS 11.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 11";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return true for Anthro 10 S.', () => {
            // [ Arrange. ]
            const courseName: string = "Anthro 10";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(true);
        });

        test('Should return false for CS 153 THU.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 153 THU";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return false for CS 11 CLASS 1.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 11 CLASS 1";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return false for CS 12 LAB 1.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 12 LAB 1";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return false for CS 12 LEC 2.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 12 LEC 2";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return false for CS 31 THY2.', () => {
            // [ Arrange. ]
            const courseName: string = "CS 31 THY2";

            // [ Act. ]
            const actual: boolean = geCourses.isGE(courseName);

            // [ Assert. ]
            expect(actual).toBe(false);
        });

        test('Should return true for all of the GE courses in ge_courses.txt.', () => {
            // [ Act. ]
            const actual: boolean = geCourses._proxyCoursesTokens.every(
                courseTokens => geCourses.isGE(courseTokens.join(" "))
            );

            // [ Assert. ]
            expect(actual).toBe(true);
        });

        // Should return false for all of the entries in random_section_names.txt.
        test(
            'Should return false for all of the entries in random_section_names.txt.',
            () => {
                // [ Arrange. ]
                const randomSectionNames: string[] =
                    readFileSync("tests/fixtures/random_section_names.txt", "utf8")
                        .split("\r\n")
                        .filter(line => line.length > 0)
                        .map(sectionName => sectionName.trim());

                // [ Act. ]
                const actual: boolean = randomSectionNames.every(
                    sectionName => geCourses.isGE(sectionName)
                );

                // [ Assert. ]
                expect(actual).toBe(false);
            }
        );
    });
});
