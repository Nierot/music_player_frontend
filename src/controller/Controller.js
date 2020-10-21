import { EventEmitter } from 'events';
import React from 'react';
import AskForPlayerCode from './AskForPlayerCode';
import ControlPanel from './ControlPanel';

export default class Controller extends React.Component {
  
  constructor() {
    super();
    this.state = { code: undefined }
    window.controllerEvents = new EventEmitter();
  }

  componentDidMount() {
    if (sessionStorage.getItem('playerCode')) {
      this.setState({ code: sessionStorage.getItem('playerCode') })
    }
    window.controllerEvents.on('playerCodeSubmitted', code => {
      this.setState({ code: code })
      sessionStorage.setItem('playerCode', code);
    })
  }

  render() {
    return (
      <div className="Controller">
        {this.state.code ? <ControlPanel playerCode={this.state.code}/> : <AskForPlayerCode/>}
      </div>
    )
  }
}