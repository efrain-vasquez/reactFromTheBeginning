import React from "react";

function Home(props) {
  console.log(props);
  props.history.block("Are you sure you want to leave?");
  return <h1>{props.title}</h1>;
}

export default Home;
