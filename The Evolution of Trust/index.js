"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
function main() {
    // Get the number of rounds and the two strategies from the command line.
    var N = parseInt(process_1.argv[2]);
    var A = process_1.argv[3];
    var B = process_1.argv[4];
    // Instantiate the two needed strategies.
    var strategyA = getStrategyObj(A);
    var strategyB = getStrategyObj(B);
    // Total scores for each player.
    var scoreA = 0;
    var scoreB = 0;
    // Initialize the previous moves for each player.
    var prevMoveA;
    var prevMoveB;
    console.log("\n".concat(N, " rounds: A (").concat(A, ") vs B (").concat(B, ")\n"));
    // Loop through the N rounds.
    for (var round = 0; round < N; round++) {
        var roundScoreA = 0;
        var roundScoreB = 0;
        // Get the moves for each player.
        var moveA = strategyA.getMove(prevMoveB);
        var moveB = strategyB.getMove(prevMoveA);
        prevMoveA = moveA;
        prevMoveB = moveB;
        // Determine the scores for each player.
        if (moveA === 'cooperate' && moveB === 'cooperate') {
            roundScoreA = 2;
            roundScoreB = 2;
        }
        else if (moveA === 'cooperate' && moveB === 'cheat') {
            roundScoreA = -1;
            roundScoreB = 3;
        }
        else if (moveA === 'cheat' && moveB === 'cooperate') {
            roundScoreA = 3;
            roundScoreB = -1;
        }
        else if (moveA === 'cheat' && moveB === 'cheat') {
            roundScoreA = 0;
            roundScoreB = 0;
        }
        // Output the payoffs for this round.
        console.log("round: ".concat(round + 1, " | A (").concat(moveA, "): ").concat(roundScoreA, " | B (").concat(moveB, "): ").concat(roundScoreB));
        // Update the total scores.
        scoreA += roundScoreA;
        scoreB += roundScoreB;
    }
    // Output the total scores.
    console.log("\nTotal scores: A (".concat(A, "): ").concat(scoreA, " | B (").concat(B, "): ").concat(scoreB));
}
var StrategyInterface = /** @class */ (function () {
    function StrategyInterface() {
    }
    return StrategyInterface;
}());
var Copycat = /** @class */ (function () {
    function Copycat(_isFirstMove) {
        if (_isFirstMove === void 0) { _isFirstMove = true; }
        this._isFirstMove = _isFirstMove;
    }
    Copycat.prototype.getMove = function (other) {
        // If this is the first move, always cooperate.
        if (this._isFirstMove) {
            this._isFirstMove = false;
            return 'cooperate';
        }
        // Otherwise, copy the other player's last move.
        // [other] is guaranteed to be not undefined at this point
        // because of the [this._isFirstMove] check above.
        return other;
    };
    return Copycat;
}());
var Grudger = /** @class */ (function () {
    function Grudger(_isFirstMove, _hasCheated) {
        if (_isFirstMove === void 0) { _isFirstMove = true; }
        if (_hasCheated === void 0) { _hasCheated = false; }
        this._isFirstMove = _isFirstMove;
        this._hasCheated = _hasCheated;
    }
    Grudger.prototype.getMove = function (other) {
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
    };
    return Grudger;
}());
var AllCheat = /** @class */ (function () {
    function AllCheat() {
    }
    AllCheat.prototype.getMove = function (other) { return 'cheat'; };
    return AllCheat;
}());
var Detective = /** @class */ (function () {
    function Detective(
    // Dependency injection via constructor.
    _allCheatObj, _copycatObj, _moveCounter, _firstFourMOves) {
        if (_allCheatObj === void 0) { _allCheatObj = new AllCheat(); }
        if (_copycatObj === void 0) { _copycatObj = new Copycat(); }
        if (_moveCounter === void 0) { _moveCounter = 0; }
        if (_firstFourMOves === void 0) { _firstFourMOves = [
            'cooperate',
            'cheat',
            'cooperate',
            'cooperate'
        ]; }
        this._allCheatObj = _allCheatObj;
        this._copycatObj = _copycatObj;
        this._moveCounter = _moveCounter;
        this._firstFourMOves = _firstFourMOves;
    }
    Detective.prototype.getMove = function (other) {
        if (this._moveCounter < 4) {
            return this._firstFourMOves[this._moveCounter++];
        }
        // [other] is guaranteed to be not undefined at this point
        // because of the [this._moveCounter] check above.
        return other === 'cheat' ?
            this._copycatObj.getMove(other) :
            this._allCheatObj.getMove();
    };
    return Detective;
}());
// Utility Functions
function getStrategyObj(strategy) {
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
