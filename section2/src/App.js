import React, { Component } from "react";
import "./App.css";
//import StateInAction from "./StateInAction";
//import SimpleEvents from "./SimpleEvents";
//import EventAndState from "./EventAndState";
//import StatePractice from "./StatePractice";
import CardSet from "./CardSet";
import cards from "./cards";

console.log(cards);

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* The reason we pass it down as props instead of importing it directly is because of reuseablility. This component may be reused many times and either in this application or others and if thats the case we dont want the file itself imported here because its not reuseable unless we change the import line every time we reuse it. Another reason is props are immutable so the component CardSet does not have to worry about managing the data changing where props is being set from.  */}
        <div className="row">
          <CardSet cards={cards} />
        </div>
      </div>
    );
  }
}
export default App;
