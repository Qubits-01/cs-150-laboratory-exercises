// Multiplication game.
// Ali
// Marc

export class GameController {
    private _K = 2;
    private _whosTurn: number = 0;
    private _winnerPlayer: number;

    constructor(
        private _N: number,
        private _numOfPlayers: number,
    ) { }

    // Getters
    get K() { return this._K; }
    get whosTurn() { return this._whosTurn; }

    multiplyK(num: number): void {
        this._K = this._K * num;

        if (this.isGameDone()) {
            this._winnerPlayer = this._whosTurn;
        } else {
            this.changeToNextPlayer();
        }
    }

    isGameDone(): boolean {
        return this._K >= this._N;
    }

    changeToNextPlayer(): void {
        this._whosTurn = (this._whosTurn + 1) % this._numOfPlayers;
    }

    getWinner(): number | null {
        return this.isGameDone() === true ? this._whosTurn : null;
    }

}
