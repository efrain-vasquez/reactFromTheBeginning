//in imparative and OOP we are mutating variables but we are doing it in these encapsulated little objects

// imparative = mutate state whenever we want to
// oop = data and methods are encapsulated

class Deck {
  constructor() {
    //we are using "this" which means the data belongs to the object
    this.deck = [];
  }
  // and since the data belongs to the object inside here we can do crete deck
  createDeck() {
    const suits = ["h", "s", "d", "c"];
    for (let s = 0; s < 4; s++) {
      for (let c = 1; c <= 13; c++) {
        // we are able to mutate the deck which we created up above because it is inside of the objects, this means we can do a .push and mutate the deck. The function createDeck() can change the data because it is associated with the data, because it is inside of the same object.
        this.deck.push(c + suits[s]);
      }
    }
  }

  // in this function we are also mutating still interacting with essentially the same data type anyway but we are doing it internal to the object which means the object still has full control over the data and the changing of the data, and it mutates data without any reguard for purity or shared state or anything because the object manages itself
  shuffleDeck() {
    for (let i = 0; i < 10000; i++) {
      let card1Index = Math.floor(Math.random() * this.deck.length);
      let card2Index = Math.floor(Math.random() * this.deck.length);
      const temp = this.deck[card1Index];
      this.deck[card1Index] = this.deck[card2Index];
      this.deck[card2Index] = temp;
    }
  }
  // the object itself will be changing its own data (mutating the array.)
  dealCard() {
    // and then it sends it off it does not need to save it because its not part of the object anymore
    return this.deck.shift();
  }
}

// new deck
const theDeck = new Deck();
// run these two functions internally it will change itself it is going to change its own data, that data is related to the methods internally to the object
theDeck.createDeck();
theDeck.shuffleDeck();

console.log(theDeck.deck);
console.log(theDeck.dealCard());
