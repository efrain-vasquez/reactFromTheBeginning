//Inprocedural and functional paradigm we have to  set up some mechanisms to protect our state so that we are not mutating it
// this is like react with redux where we use this.setState, in this.setState we never use an equal sign we always hand off the data to someone else to an action which goes to a reducer which goes to the store which comes back around. JS is not made to be a native functional language but it is capable of doing it.

// Procedural = no association between data and methods
// Functional = pure functions (which means they need to always do the same thing reguardless of the data that they get, they always need to return the same thing) with shared state. There is no mutating of the state unless it is within its local scope.

// These need to be pure functions meaning they always need to do the same thing, they can mutate an an internal variable but they do not change scope outside of themselves. They are pure because regardless of the data they get they always need to return the same thing.
function createDeck() {
  const theDeck = [];
  const suits = ["h", "s", "d", "c"];
  for (let s = 0; s < 4; s++) {
    for (let c = 1; c <= 13; c++) {
      //this builds the array
      theDeck.push(c + suits[s]);
    }
  }
  //then it returns the array and its done it has not changed anything outside of itself it is a pure function
  return theDeck;
}

// in the case of shuffleDeck() we are going to need a parameter in the function above we did not need a parameter because it will always generate the same array, but here we are going to get something and we are going to need to work with it
function shuffleDeck(freshDeck) {
  // this function shuffles the deck
  // deck is a local variable that is not getting changed outside of this scope
  const deck = [...freshDeck];
  for (let i = 0; i < 10000; i++) {
    let card1Index = Math.floor(Math.random() * deck.length);
    let card2Index = Math.floor(Math.random() * deck.length);
    // temp is a local variable that is not getting changed outside of this scope
    const temp = deck[card1Index];
    deck[card1Index] = deck[card2Index];
    deck[card2Index] = temp;
  }
  // when we are done we will return deck so who ever calls shuffleDeck will get back a brand new thing called deck which will be a deck that has been shuffled.
  return deck;
}

// we need some share state! Why?
// we run into a problem because when we need to deal a card, if we make a variable and assign that variable to a function and pass it something but we are going to have a new line every single time we create a variable and that's not going to create a game because the game because the game needs to be interactive. We are going to have to make decisions that we cannot code for we cannot lan for. so we to solve this we need some shared state.
const theStore = () => {
  // this is where we keep our stuff! And nobody messes with it
  const state = {}; // this is the equivalent to our rootReducer
  // to keep someone from mutating the state we will have a setState property which will be a function and it will have a getState property which is also a function
  return {
    // we are definitly mutating state here but we have it in a very protected and controlled place, one place that has very predictable andfollowable rules.
    // setState() is the only function that has access to its local scoe which has in it the variable state, so it is the only function that can change state. So setState() is going to change this internal variable (closure: variable only accessed within its local scope) and it will grab the property that who ever called this function wants to change and overwrite it with the value they sent. This is the only function that can do this because it tis the only function with access to the local scope of this variable.
    setState: (prop, value) => (state[prop] = value),
    // this function allows us to get the data we want from the variable state
    // all you need to know is what property you want, getState() will grab the property you want and return it to you
    getState: (prop) => state[prop],
  };
};

function addCardToHand(hand, deck, index) {
  // here we are making a copy of hand and not mutating hand itself
  const newHand = [...hand];
  // the same for deck, they are no longer associated with the variables they were copied from
  const newDeck = [...deck];

  newHand.push(newDeck[index]);
  return newHand;
}

// what will be inside f store is the return value of theStore(), which is an object with two functions inside of it. these two functions will always have access to there local scope which includes our state variable. This is how a closure will help us to keep our state from being mutated by any code other than the one that belongs to this local scope. It knows about state forever but because the return value has already come and gone and because theStore() has already been declared when it was run right before the return happened, no one outside of its local scope can access its local scope variable.
// Because of this we can use the two functions inside of theStore() to change state but no one else can access it. so in a sense getState() and setState() are like reducers with actions inside. in essence theStore() has its own local scope which returns a function which has its own local scope which returns a function and allows us to pass it something so we can change the state variable that is local to that scope.
const store = theStore();
// this is simply now a global variable but it was not mutated in any way
const theDeck = createDeck();
// by creating this variable we never mutated theDeck we simply made a new variable and passed it theDeck.
const shuffledDeck = shuffleDeck(theDeck);
// setState is looking for a prop and a value.
store.setState("deck", shuffledDeck);
store.setState("playersHand", []);
store.setState("dealersHand", []);
store.setState("placeInDeck", 0);
//this will give us a new array. which will be the return value of newHand from the function addCardToHAnd(), and we take that and place it inside of playersHand
const playerHandAfterDeal = addCardToHand(
  //get the players hand
  store.getState("playersHand"),
  //get the deck
  store.getState("deck"),
  //where we are in the deck
  store.getState("placeInDeck")
);
//we use playersHand as the prop for the setState function and replace it with the value playerHandAfterDeal.
store.setState("playersHand", playerHandAfterDeal);
store.setState("placeInDeck", store.getState("placeInDeck") + 1);
