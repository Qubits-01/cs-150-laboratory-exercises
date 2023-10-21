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
        for (let dayBasedSched of this.dayBasedSchedules) {
            console.log(dayBasedSched);
        }

        return false;
    }

    hasSlots(): boolean {
        return true;
    }

    // GETTERS.
    get dayBasedSchedules(): DayBasedSchedule[] {
        // Return a copy of the dayBasedSchedules array (not by reference).
        // Note that the DayBasedSchedule objects are still by reference.
        // This is still safe since the DayBasedSchedule objects are immutable
        // by design.
        return [...this._dayBasedSchedules];
    }

    /**
     * Returns the course name of this Section object.
     */
    get courseName(): string {
        // Get the string/s from first to second to the last
        // and then join them with a space.
        return this._completeName.split(" ").slice(0, -1).join(" ");
    }

    /**
     * Returns the section name of this Section object
     */
    get sectionName(): string {
        // Get the last string and return it.
        return this._completeName.split(" ").slice(-1)[0];
    }

    // UTILITY METHODS.
}

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

// export function getGEs(sections: Section[]): Section[] {
//     // ...
// }

// export function getAllWithConflict(sections: Section[]): Section[] {
//     // ...
// }

// TESTING CODE.
// Section class.
let temp = new DayBasedSchedule("TTh", "10-11:30AM");
const sampleSection1 = new Section("CS 153 THU", [temp]);
console.log(sampleSection1.courseName);
console.log(sampleSection1.sectionName);

const sampleSection2 = new Section("DRMAPS THU", [temp]);
console.log(sampleSection2.courseName);
console.log(sampleSection2.sectionName);

const sampleSection3 = new Section("Soc Sci 1 THU", [temp]);
console.log(sampleSection3.courseName);
console.log(sampleSection3.sectionName);

// DayBasedSchedule class.
const sampleDayBasedSchedule1 = new DayBasedSchedule("TTh", "10-11:30AM");
console.log(sampleDayBasedSchedule1.days);

const sampleDayBasedSchedule2 = new DayBasedSchedule("MTWThFS", "10-11:30AM");
console.log(sampleDayBasedSchedule2.days);

const sampleDayBasedSchedule3 = new DayBasedSchedule("Th", "10-11:30AM");
console.log(sampleDayBasedSchedule3.days);

const sampleDayBasedSchedule4 = new DayBasedSchedule("MT", "10-11:30AM");
console.log(sampleDayBasedSchedule4.days);

const sampleDayBasedSchedule5 = new DayBasedSchedule("ThFS", "10-11:30AM");
console.log(sampleDayBasedSchedule5.days);

// DayBasedSchedule class (time).
console.log("Th 10-11:30AM");
const sampleDayBasedSchedule6 = new DayBasedSchedule("Th", "10-11:30AM");
console.log(sampleDayBasedSchedule6.days);
console.log(sampleDayBasedSchedule6.startTime);
console.log(sampleDayBasedSchedule6.endTime);
sampleDayBasedSchedule1.startTime.amOrPm = "PM";
console.log(sampleDayBasedSchedule1.startTime); // Should not change.

console.log("TTh 10-11:30AM");
const sampleDayBasedSchedule7 = new DayBasedSchedule("TTh", "10-11:30AM");
console.log(sampleDayBasedSchedule7.days);
console.log(sampleDayBasedSchedule7.startTime);
console.log(sampleDayBasedSchedule7.endTime);

console.log("W 10AM-12PM");
const sampleDayBasedSchedule8 = new DayBasedSchedule("W", "10AM-12PM");
console.log(sampleDayBasedSchedule8.days);
console.log(sampleDayBasedSchedule8.startTime);
console.log(sampleDayBasedSchedule8.endTime);

console.log("F 10AM-1PM");
const sampleDayBasedSchedule9 = new DayBasedSchedule("F", "10AM-1PM");
console.log(sampleDayBasedSchedule9.days);
console.log(sampleDayBasedSchedule9.startTime);
console.log(sampleDayBasedSchedule9.endTime);

console.log("F 1-4PM");
const sampleDayBasedSchedule10 = new DayBasedSchedule("F", "1-4PM");
console.log(sampleDayBasedSchedule10.days);
console.log(sampleDayBasedSchedule10.startTime);
console.log(sampleDayBasedSchedule10.endTime);

console.log("TTh 1-2PM");
const sampleDayBasedSchedule11 = new DayBasedSchedule("TTh", "1-2PM");
console.log(sampleDayBasedSchedule11.days);
console.log(sampleDayBasedSchedule11.startTime);
console.log(sampleDayBasedSchedule11.endTime);

console.log("TTh 4-5:30PM");
const sampleDayBasedSchedule12 = new DayBasedSchedule("TTh", "4-5:30PM");
console.log(sampleDayBasedSchedule12.days);
console.log(sampleDayBasedSchedule12.startTime);
console.log(sampleDayBasedSchedule12.endTime);

// Section (hasConflict).


// Whole program.
parseInput(sample_input);
