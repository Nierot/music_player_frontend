import React from 'react';
import './CreateNewPlaylist.css';
import $ from 'jquery';
import { API } from '../settings';

export default class CreateNewPlaylist extends React.Component {

  createPlaylist = () => {
    let _name = $('.name');
    let _max = $('.maximum').val();
    let _public = $('.public').val();
    let _nameHT = $('.nameHelpText');
    let _duplicates = $('duplicates').val();
    let _allowSpotify = $('typesSpotify').val();
    let _allowMP3 = $('typesMP3').val();
    let _allowYoutube = $('typesYouTube').val();

    if (_name.val() == '') {
      _name.addClass('is-danger')
      _nameHT.show();
    }

    _name = _name.val();

    if (_max === 'Unlimited') _max = -1;

    _public = _public === true ? 'public' : 'private';

    fetch(`${API}playlist`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: _name,
        type: _public,
        user: '', //TODO
        settings: {
          duplicates: _duplicates,
          allowYoutube: _allowYoutube,
          allowSpotify: _allowSpotify,
          allowMP3: _allowMP3,
          maxLength: _max
        }
      }
    })
  }

  componentDidMount() {
    let _name = $('.name');
    let _nameHT = $('.nameHelpText');
    _nameHT.hide();
    _name.on('click', () => {
      _name.removeClass('is-danger');
      _nameHT.hide();
    })
  }

  render() {
    return (
      <div className="CreateNewPlaylist">
        <h1>Create a new playlist</h1>
        <div className="form">

          <div className="control">
            <label className="label">
              Name:
              <input className="input name" type="text" name="name" onClick={this.removeDanger}/>
            </label>
            <p className="help nameHelpText" hidden>Please enter a name</p>
          </div>

          <div className="control">
            <label className="label">
              Maximum of songs:
            </label>
            <div className="select">
              <select defaultValue="Unlimited" className="maximum">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
                <option>Unlimited</option>
              </select>
            </div>
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked className="public"/> 
              &nbsp;
              I want my playlist to be public
            </label>
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked className="duplicates"/> 
              &nbsp;
              Allow duplicates
            </label>
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked className="typesSpotify"/> 
              &nbsp;
              Allow spotify
            </label>
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked className="typesMP3"/> 
              &nbsp;
              Allow MP3
            </label>
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked className="typesYouTube"/> 
              &nbsp;
              Allow YouTube
            </label>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={this.createPlaylist}>Submit</button>
            </div>
            <div className="control">
              <a href="/playlist">
                <button className="button is-link is-light" >Cancel</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}