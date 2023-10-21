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
        let time = mock._proxyBuildTimeObj("12:00 AM", () => "AM");
        // [ Act. ]
        let minutes = mock._proxyGetMinutesSinceMidnight(time);
        // [ Assert. ]
        (0, globals_1.expect)(minutes).toBe(0);
    });
});
