"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const deep_copy_1 = __importDefault(require("../../utils/deep_copy"));
(0, globals_1.describe)("[ deepCopy ]", () => {
    (0, globals_1.test)("Should return a deep copy of the given object.", () => {
        // [ Arrange. ]
        const obj = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4,
                f: {
                    g: 5,
                    h: 6,
                }
            }
        };
        // [ Act. ]
        const actual = (0, deep_copy_1.default)(obj);
        // [ Assert. ]
        (0, globals_1.expect)(actual).toEqual(obj);
        (0, globals_1.expect)(actual).not.toBe(obj);
    });
    (0, globals_1.test)("Should return null if the given object is null.", () => {
        // [ Arrange. ]
        const obj = null;
        // [ Act. ]
        const actual = (0, deep_copy_1.default)(obj);
        // [ Assert. ]
        (0, globals_1.expect)(actual).toBe(obj);
    });
    (0, globals_1.test)("Should return a deep copy of the given object even if there are null elements.", () => {
        // [ Arrange. ]
        const obj = {
            a: 1,
            b: null,
            c: {
                d: 3,
                e: null,
                f: {
                    g: 5,
                    h: null,
                }
            }
        };
        // [ Act. ]
        const actual = (0, deep_copy_1.default)(obj);
        // [ Assert. ]
        (0, globals_1.expect)(actual).toEqual(obj);
        (0, globals_1.expect)(actual).not.toBe(obj);
    });
});
