import React from 'react';

import { base64urlencode, generateCodeVerifier, getQueryParam, sha256, refreshToken } from '../lib/core';

export default class SpotifyAuthentication extends React.Component {

  REDIRECT_URI = 'http://localhost:3000/'
  CLIENT_ID = '5bf6a2aacb4d46e9bebec0f9453a7781'
  SERVER_SIDE_VERIFICATION = 'http://localhost:8080/spotify'
  SERVER_SIDE_REFRESH = 'http://localhost:8080/refresh'

  constructor() {
    super();
    this.redirectToSpotify = this.redirectToSpotify.bind(this);
  }

  async generateCodeChallenge() {
    let codeVerifier = generateCodeVerifier();
    localStorage.setItem('codeVerifier', codeVerifier)
    let hashed = await sha256(codeVerifier);
    let b64 = base64urlencode(hashed);
    // localStorage.setItem('codeVerifier', b64);
    return b64;
  }

  async generateSpotifyAuthorizationURI() {
    console.log(localStorage.getItem('codeVerifier'));
    return `https://accounts.spotify.com/authorize` +
        `?client_id=${this.CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${this.REDIRECT_URI}` +
        `&code_challenge_method=S256` + 
        `&code_challenge=${await this.generateCodeChallenge()}` +
        `&scope=user-read-private%20streaming%20user-read-email`
  }

  async redirectToSpotify() {
    window.location.replace(await this.generateSpotifyAuthorizationURI());
  }

  async exchangeCodeForAccessToken() {

    await fetch(this.SERVER_SIDE_VERIFICATION, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        code: getQueryParam('code'),
        code_verifier: localStorage.getItem('codeVerifier'),
        redirect_uri: this.REDIRECT_URI
      })
    }).then(async data => {
      localStorage.setItem('spotifyAccess', JSON.stringify(await data.json()))
      window.spotifyAccessTokenInterval = setInterval(() => refreshToken(), 3500000);
    });
  }


  getAccessTokens() {
    return JSON.parse(localStorage.getItem('spotifyAccess'));
  }
  

  componentDidMount() {
    if (getQueryParam('code')) {
      this.exchangeCodeForAccessToken();
      window.history.replaceState({}, null, window.location.href.split('?')[0])
    }

    if (this.getAccessTokens() != null) {
      if (new Date(this.getAccessTokens().dateSet).getTime() + 3500000 <= new Date().getTime()) {
        console.log('Spotify tokens expired, purging');
        localStorage.removeItem('spotifyAccess');
        clearInterval(window.spotifyAccessTokenInterval);
      }
    }

    window.refreshToken = refreshToken;
  }

  render() {
    return (
      <div className={`SpotifyAuthentication ${this.props.className}`} >
        <button className="button is-info" onClick={this.redirectToSpotify}>Login with Spotify</button>
      </div>
    )
  }
}