let names: Array<string> = ['a', 'b', 'c'];
let entries: IterableIterator<[number, string]> = names.entries();

for (const entry of entries) {
    console.log(`Index ${entry[0]}: ${entry[1]}`);
}

export {};
