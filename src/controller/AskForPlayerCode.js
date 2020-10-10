import React from 'react';

export default class AskForPlayerCode extends React.Component {

  componentDidMount() {
  }

  submitPlayerCode() {
    let input = document.querySelector('#playerCodeInput').value;
    console.log(input);
    if (!input || input.length !== 4) {
      alert('Not a valid player code');
    } else {
      window.controllerEvents.emit('playerCodeSubmitted', input);
    }
  }

  render() {
    return (
      <center className="AskForPlayerCode">
        <input id="playerCodeInput" type="text" placeholder="Player Code"/>
        <button id="submitPlayerCode" onClick={this.submitPlayerCode}>Submit</button>
      </center>
    )
  }
}