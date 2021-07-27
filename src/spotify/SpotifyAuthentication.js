import React from 'react';
import { getQueryParam, refreshToken } from '../lib/core';
import { SPOTIFY_AUTH, REDIRECT_URI } from '../settings';


export default class SpotifyAuthentication extends React.Component {

  CLIENT_ID = '5bf6a2aacb4d46e9bebec0f9453a7781';

  constructor(props) {
    super(props);

    this.redirectToSpotify = this.redirectToSpotify.bind(this);
    this.getAccessTokens = this.getAccessTokens.bind(this);
    this.tokenChecker = this.tokenChecker.bind(this);
  }

  generateAuthUrl() {
    return `https://accounts.spotify.com/authorize` +
      `?client_id=${this.CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&scope=user-read-private%20streaming%20user-read-email`
  }

  async redirectToSpotify() {
    window.location.replace(this.generateAuthUrl());
  }

  async exchangeCodeForAccessToken() {

    fetch(SPOTIFY_AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: getQueryParam('code'),
        redirect_uri: REDIRECT_URI
      })
    })
    .then(data => data.json())
    .then(data => {
      data.dateSet = new Date();
      localStorage.setItem('spotifyRefreshToken', data.refresh_token);
      localStorage.setItem('spotifyAccess', JSON.stringify(data));
    })
    .catch(console.error)
  }

  getAccessTokens() {
    return JSON.parse(localStorage.getItem('spotifyAccess'));
  }

  getRefreshToken() {
    return localStorage.getItem('spotifyRefreshToken');
  }
  

  componentDidMount() {
    if (getQueryParam('code')) {
      this.exchangeCodeForAccessToken();
      window.history.replaceState({}, null, window.location.href.split('?')[0])
    }

    // Check if token has expired;
    if (localStorage.getItem('spotifyAccess') != null) {
      let token = this.getAccessTokens();
      let refresh = this.getRefreshToken();
      if (token.access_token === undefined || refresh === undefined) {
        console.log('token invalid, purging')
        localStorage.removeItem('spotifyAccess');
      } else if (new Date(token.dateSet).getTime() + 3600000 <= new Date().getTime()) {
        console.log('Spotify tokens expired, purging');
        localStorage.removeItem('spotifyAccess');
      } else {
        // Token still valid;
        window.spotifyTokenInterval = setInterval(this.tokenChecker, 60*1000);
      }
    }
  }

  tokenChecker() {
    if (!this.getAccessTokens()) return;
    const { dateSet } = this.getAccessTokens();
    const refresh_token = this.getRefreshToken();

    if (new Date(dateSet).getTime() + 20*60*1000 <= new Date().getTime()) { // If token is 20 minutes old
      refreshToken(refresh_token);
    }
  }

  render() {
    return (
      <div className={`SpotifyAuthentication ${this.props.className}`} >
        <button className="button is-info" onClick={this.redirectToSpotify}>Login with Spotify</button>
      </div>
    )
  }
}