// const strs = ['a', 'b', 'c'];
// let answer = strs[0];
//  
// for (const str of strs.slice(1)) {
//   answer += `, ${str}`;
// }
// console.log(answer);

const strs: string[] = ['a', 'b', 'c'];
let answer: string = strs[0];

answer = strs.join(', ');
console.log(answer);

export {};
