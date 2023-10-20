// Import the default GECourses static class.
import { default as GECourses } from "./utils/ge_courses/ge_courses";

const sample_input = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
CS 12 LAB 1,F 1-4PM lab TL3
CS 12 LEC 2,TTh 1-2PM lec P&G
CS 31 THY2,TTh 4-5:30PM lec CLR3`;

console.log(GECourses.COURSES);
console.log(GECourses.COURSES.length);


type Day = "M" | "T" | "W" | "Th" | "F" | "S";
type AmOrPm = "AM" | "PM";
type Time = { hour: number, minute: number, amOrPm: AmOrPm };

class DayBasedSchedule {
    startTime: Time;
    endTime: Time;

    constructor(
        private readonly _days: string,
        private readonly _time: string,
    ) {
        let [start, end]: [string, string] = _time.split("-") as [string, string];

        // [ endTime. ]
        // Guaranteed to be not null.
        let endAmOrPm: AmOrPm = this.extractAmOrPm(end) as AmOrPm;
        let [endHour, endMinute]: [number, number] =
            this.extractHourMinute(end);
        this.endTime = {
            hour: endHour,
            minute: endMinute,
            amOrPm: endAmOrPm
        };

        // [ startTime. ]
        let startAmOrPm: AmOrPm;
        if (endAmOrPm === "AM") {
            startAmOrPm = "AM";
        } else {
            let temp: AmOrPm | null = this.extractAmOrPm(start);
            startAmOrPm = temp === null ? "PM" : temp;
        }

        let [startHour, startMinute]: [number, number] =
            this.extractHourMinute(end);

        this.startTime = {
            hour: startHour,
            minute: startMinute,
            amOrPm: startAmOrPm
        };



    }

    // GETTERS.
    get days(): Day[] {
        // Intelligently split the days string into an array of Day.
        // Take not that thursday is represented by "Th" (not a two letter string).
        let temp: Day[] = [];
        for (let i = 0; i < this._days.length; i++) {
            if (this._days[i] === "T" && this._days[i + 1] === "h") {
                temp.push("Th");
                i++;
            } else {
                temp.push(this._days[i] as Day);
            }
        }

        return temp;
    }

    // UTILITY METHODS.
    private extractAmOrPm(time: string): AmOrPm | null {
        let amOrPm: string | undefined =
            time.match(/([AP]M)?/g)?.filter(str => str.length > 0)[0];

        return amOrPm === undefined ? null : amOrPm as AmOrPm;
    }

    private extractHourMinute(time: string): [number, number] {
        let hourMinuteRegex = /[\d]+/g;
        let [hour, minute]: [string, string | undefined] =
            time.match(hourMinuteRegex) as [string, string | undefined];

        return [parseInt(hour), minute === undefined ? 0 : parseInt(minute)];
    }
}


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
        private readonly _dayBasedSchedules?: DayBasedSchedule[],
    ) { }

    hasConflict(other: Section): boolean {
        return false;
    }

    hasSlots(): boolean {
        return false;
    }

    // GETTERS.
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
const sampleSection1 = new Section("CS 153 THU");
console.log(sampleSection1.courseName);
console.log(sampleSection1.sectionName);

const sampleSection2 = new Section("DRMAPS THU");
console.log(sampleSection2.courseName);
console.log(sampleSection2.sectionName);

const sampleSection3 = new Section("Soc Sci 1 THU");
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

// Whole program.
parseInput(sample_input);
