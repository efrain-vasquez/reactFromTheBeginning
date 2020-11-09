// oop = data and methods are encapsulated
// Functional = pure functions with shared state
//these two are a little bit in conflict because the data being encapsulated in a class and then also having some kind of shared state, that is confusing because those two dont seem to go together.

//we want to make a Deck object but where do we want the data to live, because the methods simply return data. In the imperative example we had a constructor and a
// this.deck = [] and thats what we mutated but we will avoid doing that here.
//One thing we can do is put an individual store inside of every class that we make, and let them manage themselves. Doing it this way every method is essentially a static method that returns some data it is just going to get sent back to the store within that class because within that class in the constructor we will have a this.store = this.theStore. so this.store is our state which can be mutated by running theStore()
class Deck {
  constructor() {
    this.store = this.theStore();
  }
  createDeck() {
    const theDeck = [];
    const suits = ["h", "s", "d", "c"];
    for (let s = 0; s < 4; s++) {
      for (let c = 1; c <= 13; c++) {
        theDeck.push(c + suits[s]);
      }
    }
    return theDeck;
  }

  shuffleDeck(freshDeck) {
    //shuffle the deck
    const deck = [...freshDeck];
    for (let i = 0; i < 10000; i++) {
      let card1Index = Math.floor(Math.random() * deck.length);
      let card2Index = Math.floor(Math.random() * deck.length);
      const temp = deck[card1Index];
      deck[card1Index] = deck[card2Index];
      deck[card2Index] = temp;
    }
    return deck;
  }
  theStore = () => {
    // this is where we keep our stuff! And nobody messes with it
    const state = {}; //rootReducer
    return {
      setState: (prop, value) => (state[prop] = value),
      getState: (prop) => state[prop],
    };
  };
}

class Hand {
  addCardToHand(hand, deck, index) {
    const newHand = [...hand];
    const newDeck = [...deck];
    newHand.push(newDeck[index]);
    return newHand;
  }
}

// we need some share state!
const theStore = () => {
  // this is where we keep our stuff! And nobody messes with it
  const state = {}; //rootReducer
  return {
    setState: (prop, value) => (state[prop] = value),
    getState: (prop) => state[prop],
  };
};

// here we are creating a new variable and setting it equal to an instantiation of Deck, which means deckObj now has a this.store because it got created as soon as the object was created, it has a createDeck which we can throw inside of store.setState or store.getState and it has a shuffleDeck and a createDeck.
//we make a deckObj
const deckObj = new Deck();
//here we are creating a new deck by creating a newDeck variable and assining it to our decObj and calling createDeck on it
//we called createDeck on that decObj and we store the return value which is an array in newDeck
const newDeck = deckObj.createDeck();
//here we are shuffling our newDeck by creating a new variable called shuffleDeck assigning it to our decObj calling shuffleDeck on it and passing it our newDeck
//we take newDeck and we pass it to our decObj's shuffleDeck method and we store it in shiffleDeck
const shuffleDeck = deckObj.shuffleDeck(newDeck);
//here to store it inside of our Deck class we would call deckObj.store because we have a store property on the class Deck which is the return value of theStore() and we would want to call setState to set the deck and we would want to put shuffled deck in there.
//then we take shuffleDeck we hand it to setState of the store of our decObj which is the return value of theStore which is an object with two functions as properties setState and getState which have access to the variable state in there local scope. we can do the same thing for hand or any other class in our application
deckObj.store.setState("deck", shuffleDeck);

// There is a second option to organize the app. we can use the store globally like we do with redux and get rid of all the individual stores inside of the classes or components. In that case our classes just end up basically being just full of static methods that are grouped together but actually put everything inside of the store. But in doing it this way the methods dont return anything they call setState instead and then we would pass it our Object.
