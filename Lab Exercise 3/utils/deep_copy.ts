export default function deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj; // Return primitives and null as is
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item)) as any; // Deep copy array elements
    }

    const copy: Partial<T> = {}; // Create a new object of the same type

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]); // Deep copy object properties
        }
    }

    return copy as T;
}
