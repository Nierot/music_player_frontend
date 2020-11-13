import { EventEmitter } from 'events';
import React from 'react';
import { getQueryParam } from '../lib/core';
import AskForPlayerCode from './AskForPlayerCode';
import ControlPanel from './ControlPanel';

export default class Controller extends React.Component {
  
  constructor() {
    super();
    this.state = { code: undefined }
    window.controllerEvents = new EventEmitter();
  }

  componentDidMount() {
    if (getQueryParam('code')) {
      this.setState({ code: getQueryParam('code') });
    }
    window.controllerEvents.on('playerCodeSubmitted', code => {
      this.setState({ code: code })
      let url = new URLSearchParams();
      url.append('code', code);
      window.location.href = window.location.href + '?' + url;
    })
  }

  refresh() {

  }

  render() {
    return (
      <div className="Controller">
        {this.state.code ? <ControlPanel playerCode={this.state.code}/> : <AskForPlayerCode/>}
      </div>
    )
  }
}