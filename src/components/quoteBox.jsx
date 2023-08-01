import React, { Component } from 'react'


export default class QuoteBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: [],
      randomQuote: null,
      loading: true,
      color: '0 0 0'
    }
    this.chooseRandomQuote = this.chooseRandomQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateRandomColor = this.generateRandomColor.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const quotes = await response.json();
      this.setState({quotes: quotes, loading: false}, () => {
        this.chooseRandomQuote();
      });
      this.generateRandomColor();
      } catch (error) {
      console.log(error)
    }
  }

  chooseRandomQuote() {
    if (this.state.loading) {
      return;
    }
    let arrLen = this.state.quotes.length;
    let randomQuote = this.state.quotes[Math.floor(Math.random() * arrLen)]
    // console.log(randomQuote)
    this.setState({randomQuote: randomQuote})
  }

  generateRandomColor(){
    let r = Math.floor(Math.random() * 255 );
    let g = Math.floor(Math.random() * 255 );
    let b = Math.floor(Math.random() * 255 );

    this.setState({
      color: `${r} ${g} ${b}`
    })
  }

  handleClick(e) {
    e.preventDefault();
    this.chooseRandomQuote();
    this.generateRandomColor();
  }

  render() {

    if (this.state.randomQuote === null) {
      return 'loading...'
    }

    return (
      <div className="container-main" style={{backgroundColor: `rgb(${this.state.color})`}}>
        <div id="quote-box" className="container-fluid" >
          <div className="text-container">
            <i className="fa fa-quote-left quote-icon" style={{color: `rgb(${this.state.color})`}}></i>
            <span id="text" style={{color: `rgb(${this.state.color})`}}>{this.state.loading || this.state.randomQuote === null ? '' : this.state.randomQuote.text}</span>
          </div>
          <div className="author-container" style={{color: `rgb(${this.state.color})`}}>
            <span id="author">- {this.state.loading || this.state.randomQuote === null ? '' : this.state.randomQuote.author.split(',')[0]}</span>
          </div>

          <div className="btn-container">
            <a href="https://www.twitter.com/intent/tweet" id="tweet-quote" className="icon-container" target="_blank" style={{backgroundColor: `rgb(${this.state.color})`}}>
              <i className="fa-brands fa-twitter" style={{color: "white"}}></i>
            </a>
            <button id="new-quote" className="btn" style={{backgroundColor: `rgb(${this.state.color})`, color: "white"}} onClick={this.handleClick}>New Quote</button>
          </div>
        </div>
      </div>
    )
  }
}
