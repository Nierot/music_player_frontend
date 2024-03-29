import React from 'react';
import { getQueryParam } from '../lib/core';
import './PlayPlaylist.css';

export default class PlayPlaylist extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      wantEvents: false,
      songsBetweenEvents: 20,
      listOfPeople: [],
      eventTypes: []
    };

    this.toPlayer = this.toPlayer.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleNumberOfSongsChange = this.handleNumberOfSongsChange.bind(this);
    this.parseList = this.parseList.bind(this);
    this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
  }

  toPlayer() {
    if (!localStorage.getItem('spotifyAccess')) {
      alert('You are not logged into spotify! Sending you back to home to login');
      return window.location.replace('/');
    }
    if (this.state.listOfPeople.length === 0) {
      return this.setState({ listOfPeople: ['List', 'Of', 'People', 'Undefined', 'Good', 'Job']})
    }

    if (this.state.eventTypes.length === 0) {
      return this.setState({ eventTypes: ['adtrad'] })
    }
    const params = new URLSearchParams({
      p: getQueryParam('p'),
      events: this.state.wantEvents,
      listOfPeople: this.state.listOfPeople,
      songsBetweenEvents: this.state.songsBetweenEvents,
      eventTypes: this.state.eventTypes
    })
    window.location.replace('/player?' + params.toString());
    // window.location.replace(`/player?p=${getQueryParam('p')}&events=${this.state.wantEvents}&listOfPeople=${this.state.listOfPeople}&songsBetweenEvents=${this.state.songsBetweenEvents}`);
  }

  handleEventChange(e) {
    this.setState({ wantEvents: e.target.checked });
  }
  
  handleNumberOfSongsChange(e) {
    this.setState({ songsBetweenEvents: e.target.value });
  }

  handleEventTypeChange(e) {
    this.setState({ eventTypes: [...e.target.selectedOptions].map(elem => elem.value) });
  }

  parseList(e) {
    let text = e.target.value;
    let people = text.split(',');
    this.setState({ listOfPeople: people });
  }

  TableOfPeople() {
    if (!this.state.listOfPeople) return null;
    return (
      <div className="TableOfPeople">
        <table>
          <tbody>
            {this.state.listOfPeople.map(person => <tr key={Math.random()}>{person}</tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  //[ 'adtrad', 'opus', 'water', 'adtwedstrijd', 'bierestafette', 'leeg' ];
  render() {

    return (
      <div className="PlayPlaylist">
        <h1>Play options</h1>

        Events?:
        <input type="checkbox" id="wantEvents" onChange={this.handleEventChange}/>
        
        {this.state.wantEvents ?
          <div className="wantEvents">
            Number of songs between events:
            <input type="number" defaultValue={20} onChange={this.handleNumberOfSongsChange}/>
            Which events do you want?
            <select name="typeOfEvents" onChange={this.handleEventTypeChange} multiple>
              <option value="adtrad">Adtrad</option>
              <option value="water">Water</option>
              <option value="adtwedstrijd">Adt Wedstrijd</option>
              <option value="bierestafette">Bier estafette</option>
              <option value="opus">Opus</option>
            </select>
            <br/>
            List of people participating in the events (comma-seperated):
            <br />
            <textarea id="listOfPeople" onChange={this.parseList}/>
            {this.TableOfPeople()}
          </div>
        : null }

        <button className="button" onClick={this.toPlayer}>Play!</button>
      </div>
    )
  }
}