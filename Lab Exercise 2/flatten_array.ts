type MyArray = number | undefined | MyArray[];

export function flatten(input: MyArray[]): number[] {
    if (input.length === 0) return [];

    const temp: MyArray = input.shift();
    if (Array.isArray(temp)) {
        return [...flatten([...temp, ...input])];
    } else if (temp === undefined) {
        return [...flatten(input)];
    } else {
        return [temp, ...flatten(input)]
    };
}

console.log(flatten([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]));
  