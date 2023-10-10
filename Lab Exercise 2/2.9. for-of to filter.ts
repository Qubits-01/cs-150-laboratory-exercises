// const strs = ['123', 'abc', '!@#', '123abc', '123!@#', 'abc!@#', '123abc!@#'];
// const answer: string[] = [];
//  
// for (const str of strs) {
//   if (str.toUpperCase() === str.toLowerCase()) {
//     answer.push(str);
//   }
// }

// console.log(answer);

const strs: string[] = ['123', 'abc', '!@#', '123abc', '123!@#', 'abc!@#', '123abc!@#'];
const answer: string[] = [];
 
strs.filter((str: string) => {
    if (str.toUpperCase() === str.toLowerCase()) {
        answer.push(str);
    }
});

console.log(answer);

export {};
