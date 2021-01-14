class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getRankNumber = () => {
        if (this.rank == "A") return 11;
        if (this.rank === "J" || this.rank === "Q" || this.rank === "K") return 10;
        return this.rank;
    }
}

class Deck {
    constructor(gameType) {
        this.gameType = gameType;
        this.deck = Deck.generateDeck();
    }

    static generateDeck = () => {
        let newDeck = [];
        const suits = ["♣", "♦", "♥", "♠"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        for (let i = 0; i < suits.length; i++){
            for (let k = 0; k < values.length; k++){
                newDeck.push(new Card(suits[i], values[k]));
            }
        }
        return newDeck;
    }
    static shuffle = () => {
        let deckSize = this.deck.length;
        for (let i = deckSize.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (1 + i));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }

    drawOne = () => {
        return this.cards.pop();
    }

    resetDeck = () => {
        this.deck = new Deck();
        return this.deck.shuffle();
    }
}
