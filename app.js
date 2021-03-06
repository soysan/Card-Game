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
        const suits = ["H","D","C","S"]; //["♣", "♦", "♥", "♠"];
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
        this.gameStatus = 'betting'; //{'betting','bet','surrender','stand','hit','double','blackjack','bust','broke'}
    }
    promptPlayer = (userData = null) => { // input from userData = {bet, surrender, stand, double, hit}
        if (userData.type === 'ai') {
            return new GameDecision(null, null);
        } else if (userData.type === 'user') {
            return new GameDecision(userData.gameStatus, userData.bet);
        } else if (userData.type === 'house') {
            return new GameDecision()
        }
    }
    getHandScore = () => {
        let score = 0;
        let aceCount = 0;
        for (let i = 0; i < this.hand.length; i++){
            if (this.hand[i].getRankNumber() === 11) aceCount++;
            score += this.hand[i].getRankNumber();
        }
        if (score >= 21) {
            while (aceCount !== 0) {
                score -= 10;
                aceCount--;
            }
        }
        return score;
    }
    // need player object for result?
}

class GameDecision {
    constructor(action, amount) {
        this.action = action; //'bet','surrender','stand','hit','double'
        this.amount = amount;
    }

}

class Table {
    constructor(gameType, betDenominations = [5,20,50,100]) {
        this.gameType = gameType;
        this.betDenominations = betDenominations;
        this.deck = new Deck(this.gameType);
        this.players = [
            new Player("AI 1", 'ai', this.gameType),
            new Player("AI 3", 'ai', this.gameType),
            new Player("AI 3", 'ai', this.gameType),
            this.house
        ];
        this.turnCounter = 0;
        this.house = new Player('house', 'house', this.gameType);
        this.gamePhase = 'betting'; //betting, acting, evaluatingWinners, gameOver
        this.resultsLog = [];
    }
    blackjackEvaluateRoundWinners = () => {

    }
    evaluateMove = Player => {
        let decision = Player.promptPlayer();
        switch (decision) {
            case 'surrender':
                Player.chips += Math.floor(Player.bet / 2);
                Player.bet = 0;
                break;
            case 'hit':
                Player.hand.push(this.deck.drawOne());
                break;
            case 'double':
                Player.chips -= Player.bet;
                Player.bet *= 2;
                break;
            case 'stand':
                break;
            default:
                break;
        }
    }
    blackjackEvaluateAndGetRoundResults = () => {
        for (let i = 0; i < this.players.length; i++){
            let currPlayer = this.players[i];
                if (currPlayer.getHandScore() < 21 && this.house.getHandScore() < currPlayer.getHandScore()) {
                    currPlayer.winAmount = currPlayer.gameStatus ===
                        'hit' || 'stand' ? Math.floor(currPlayer.bet * 1.5) :
                        'double' ? Math.floor(currPlayer.bet * 2) : 0;
                    currPlayer.gameStatus = 'win';
                } else {
                    currPlayer.gameStatus = 'lose';
                }
        }
    }
    blackjackAssignPlayerHands = () => {
        for (let i = 0; i < this.players.length; i++){
            let j = this.players[i] === this.house ? 1 : 0;
            let cards = [];
            while (j <= 2) {
                cards.push(this.deck.drawOne());
                j++;
            }
            this.players[i].hand = cards;
        }
    }
    blackjackClearPlayerHandsAndBets = () => {
        for (let i = 0; i < this.players.length; i++){
            this.players[i].hand = [];
            this.players[i].bet = 0;
        }
    }
    getTurnPlayer = () => {

    }
    haveTurn = (userData) => {
        switch (this.gamePhase) {
            case 'betting':
                for (let i = 0; i < this.players.length; i++){
                    this.players[i].promptPlayer(userData);
                    this.getTurnPlayer();
                    this.evaluateMove(userData);
                }
                this.gamePhase = 'acting';
                break;
            case 'acting':
                for (let i = 0; i < this.players.length; i++) {
                    this.players[i].promptPlayer(userData);
                    this.getTurnPlayer();
                    this.evaluateMove(userData);
                }
                break;
            case 'roundOver':
                this.turnCounter++;
                this.blackjackEvaluateAndGetRoundResults();
                break;
            default:
                break;
        }
    }
    onFirstPlayer = () => {
        return this.players[0] === this.getTurnPlayer();
    }
    onLastPlayer = () => {
        return this.players[this.players.length - 1] === this.getTurnPlayer();
    }
    allPlayerActionsResolved = () => {
        for (let i = 0; i < this.players.length - 1; i++){
            if (this.players[i].gameStatus === null) return false;
        }
        return true;
    }
}

// let table1 = new Table('ai', 'blackjack');
// while (table1.gamePhase != 'roundOver') {
//     table1.haveTurn();
// }
let deck = new Deck();
deck.shuffle();
deck.resetDeck()
console.log(deck.deck)
