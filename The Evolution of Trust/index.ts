// Marc Peejay V. Viernes

import { argv } from 'process';

type Strategy = 'copycat' | 'grudger' | 'detective';
type Move = 'cheat' | 'cooperate';

function main(): void {
    // Get the number of rounds and the two strategies from the command line.
    let N: number = parseInt(argv[2]);
    let A: Strategy = argv[3] as Strategy;
    let B: Strategy = argv[4] as Strategy;

    // Instantiate the two needed strategies.
    let strategyA = getStrategyObj(A);
    let strategyB = getStrategyObj(B);

    // Total scores for each player.
    let scoreA = 0;
    let scoreB = 0;

    // Initialize the previous moves for each player.
    let prevMoveA: Move | undefined;
    let prevMoveB: Move | undefined;

    console.log(`\n${N} rounds: A (${A}) vs B (${B})\n`);

    // Loop through the N rounds.
    for (let round = 0; round < N; round++) {
        let roundScoreA = 0;
        let roundScoreB = 0;

        // Get the moves for each player.
        let moveA = strategyA.getMove(prevMoveB);
        let moveB = strategyB.getMove(prevMoveA);
        prevMoveA = moveA;
        prevMoveB = moveB;

        // Determine the scores for each player.
        if (moveA === 'cooperate' && moveB === 'cooperate') {
            roundScoreA = 2;
            roundScoreB = 2;
        } else if (moveA === 'cooperate' && moveB === 'cheat') {
            roundScoreA = -1;
            roundScoreB = 3;
        } else if (moveA === 'cheat' && moveB === 'cooperate') {
            roundScoreA = 3;
            roundScoreB = -1;
        } else if (moveA === 'cheat' && moveB === 'cheat') {
            roundScoreA = 0;
            roundScoreB = 0;
        }

        // Output the payoffs for this round.
        console.log(`round: ${round + 1} | A (${moveA}): ${roundScoreA} | B (${moveB}): ${roundScoreB}`);

        // Update the total scores.
        scoreA += roundScoreA;
        scoreB += roundScoreB;
    }

    // Output the total scores.
    console.log(`\nTotal scores: A (${A}): ${scoreA} | B (${B}): ${scoreB}`);
}

abstract class StrategyInterface {
    abstract getMove(other?: Move): Move;
}

class Copycat implements StrategyInterface {
    constructor(private _isFirstMove: boolean = true) { }

    getMove(other?: Move): Move {
        // If this is the first move, always cooperate.
        if (this._isFirstMove) {
            this._isFirstMove = false;
            return 'cooperate';
        }

        // Otherwise, copy the other player's last move.
        // [other] is guaranteed to be not undefined at this point
        // because of the [this._isFirstMove] check above.
        return other as Move;
    }

}

class Grudger implements StrategyInterface {
    constructor(
        private _isFirstMove: boolean = true,
        private _hasCheated: boolean = false
    ) { }

    getMove(other?: Move): Move {
        // If this is the first move, always cooperate.
        if (this._isFirstMove) {
            this._isFirstMove = false;
            return 'cooperate';
        }

        // Determine whether the other player has cheated.
        // [other] is guaranteed to be not undefined at this point
        // because of the [this._isFirstMove] check above.
        if (other === 'cheat') {
            this._hasCheated = true;
        }

        // If the other player has ever cheated, always cheat.
        return this._hasCheated ? 'cheat' : 'cooperate';
    }
}

class AllCheat implements StrategyInterface {
    getMove(other?: Move): Move { return 'cheat'; }
}

class Detective implements StrategyInterface {
    constructor(
        // Dependency injection via constructor.
        private readonly _allCheatObj: AllCheat = new AllCheat(),
        private readonly _copycatObj: Copycat = new Copycat(),

        private _moveCounter: number = 0,
        private readonly _firstFourMOves: Move[] = [
            'cooperate',
            'cheat',
            'cooperate',
            'cooperate'
        ]
    ) { }

    getMove(other?: Move): Move {
        if (this._moveCounter < 4) {
            return this._firstFourMOves[this._moveCounter++];
        }

        // [other] is guaranteed to be not undefined at this point
        // because of the [this._moveCounter] check above.
        return other === 'cheat' ?
            this._copycatObj.getMove(other) :
            this._allCheatObj.getMove();
    }
}

// Utility Functions
function getStrategyObj(strategy: Strategy): Copycat | Grudger | Detective {
    switch (strategy) {
        case 'copycat':
            return new Copycat();
        case 'grudger':
            return new Grudger();
        case 'detective':
            return new Detective();
    }
}

main();

/**
 * Answers:
 * 1) 
 * Nothing much. I would just need to add getters/accessors for the
 * front-end (HTML) to use in order for it to display the results and 
 * other relevant state data. Also, I would need to add an async code
 * for the button that the player will click.
 * 
 * 2)
 * After getting the move for each strategy, I will then apply the "X%
 * chance for mistakes" rule on the said moves. Using a random number
 * generator that incorporates the "X% chance for mistakes" rule, I will
 * then determine the actual moves for each strategy (if it will be 
 * a mistake or not).
 * 
 * 3)
 * Relatively speaking, I think it would be easy since I heavily used
 * classes in my implementation. That is, I can just spawn up new
 * instances of the classes and use them as needed.
 * 
 *  */
