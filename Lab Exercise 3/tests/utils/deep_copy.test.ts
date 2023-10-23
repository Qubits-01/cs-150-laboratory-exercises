import { describe, expect, test } from "@jest/globals";
import deepCopy from "../../utils/deep_copy";

describe("[ deepCopy ]", () => {
    test("Should return a deep copy of the given object.", () => {
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
        const actual = deepCopy(obj);

        // [ Assert. ]
        expect(actual).toEqual(obj);
        expect(actual).not.toBe(obj);
    });

    test("Should return null if the given object is null.", () => {
        // [ Arrange. ]
        const obj = null;

        // [ Act. ]
        const actual = deepCopy(obj);

        // [ Assert. ]
        expect(actual).toBe(obj);
    });

    test(
        "Should return a deep copy of the given object even if there are null elements.",
        () => {
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
            const actual = deepCopy(obj);

            // [ Assert. ]
            expect(actual).toEqual(obj);
            expect(actual).not.toBe(obj);
        }
    );
});