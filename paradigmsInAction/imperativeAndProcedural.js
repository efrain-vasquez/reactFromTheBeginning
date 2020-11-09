// The imperative and procedural paradigm are very straight forward. When you just write a comment and you just write the code that deals with that comment.

// imparative = mutate state whenever we want to
// procedural = no association between data and methods/functions

// these are global variables anyone can change anytime they want
const theDeck = [];
const playerHand = [];
const player2Hand = [];

// due to the nature of this paradigm we can not use a class

// If we were making a gae we would want these in fuctions because we are going to be calling them many times. Every time there is a new hand we will want to call them. neither one of these functions take parameters because we are not worried about protecting state, they just do there job.

function createDeck() {
  // make a deck of cards
  const suits = ["h", "s", "d", "c"];
  for (let s = 0; s < 4; s++) {
    for (let c = 1; c <= 13; c++) {
      theDeck.push(c + suits[s]);
    }
  }
}

function shuffleDeck() {
  //shuffle the deck
  for (let i = 0; i < 10000; i++) {
    let card1Index = Math.floor(Math.random() * theDeck.length);
    let card2Index = Math.floor(Math.random() * theDeck.length);
    const temp = theDeck[card1Index];
    theDeck[card1Index] = theDeck[card2Index];
    theDeck[card2Index] = temp;
  }
}

createDeck();
shuffleDeck();

// deal a card
console.log(theDeck.length);
// we are changing the array right here right now there is no protection in place its just done
playerHand.push(theDeck.shift());
player2Hand.push(theDeck.shift());
console.log(theDeck.length);
console.log(playerHand);
