function Homepage() {
  return (
    <React.Fragment>
      <h1>Welcome to Balloonicorn's Trading Cards Site</h1>
      <img src="/static/img/balloonicorn.jpg" id="homepage_pic"/>

      <p>This is a great site for viewing trading cards.</p>

      <a href="/cards-jquery">
        Click here to view the trading cards page in JQuery.
      </a>
      <br/>
      <a href="/cards">
        Click here to view the trading cards page in React.
      </a>
    </React.Fragment>
  );
}

ReactDOM.render(<Homepage />, document.getElementById('app'));
