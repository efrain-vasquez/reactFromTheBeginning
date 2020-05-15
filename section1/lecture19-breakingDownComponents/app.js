const data = [
  {
    name: "Rio de Janeiro",
    price: "$92/night average"
  },
  {
    name: "Florence",
    price: "$91/night average"
  },
  {
    name: "Cape Town",
    price: "$100/night average"
  },
  {
    name: "Lisbon",
    price: "$75/night average"
  },
  {
    name: "Milan",
    price: "$104/night average"
  },
]

const data2 = [
  {
    name: "Dominican Republic",
    price: "$103/night average"
  },
  {
    name: "Puerto Rico",
    price: "$121/night average"
  },
  {
    name: "Florianopolis",
    price: "$71/night average"
  },
  {
    name: "Punta Del Este",
    price: "$158/night average"
  },
  {
    name: "Dubai",
    price: "$120/night average"
  },
]

ReactDOM.render(
  // This is the what that ReactDOM.render will be display
  <div className="container cities">
    {/* This is our component with its props*/}
    <CitiesContainer data={data} />
    <CitiesContainer data={data2} />
  </div>,
  // This is the where that ReactDOM.render will be in charge of
  document.getElementById('root')
);