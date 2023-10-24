class Card {
  constructor(public rank: number, public suit: string) {}

  getValue(): number {
    if (this.rank === 1) {
      return 11; // Ace is worth 11 points
    } else if (this.rank >= 10) {
      return 10; // Face cards are worth 10 points
    } else {
      return this.rank;
    }
  }
}

class Deck {
  private cards: Card[] = [];

  constructor() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
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
}

class GolfGame {
  private deck: Deck;
  private playerHand: Card[] = [];
  private computerHand: Card[] = [];

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();

    // Deal 6 cards to each player
    for (let i = 0; i < 6; i++) {
      this.playerHand.push(this.deck.draw() as Card);
      this.computerHand.push(this.deck.draw() as Card);
    }
  }

  getPlayerScore(): number {
    return this.calculateScore(this.playerHand);
  }

  getComputerScore(): number {
    return this.calculateScore(this.computerHand);
  }

  private calculateScore(hand: Card[]): number {
    let score = 0;
    let aces = 0;

    for (const card of hand) {
      score += card.getValue();
      if (card.rank === 1) {
        aces++;
      }
    }

    // Adjust the score if there are aces
    while (aces > 0 && score > 21) {
      score -= 10;
      aces--;
    }

    return score;
  }
}

// Example usage
const game = new GolfGame();
console.log('Player Score:', game.getPlayerScore());
console.log('Computer Score:', game.getComputerScore());
