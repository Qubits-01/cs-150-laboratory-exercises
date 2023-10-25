
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const maxCard = 4;
const maxPlayers = 2;

async function main() {

    // Make game area.
    let players = [];
    for (let i = 0; i < maxPlayers; i++) {
        players.push(new Player(`Player ${i + 1}`));
    }


    // const choice = parseInt(await rl.question("Enter something: "));
    // console.log(`You entered ${choice + 1}`);

    // Create Deck (52).
    const deck = new Deck();

    // Shuffle deck.
    deck.shuffle();

    // Put one card to discard Pile.
    let dp = new DiscardPile();
    dp.add(deck.draw() as Card);

    // Distribute cards (4 each).
    for (let i = 0; i < 4; i++) {
        players.forEach((player) => {
            player.add(deck.draw()!);
        })
    }

    for (let round = 1; round <= 9; round++) {
        let turn = 0;
        while (true) {

            let who = turn % maxPlayers;
            console.log("======================================================");
            console.log(`Round ${round}, Player ${who + 1}'s Turn\n`);
            console.log(`Deck: ${deck.cards.length} cards\n`);
            console.log(`Discard Pile (${dp.cards.length}): ${dp.viewTop().getFullName()}`);
            players.forEach(player => {
                console.log(`${player.name} (${player.score}): ${player.cards.map((card) => card.isFaceUP ? card.getFullName() : "Faced-down card").join(", ")}`);
            })


            console.log(`\nPlayer ${who + 1} Choose from which to get a card`);
            console.log("- [ 1 ] Deck");
            console.log(`- [ 2 ] Discard pile (${dp.viewTop().getFullName()})`);

            const choice = parseInt(await rl.question("Enter choice: "));
            console.log("\n");

            let drawCard = deck.draw();
            drawCard?.flipToFaceUp();
            if (choice === 1) {
                console.log(`Now what? ${drawCard?.getFullName()}`);
                console.log(`[ 1 ] ${players[who].cards[0].isFaceUP ? players[who].cards[0].getFullName() : "Faced-down card"}`);
                console.log(`[ 2 ] ${players[who].cards[1].isFaceUP ? players[who].cards[1].getFullName() : "Faced-down card"}`);
                console.log(`[ 3 ] ${players[who].cards[2].isFaceUP ? players[who].cards[2].getFullName() : "Faced-down card"}`);
                console.log(`[ 4 ] ${players[who].cards[3].isFaceUP ? players[who].cards[3].getFullName() : "Faced-down card"}`);
                console.log("[ 5 ] Discard")

                const choice = parseInt(await rl.question("Enter choice: "));
                console.log("\n");
                if (choice === 5) {
                    dp.add(drawCard as Card);
                } else {
                    dp.add(players[who].swap(drawCard as Card, choice));
                }
            } else {
                drawCard = dp.draw();

                console.log(`Now what? ${drawCard?.getFullName()}`);
                console.log(`[ 1 ] ${players[who].cards[0].isFaceUP ? players[who].cards[0].getFullName() : "Faced-down card"}`);
                console.log(`[ 2 ] ${players[who].cards[1].isFaceUP ? players[who].cards[1].getFullName() : "Faced-down card"}`);
                console.log(`[ 3 ] ${players[who].cards[2].isFaceUP ? players[who].cards[2].getFullName() : "Faced-down card"}`);
                console.log(`[ 4 ] ${players[who].cards[3].isFaceUP ? players[who].cards[3].getFullName() : "Faced-down card"}`);

                const choice = parseInt(await rl.question("Enter choice: "));
                console.log("\n");
                dp.add(players[who].swap(drawCard as Card, choice));
            }

            // round end conditions
            if (players[(who + 1) % maxPlayers].cards.every(card => card.isFaceUP)) {
                break;
            }

            // if deck is empty
            if (deck.cards.length == 0) {
                let removedCards = dp.RAETARTV();
                removedCards.forEach(card => {
                    deck.add(card);
                })
                deck.shuffle();
            }
            console.log("======================================================");

            turn++;
        }

        players.forEach(player => {
            player.cards.forEach(card => {
                player.addScore(card.getValue())
            })
        })

        console.log(`Player 1 score: ${players[0].score}`)
        console.log(`Player 2 score: ${players[1].score}`)
        console.log("\n===================================================\n\n")

    }

    console.log(`Player 1 score: ${players[0].score}`)
    console.log(`Player 2 score: ${players[1].score}`)

    rl.close();
}


// ===============================================================================
type Suits = "Hearts" | "Diamonds" | "Clubs" | "Spades";

// class plyaer {
//     card = deck.draw()

//     if swap
//     dis = player.remove()
// player.add(card)
// discard.add(dis)

//     else if throw
// discard.add(card)
// }


class Card {
    rank: number;
    suit: Suits;
    isFaceUP: boolean;

    constructor(
        rank: number,
        suit: Suits,
        isFaceUP: boolean = false
    ) {
        this.rank = rank;
        this.suit = suit;
        this.isFaceUP = isFaceUP;
    }

    getValue(): number {
        switch (this.rank) {
            case 1: // Ace
                return 1;
            case 2:
                return -2;
            case 12: // Queen
                return 10;
            case 13: // King
                return 0;
            default:
                return this.rank;
        }
    }

    flipToFaceUp() {
        this.isFaceUP = true;
    }
    flipToFaceDown() {
        this.isFaceUP = false;
    }

    getFullName(): string {

        let names = [
            "Ace",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Jack",
            "Queen",
            "king"
        ]

        return `${names[this.rank - 1]} of ${this.suit} `;

    }

}

class Deck {
    cards: Card[] = [];

    constructor() {
        const suits: Suits[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        for (const suit of suits) {
            for (let rank = 1; rank <= 13; rank++) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(): Card | undefined {
        return this.cards.pop();
    }

    add(card: Card) {
        card.flipToFaceDown();
        this.cards.push(card);
    }
}

class DiscardPile {
    cards: Card[] = [];

    constructor() { }

    draw(): Card | undefined {
        return this.cards.pop();
    }

    add(card: Card) {
        card.flipToFaceUp();
        this.cards.push(card);
    }

    viewTop(): Card {
        return this.cards[this.cards.length - 1];
    }

    RAETARTV(): Card[] {
        return this.cards.slice(0, this.cards.length - 2);
    }
}

class Player {
    name: string;
    cards: Card[] = [];
    score: number;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
    }

    add(card: Card) {
        this.cards.push(card);
    }

    remove(index: number): Card {
        return this.cards.splice(index, 1)[0];
    }

    getCards(): Card[] {
        return this.cards;
    }

    addScore(score: number) {
        this.score += score;
    }

    swap(newCard: Card, index: number): Card {
        let temp = this.cards[index - 1];
        this.cards[index - 1] = newCard;

        return temp;
    }

}


// ==========================================================================================

main();

// Jeric Narte, Marc Viernes

// Simply make a function for each input call, that will validate the input

// make global variable, just use for loop for printing and input validation for the max number of card

// it works