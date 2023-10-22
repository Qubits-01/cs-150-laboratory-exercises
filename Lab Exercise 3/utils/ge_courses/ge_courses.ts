import { readFileSync } from "fs";

/**
 * A class that contains the list of GE courses.
 * It is meant to be used as a static class.
 * That is, it should not be instantiated.
 */
export default class GECourses {
    /**
     * Private constructor to prevent accidental instantiation.
     */
    private constructor() { }

    /**
     * The path to the ge_courses.txt file.
     */
    static COURSES_FILE_PATH: string = "utils/ge_courses/ge_courses.txt";

    /**
     * The list of GE courses read from the ge_courses.txt file.
     * 
     * Read the list of GE courses from the txt file,
     * split it into lines (and \r - carriage return),
     * and filter out empty lines (if any).
     */
    static COURSES: string[] = readFileSync(GECourses.COURSES_FILE_PATH, "utf8")
        .split("\r\n")
        .filter(line => line.length > 0);

    // static RAW_DATA: string[] = [readFileSync("ge_courses.txt", "utf8")];
}