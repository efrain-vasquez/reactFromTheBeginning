import React, { Component } from "react";
//import App from "./App";
import Card from "./Card";

class CardSet extends Component {
  constructor() {
    super();
    this.state = {
      chosenCards: [],
    };
  }

  saveCourse = (index) => {
    console.log(index);

    // We should never change the state, we should allow React to change the state.
    // this is an example of what not to do
    // this.state.chosenCards.push(this.props.cards(index))

    // We have to do things the functional way we have to tell React what we want to update and what we want to change it to.
    // We need to pass setState the correct thing without mutating it, so we make a constant and we pass the constant instead. We use the spread operator or we can use slice to make a copy of the original array thereby we do not mutate the original array.

    //const copyOfCards = this.state.chosenCards.slice();
    const copyOfCards = [...this.state.chosenCards];
    // now that we have a copy we can mutate or change that copy without mutating or changing the original. In this case we are going to push the index on to the copy we just made.
    copyOfCards.push(this.props.cards[index]);
    // now we can take that copy and pass it to our setState and this will work the way we need it to
    this.setState({
      // here we say make chosenCards look like copyOfCards which is an exact copy of the original piece of state but we mutated it and pushed on a new thing. This is important because we need to make sure React is in charge of changing state and not us.
      chosenCards: copyOfCards,
    });
  };

  render() {
    console.log(this.state.chosenCards);
    // this.props is immutable at least as far as CardSet is concerned, if it changes that has nothing to do with CardSet because it is App.js who is passing the props to CardSet.

    const savedCards = this.state.chosenCards.map((card, i) => {
      return <Card key={i} card={card} />;
    });

    const cardList = this.props.cards.map((theCard, i) => {
      return (
        <div className="col s2" key={i}>
          <Card card={theCard} />
          <button
            onClick={() => {
              this.saveCourse(i);
            }}
            className="btn waves-light waves-effect"
          >
            Save
          </button>
        </div>
      );
    });

    return (
      <div>
        {cardList}
        {savedCards};
      </div>
    );
  }
}

export default CardSet;
