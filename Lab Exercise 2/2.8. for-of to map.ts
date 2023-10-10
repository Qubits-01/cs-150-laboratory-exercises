// const chars = [...Array(3)].map(_ => String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)));
// const answer: Array<string> = [];
//  
// for (const ch of chars) {
//   answer.push(ch.repeat(3));
// }

// console.log(answer);

const chars: string[] = [...Array(3)].map(_ => String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)));
const answer: string[] = [];

chars.map((char: String) => answer.push(char.repeat(3)));

console.log(answer);

export {};
