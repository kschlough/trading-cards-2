// var is the old pre-2015 version, use 'let' here or 'const' if not changing
const tradingCardData = [
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

//instead of passing in a prop we want to make a network request to fetch it
// tradingCardData will be empty until we retrieve it using network request to the API
// if you want the frontend to re-render, you have to use useState hook --> so tradingCardData changes from empty list to something
//
function TradingCardContainer() {  

  // how do we hit the server so we can update tradingCardData variable?
  // fetch is kind of a replacement for jquery $()
  // network requests are side effects, you don't want to wait for them 

  React.useEffect(() => {
    // fetch is JS standard
    fetch('/cards.json')
    // fetch is a way to initiate an HTTP get - similar to the jQuery .get function
    // fetch presents the response it gets differently from jQuery
    // JS gives you a response object that has properties to tell you the query success - e.g. 200 HTTP status
    .then((response) => response.json()) // parse the response into json
    // when the response comes in, JS puts data from body of the response into the response object data property
    .then((data) => setUpdateCards(data))
    // the list is data.cards
    // (data) => {setUpdateCards(data.cards);}, []) // empty means it'll only happen the 1st time
    // add an end state so it only happens the first time the function gets called
    // useEffect calls the function every time the component is rendered (can be infinite loop)
    // give it a list of dependencies (optional 2nd argument) - variables
    // only happens if anything in the list changes
    .catch((err) => console.error(err))
    // .then --> fetch doesn't just return response object, it returns a Promise that returns response object
    // call fetch, get promise back immediately, then in future when you need the data, access the response in the Promise
    // .then is a function

  });
  
  const floatCard = {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  };
  
  const [cards, setUpdateCards] = React.useState([floatCard]);
  // updateCards is a function that you can use to update the state
  // the whole component will re-render if you call updateCards
  // use empty list as starting state


  const tradingCards = [];

  // !cards checks if it's falsy
  if (!cards) return <div>Loading...</div>

  //const tradingCard = tradingCardData[0]
  // for (const tradingCard of tradingCardData)
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
    // can use fragment
    // return (
    //   <React.Fragment>
    //     {tradingCards}
    //   </React.Fragment>
    // )
    // can also look up .map and object destructuring
    // {tradingCardData.map(({name, skill, imgUrl}) => <TradingCard name={name} skill={skil} etc.)}
  );
}

ReactDOM.render(
  // this is where you pass in the skill, name, etc
  // <TradingCardContainer 
        // skill={tradingCard.skill} 
        // name={tradingCard.name} 
        // imgUrl={tradingCard.imgUrl} />
  // loop through with tradingCards={tradingCardData}/>
  <TradingCardContainer />,
  document.getElementById('container')
);


// What's the smallest thing I want to put on the screen?
  // think about the pieces of the larger application
  // something similar but multiple of them: good indication you should make a React component
    // think about how to make a single one
          
          const tradingCard = tradingCardData[0];
          // for single trading card
          
          function TradingCard(props) {
            return (
              // classname turns into the html class attribute so you can use css
              <div className='card'>
                <p>{props.skill}</p>
                <p>{props.name}</p>
                <img src={`${props.imgUrl}`}/>
                {/* use template string `` */}
                {/* html element is a string, but we're filling in the value with JS */}
                {/* using a React self-closing tab above */}
              </div>
            )
          }
          // then the reactDOM.render goes after this

          // instead of making one, now we want to make multiple
          // writing a loop will get a little weird, this is why we do the function TradingCardContainer(props) above



            // what data do you need to give it so that it can render?
                // skill, name, image
            // pass data to React component using props

            // how to pass props to the component?
            // ask yourself: how do I build this with hardcoded data? 
            // then, how do I get the data from the backend 
            // do it piece by piece to make sure everything works, otherwise won't know where it broke
