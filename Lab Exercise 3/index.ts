// Import the default export.
import GECourses from "./utils/ge_courses/ge_courses";
import DayBasedSchedule from "./utils/day_based_schedule/day_based_schedule";

// TODO: Improve documentation (via docstrings).
// TODO: Add unit tests and integration tests using Jest.

const sample_input = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
CS 12 LAB 1,F 1-4PM lab TL3
CS 12 LEC 2,TTh 1-2PM lec P&G
CS 31 THY2,TTh 4-5:30PM lec CLR3`;

console.log(GECourses.COURSES);
console.log(GECourses.COURSES.length);

/**
 * This class represents a Section (w/ day-based schedules).
 * 
 * It is immutable by design. That is, once a Section object is created,
 * it cannot be modified. This is to prevent accidental modification
 * of the object's properties. If you want to modify the object,
 * you have to create a new one. This is also why the properties
 * are set to private and readonly.
 */
class Section {
    constructor(
        private readonly _completeName: string,
        private readonly _dayBasedSchedules: DayBasedSchedule[],
    ) { }

    hasConflict(other: Section): boolean {
        let otherScheds: DayBasedSchedule[] = other.dayBasedSchedules;

        // Check if the other section has the same day-based schedule
        // as this section.
        for (let thisSched of this.dayBasedSchedules) {
            for (let otherSched of other.dayBasedSchedules) {
                if (thisSched.hasConflict(otherSched)) {
                    return true;
                }
            }
        }

        return false;
    }

    hasSlots(): boolean {
        return true;
    }

    // GETTERS.
    /**
     * Get the day based schedules of this Section object.
     * The returned array is a copy (not by reference).
     * 
     * @returns {DayBasedSchedule[]} An array of DayBasedSchedule objects.
     */
    get dayBasedSchedules(): DayBasedSchedule[] {
        // Return a copy of the dayBasedSchedules array (not by reference).
        // Note that the DayBasedSchedule objects are still by reference.
        // This is still safe since the DayBasedSchedule objects are immutable
        // by design.
        return [...this._dayBasedSchedules];
    }

    /**
     * Get the course name of this Section object.
     * Some examples of course names are: CS 150, CS 69, Soc Sci 1, etc.
     * 
     * @returns {string} The course name.
     */
    get courseName(): string {
        // Get the string/s from first to second to the last
        // and then join them with a space.
        return this._completeName.split(" ").slice(0, -1).join(" ");
    }

    /**
     * Get the section name of this Section object.
     * Some examples of section names are: THU, THY2, CLASS 1, LAB 1, etc.
     * 
     * @returns {string} The section name.
     */
    get sectionName(): string {
        // Get the last string and return it.
        return this._completeName.split(" ").slice(-1)[0];
    }

    // UTILITY METHODS.
}

/**
 * This function parses the input string and returns an array of Section objects.
 * 
 * That is, parseInput takes in a string and tries to create an array containing 
 * Section objects corresponding to each entry in the input string.
 * 
 * @param {string} input The input string.
 * @returns {Section[]} An array of Section objects.
 */
export function parseInput(input: string): Section[] {
    let sections: Section[] = [];
    input.split("\n").forEach(line => {
        // Clean the line.
        line = line.trim();

        // Split the input into two parts: the complete name and
        // the day-based schedules.
        let [completeName, dayBasedScheds]: [string, string] =
            line.split(",") as [string, string];

        // [ Build the DayBasedSchedule object/s. ]
        let dayBasedSchedObjs: DayBasedSchedule[] = [];
        for (let sched of dayBasedScheds.split(";")) {
            // Split the sched into two parts: the day/s and the time interval.
            let [days, time]: [string, string] =
                sched.trim().split(" ") as [string, string];

            dayBasedSchedObjs.push(new DayBasedSchedule(days, time));
        }

        // [ Build the Section object using the DayBasedSchedule object. ]
        sections.push(new Section(completeName, dayBasedSchedObjs));
    });

    return sections;
}


/**
 * This function should return a new array of Section objects with the same
 * sort order of the input array, but with all sections that correspond to 
 * GEs filtered out.
 * 
 * @param {Section[]} sections The array of Section objects.
 * @returns {Section[]} The filtered array of Section objects.
 */
export function getGEs(sections: Section[]): Section[] {
    return [];
}

/**
 * This function should return a new array of Section objects with at 
 * least one scheduling conflict with any of the other Section objects 
 * in the input array (apart from itself).
 * 
 * @param {Section[]} sections The array of Section objects.
 * @returns {Section[]} The filtered array of Section objects.
 */
export function getAllWithConflict(sections: Section[]): Section[] {
    return [];
}

// Whole program.
parseInput(sample_input);
