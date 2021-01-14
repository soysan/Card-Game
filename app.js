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
        this.cards = [];
        this.deck = Deck.generateDeck();
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

    }
}
