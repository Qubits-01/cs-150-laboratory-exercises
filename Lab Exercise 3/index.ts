// Import the default export.
import DayBasedSchedule from "./utils/day_based_schedule/day_based_schedule";
import GECoursesSingleton from "./utils/ge_courses_singleton/ge_courses_singleton";

/**
 * This class represents a Section (w/ day-based schedules).
 * 
 * It is immutable by design. That is, once a Section object is created,
 * it cannot be modified. This is to prevent accidental modification
 * of the object's properties. If you want to modify the object,
 * you have to create a new one. This is also why the properties
 * are set to private and readonly.
 */
export default class Section {
    constructor(
        private readonly _completeName: string,
        private readonly _dayBasedSchedules: DayBasedSchedule[],
        private readonly _geCoursesSingleton: GECoursesSingleton =
            GECoursesSingleton.getInstance()
    ) { }

    // [ UTILITY METHODS. ]
    /**
     * Check if this Section object has a scheduling conflict with the other
     * Section object.
     * 
     * @param {Section} other The other Section object.
     * @returns {boolean} True if this Section object has a scheduling conflict
     * with the other Section object; false otherwise.
     */
    hasConflict(other: Section): boolean {
        // Check if the other section has the same day-based schedule
        // as this section.
        for (let thisSched of this._dayBasedSchedules) {
            for (let otherSched of other._dayBasedSchedules) {
                if (thisSched.hasConflict(otherSched)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if this Section object is a GE course.
     * 
     * @returns {boolean} True if this Section object is a GE course;
     * false otherwise.
     * @see GECoursesSingleton.isGE
     */
    isGE(): boolean { return this._geCoursesSingleton.isGE(this._completeName); }

    // TODO: Will ask sir about this. The sample input string has no 
    // "slots" related data.
    /**
     * Check if this Section object has slots.
     * 
     * @returns {boolean} True if this Section object has slots; false otherwise.
     */
    hasSlots(): boolean {
        return true;
    }

    /**
     * Get a copy of this Section object.
     * 
     * @param {string} completeName The complete name of the Section object.
     * @param {DayBasedSchedule[]} dayBasedSchedules The day-based schedules
     * of the Section object.
     * @returns {Section} A copy of this Section object.
     */
    copyWith(
        completeName?: string,
        dayBasedSchedules?: DayBasedSchedule[],
    ): Section {
        let dayBasedSchedsCopy: DayBasedSchedule[] = [];
        if (!dayBasedSchedules) {
            for (let sched of this._dayBasedSchedules) {
                dayBasedSchedsCopy.push(sched.copyWith());
            }
        }

        return new Section(
            completeName ?? this._completeName,
            dayBasedSchedules ?? dayBasedSchedsCopy,
        );
    }

    // [ PROXY METHODS, GETTERS, and OTHERS. ]
    // These are for testing purposes only.
    // They are not meant to be used outside of this class.

    /**
     * Proxy getter for the _completeName property.
     * 
     * Get the complete name of this Section object.
     * 
     * For definitiveness sake, the complete name is the course name and section
     * name combined (e.g., "CS 11 CLASS 1" - CS 11 is the course name
     * and CLASS 1 is the section name).
     * 
     * @returns {string} The complete name of this Section object.
     */
    get _proxyCompleteName(): string { return this._completeName; }

    /**
     * Proxy getter for the _dayBasedSchedules property.
     * 
     * Get the day based schedules of this Section object.
     * The returned array is a copy (not by reference).
     * 
     * @returns {DayBasedSchedule[]} An array of DayBasedSchedule objects.
     */
    get _proxyDayBasedSchedules(): DayBasedSchedule[] {
        let schedsCopy: DayBasedSchedule[] = [];
        for (let sched of this._dayBasedSchedules) {
            schedsCopy.push(sched.copyWith());
        }

        return schedsCopy;
    }

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
    if (input === "") { return []; }

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
        sections.push(new Section(completeName.trim(), dayBasedSchedObjs));
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
    let noGEs: Section[] = [];
    sections.forEach(section => {
        if (!section.isGE()) {
            noGEs.push(section.copyWith());
        }
    });

    return noGEs;
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
    let sectionsWithConflict: Section[] = [];
    for (let i = 0; i < sections.length; i++) {
        for (let j = i + 1; j < sections.length; j++) {
            if (sections[i].hasConflict(sections[j])) {
                _toPushOrNotToPush(sections[i], sectionsWithConflict);
                _toPushOrNotToPush(sections[j], sectionsWithConflict);
            }
        }
    }

    // Deep copy the sectionsWithConflict array.
    let copy: Section[] = [];
    sectionsWithConflict.forEach(section => copy.push(section.copyWith()));

    return copy;
}


/**
 * *To push or not to push, that is the question ;D
 * 
 * This function checks if the given section is already in the given array.
 * If not, it will push the section to the array.
 * 
 * @param {Section} section The section to check.
 * @param {Section[]} sections The array of Section objects.
 * @returns {void} Nothing.
 */
function _toPushOrNotToPush(section: Section, sections: Section[]) {
    if (!sections.includes(section)) {
        sections.push(section);
    }
}
