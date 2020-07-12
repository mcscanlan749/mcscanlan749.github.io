import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//const e = React.createElement;

function Square(props){
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	);
}

class Board extends React.Component {
  
  renderSquare(buttonVal) {
    return (
		<Square 
			value={buttonVal}
			onClick={() => this.props.onClick(buttonVal)}
		/>
	);	
  }

  render() {

    return (
      <div>
	    <div className="calculation">{this.props.equation}</div>
        <div className="board-row">
          {this.renderSquare("7")}
          {this.renderSquare("8")}
          {this.renderSquare("9")}
		  {this.renderSquare("/")}
        </div>
        <div className="board-row">
          {this.renderSquare("4")}
          {this.renderSquare("5")}
          {this.renderSquare("6")}
		  {this.renderSquare("*")}
        </div>
        <div className="board-row">
          {this.renderSquare("1")}
          {this.renderSquare("2")}
          {this.renderSquare("3")}
		  {this.renderSquare("-")}
        </div>
		<div className="board-row">
          {this.renderSquare("C")}
          {this.renderSquare("0")}
          {this.renderSquare("=")}
		  {this.renderSquare("+")}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  history: [],
		  clear: false,
		  count: 0,
		  current: "",
	  };
  }
  
  handleClick(buttonVal){
	var history = this.state.history.slice();
	var current = this.state.current;
	var count = this.state.count;
	var clear = this.state.clear;
	  
	if (buttonVal === "C"){
		this.setState({
		  current: "",
	  });
	} else if (buttonVal === "="){
	  var answer = eval(current);
	  current = current + "=" + answer;
	  history = history.concat(current);
	  clear = true
	  count++;
	  if (count > 10){
		  history.shift();
	  }
	  this.setState({
		  history: history,
		  current: answer,
		  count: count,
		  clear: clear,
	  });
	} else {
		if (clear){
			current = "";
			clear = false;
		}
		current = current + buttonVal;
		this.setState({
			current: current,
			clear: clear
		});
	}
  }
  
  render() {
	const status = 'Calculator History:';
	const history = this.state.history;
	const current = this.state.current;
	
	const calculations = history.slice().reverse().map(move => {
		return (
			<div>
				{move}
			</div>
		);
	});
	
    return (
      <div className="game">
        <div className="game-board">
          <Board 
			equation={current}
			onClick={(buttonVal) => this.handleClick(buttonVal)}
		  />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className="history">{calculations}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



