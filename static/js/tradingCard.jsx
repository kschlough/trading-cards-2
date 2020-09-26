var tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',  
    imgUrl: '/static/img/balloonicorn.jpg'
  },

  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  },

  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg'
  }
];

function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {  

  React.useEffect(() => {
    // fetch is JS standard
    fetch('/cards.json')
    // fetch is a way to initiate an HTTP get - similar to the jQuery .get function
    // fetch presents the response it gets differently from jQuery
    // JS gives you a response object that has properties to tell you the query success - e.g. 200 HTTP status
    .then((response) => response.json())
    // when the response comes in, JS puts data from body of the response into the response object data property
    .then((data) => updateCards(data))
    // .then --> fetch doesn't just return response object, it returns a Promise that returns response object
    // call fetch, get promise back immediately, then in future when you need the data, access the response in the Promise
    // .then is a function

  });
  
  const floatCard = {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  };
  
  const [cards, updateCards] = React.useState([floatCard]);

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.name}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }

  return (
    <div>{tradingCards}</div>
  );
}

ReactDOM.render(
  // this is where you pass in the skill, name, etc
  //<TradingCardContainer skill='knitting' name='Balloonicorn' imgUrl='/static/img/balloonicorn.jpg' />
  <TradingCardContainer />,
  document.getElementById('container')
);


// What's the smallest thing I want to put on the screen?
  // think about the pieces of the larger application
  // something similar but multiple of them: good indication you should make a React component
    // think about how to make a single one
          
          function TradingCard(props) {
            return (
              <div>
                <p>{props.skill}</p>
                <p>{props.name}</p>
                <img src={`${props.imgUrl}`}/>
                {/* use template string `` */}
                {/* html element is a string, but we're filling in the value with JS */}
                {/* using a React self-closing tab above */}
              </div>
            )
          }

            // what data do you need to give it so that it can render?
                // skill, name, image
            // pass data to React component using props

            // how to pass props to the component?
            // ask yourself: how do I build this with hardcoded data? 
            // then, how do I get the data from the backend 
            // do it piece by piece to make sure everything works, otherwise won't know where it broke
