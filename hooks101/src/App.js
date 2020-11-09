import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>Counter: {counter}</div>
      <div>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Add 1!
        </button>
      </div>
    </div>
  );
}

export default App;

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// class App extends Component {
//   state = { counter: 0 };

//   updateCounter = () => {
//     this.setState({
//       counter: this.state.counter + 1,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <div>Counter: {this.state.counter}</div>
//         <div>
//           <button onClick={this.updateCounter}>Add 1!</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
