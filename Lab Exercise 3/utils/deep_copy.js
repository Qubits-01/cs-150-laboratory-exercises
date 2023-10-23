"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // Return primitives and null as is
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item)); // Deep copy array elements
    }
    const copy = {}; // Create a new object of the same type
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]); // Deep copy object properties
        }
    }
    return copy;
}
exports.default = deepCopy;
