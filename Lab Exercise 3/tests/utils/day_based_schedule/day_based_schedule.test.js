"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('getMinuteSinceMidnight', () => {
    (0, globals_1.beforeAll)(() => { });
    (0, globals_1.test)('adds 1 + 2 to equal 3', () => {
        (0, globals_1.expect)(sum(1, 2)).toBe(3);
    });
});
// Applies to all tests in this file
beforeEach(() => {
    return initializeCityDatabase();
});
(0, globals_1.test)('city database has Vienna', () => {
    (0, globals_1.expect)(isCity('Vienna')).toBeTruthy();
});
(0, globals_1.test)('city database has San Juan', () => {
    (0, globals_1.expect)(isCity('San Juan')).toBeTruthy();
});
(0, globals_1.describe)('matching cities to foods', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        return initializeFoodDatabase();
    });
    (0, globals_1.test)('Vienna <3 veal', () => {
        (0, globals_1.expect)(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });
    (0, globals_1.test)('San Juan <3 plantains', () => {
        (0, globals_1.expect)(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
    });
});
