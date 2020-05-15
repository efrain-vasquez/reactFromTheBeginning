let cards = data.map((course, i) => {
  return (<Card key={i} data={course} />
  )
})
console.log(cards);


ReactDOM.render(
  <div className="row" >
    {/* now all we need to do is hand render cards because JSX will be able to unpack that array with four components in it and treat it (turn it into) just like what was written below. */}

    {cards}

    {/* <Card data={data[0]} />
    <Card data={data[1]} />
    <Card data={data[2]} />
    <Card data={data[3]} /> */}
  </div>,
  document.getElementById('root'));

