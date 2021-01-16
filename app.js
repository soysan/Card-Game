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
    shuffle = () => {
        let deckSize = this.deck.length;
        for (let i = deckSize - 1; i > 0; i--){
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
        let newDeck = new Deck();
        newDeck.shuffle();
        this.deck = newDeck;
    }
}
class Player {
    constructor(name, type, gameType, chips = 400) {
        this.name = name;
        this.type = type; // {'ai', 'house', 'user'}
        this.gameType = gameType;
        this.hand = [];
        this.chips = chips;
        this.bet = 0;
        this.winAmount = 0;
        this.gameStatus = 'betting';
    }
    promptPlayer = (userData = null) => {
        const actionSelect = ['bet', 'hit', 'double', 'stand', 'surrender'];
        if (this.gameType === 'blackjack') {
            if (this.type === 'ai') {
                return new GameDecision(actionSelect[userData], null);
            } else if (this.type === 'user') {
                return new GameDecision(actionSelect[userData], this.bet);
            }
        }
    }
    getHandScore = () => {
        let score = 0;
        let arcCount = 0;
        for (let i = 0; i < this.hand.length; i++){
            if (this.hand[i].getRankNumber() === 11) arcCount++;
            score += this.hand[i].getRankNumber();
        }
        if (score >= 21) {
            while (arcCount !== 0) score -= 10;
        }
        return score;
    }
}

class GameDecision {
    constructor(action, amount) {
        this.action = action;
        this.amount = amount;
    }

}

class Table {
    constructor(gameType, betDenominations = [5,20,50,100]) {
        this.gameType = gameType;
        this.betDenominations = betDenominations;
        this.deck = new Deck(this.gameType);
        this.players = [];
        this.house = new Player('house', 'house', this.gameType);
        this.gamePhase = 'betting';
        this.resultsLog = [];
    }

    evaluateMove = Player => {

    }
    blackjackEvaluateAndGetRoundResults = () => {

    }
    blackjackAssignPlayerHands = () => {

    }
    blackjackClearPlayerHandsAndBets = () => {

    }
    getTurnPlayer = () => {

    }
    haveTurn = () => {

    }
    onFirstPlayer = () => {

    }
    onLastPlayer = () => {

    }
    allPlayerActionsResolved = () => {

    }
}
// let table1 = new Table();
// while (table1.gamePhase != 'roundOver') {
//     table1.haveTurn();
// }
// console.log(table1.resultsLogs);
let hi = new Deck()
hi.shuffle();
hi.resetDeck();
console.log(hi)
