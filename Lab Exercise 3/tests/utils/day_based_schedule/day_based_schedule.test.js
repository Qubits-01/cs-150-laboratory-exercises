"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const day_based_schedule_1 = __importDefault(require("../../../utils/day_based_schedule/day_based_schedule"));
(0, globals_1.describe)('getMinuteSinceMidnight', () => {
    let mock;
    (0, globals_1.beforeAll)(() => {
        // The arguments are not really needed here, just placeholders.
        mock = new day_based_schedule_1.default("MWF", "8:30 AM - 10:00 AM");
    });
    // This is not really needed since the earliest time
    // for a class is 7:00 AM. This is just for sanity check.
    (0, globals_1.test)('Should return 0 or 12:00 AM.', () => {
        // [ Arrange. ]
        let mockTime = mock._proxyBuildTimeObj("12:00 AM", () => "AM");
        // [ Act. ]
        // [ Assert. ]
        // expect(sum(1, 2)).toBe(3);
    });
});
// // Applies to all tests in this file
// beforeEach(() => {
//     return initializeCityDatabase();
// });
// test('city database has Vienna', () => {
//     expect(isCity('Vienna')).toBeTruthy();
// });
// test('city database has San Juan', () => {
//     expect(isCity('San Juan')).toBeTruthy();
// });
// describe('matching cities to foods', () => {
//     // Applies only to tests in this describe block
//     beforeEach(() => {
//         return initializeFoodDatabase();
//     });
//     test('Vienna <3 veal', () => {
//         expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//     });
//     test('San Juan <3 plantains', () => {
//         expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//     });
// });
