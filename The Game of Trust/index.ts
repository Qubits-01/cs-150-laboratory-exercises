import { argv } from 'process';

type Strategy = 'copycat' | 'grudger' | 'detective';

let N: number = parseInt(argv[2]);
let A: Strategy = argv[3] as Strategy;
let B: Strategy = argv[4] as Strategy;

for (let round = 0; round < N; round++) {
    console.log(A, B);
}

abstract class Strategy1 {
    abstract cheat(): void;
    abstract cooperate(): void;
}

class Copycat implements Strategy1 {
    cheat(): void { }
    cooperate(): void { }
}

class Grudger implements Strategy1 {
    cheat(): void { }
    cooperate(): void { }
}

class Detective implements Strategy1 {
    cheat(): void { }
    cooperate(): void { }
}
