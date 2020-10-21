import React from 'react';
import { REST } from '../settings';
import $ from 'jquery';
import './AskForPlayerCode.css';

export default class AskForPlayerCode extends React.Component {

  constructor(props) {
    super(props);

    this.submitPlayerCode = this.submitPlayerCode.bind(this)
  }

  async checkCode(input) {
    return await fetch(REST + 'controller/check', {
      method: 'POST',
      body: JSON.stringify({
        playerCode: input
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }

  async submitPlayerCode() {
    let input = document.querySelector('#playerCodeInput').value;
    
    let check = await this.checkCode(input);

    if (!input || input.length !== 4) {
      return
    } else if (check.status === 400) {
      alert('Player does not exist');
    } else {
      window.controllerEvents.emit('playerCodeSubmitted', input);
    }
  }

  componentDidMount() {
    $('.AskForPlayerCode').height($('html').height())
  }

  render() {
    return (
      <div className="AskForPlayerCode">
        <h2>Enter the code given in the top left of the player:</h2>
        <div className="columns">
          <input class="input column" id="playerCodeInput" type="text" placeholder="Player Code" onInput={this.submitPlayerCode}/>
        </div>
      </div>
    )
  }
}