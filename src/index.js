import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Each square represents a button on the calculator
function Square(props){
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	);
}

//The board renders each of the calculator's buttons
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

//The Game stores and displays the history of the moves, along with a board
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
	var history = this.state.history.slice(); //represents the history of all equations
	var current = this.state.current; 		  //represents the equation the user is currently typing
	var count = this.state.count;  			  //represents total number of equations
	var clear = this.state.clear;  			  //represents when we should clear the current equation
	  
	if (buttonVal === "C"){ //Clear the current equation
		this.setState({
		  current: "",
	  });
	} else if (buttonVal === "="){ //If the user clicked equals, add the full equation to the history
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
	} else {  //Keep adding to current equation until we want to evaluate
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
	
	const calculations = history.slice().reverse().map(move => { //displays the history
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



