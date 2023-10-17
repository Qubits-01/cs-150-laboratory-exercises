// Import the GECourses static class.
import { default as GECourses } from "./ge_courses";

const sample_input = `CS 153 THU,TTh 10-11:30AM lec ERDT Room
CS 11 CLASS 1,W 10AM-12PM lab TBA; F 10AM-1PM lec TBA
CS 12 LAB 1,F 1-4PM lab TL3
CS 12 LEC 2,TTh 1-2PM lec P&G
CS 31 THY2,TTh 4-5:30PM lec CLR3`;

console.log("test");
console.log(GECourses.COURSES);
console.log(GECourses.COURSES.length);


// class Section {
//     // ...

//     hasConflict(other: Section): bool {
//         // ...
//     }

//     hasSlots(): bool {
//         // ...
//     }
// }

// export function parseInput(input: string): Section[] {
//     // ...
// }

// export function getGEs(sections: Section[]): Section[] {
//     // ...
// }

// export function getAllWithConflict(sections: Section[]): Section[] {
//     // ...
// }

