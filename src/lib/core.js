import { REST } from '../settings';

export default function parseTime(time) {
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;
    
    let minutes = Math.floor(time / 60);

    if (isNaN(minutes) || isNaN(seconds)) return `0:00`;
    
    return `${minutes}:${seconds}`;
}

export function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

export function generateCodeVerifier() {
  var array = new Uint32Array(56/2);
  window.crypto.getRandomValues(array);

  return Array.from(array, dec2hex).join('');
}

export function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest('SHA-256', data);
}

export function base64urlencode(a) {
  var str = '';
  var bytes = new Uint8Array(a);

  bytes.forEach(byte => str += String.fromCharCode(byte))

  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function getQueryParams() {
  return new URLSearchParams(window.location.search)
}

export function getQueryParam(param) {
  return getQueryParams().get(param);
}

export async function refreshToken() {

  await fetch(`${REST}refresh`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh_token: JSON.parse(localStorage.getItem('spotifyAccess')).refresh_token
    })
  }).then(async data => {
    let d = await data.json()
    d.dateSet = new Date();
    localStorage.setItem('spotifyAccess', JSON.stringify(d));
    console.log(d);
  })
}

export function splitList(results) {
  return results.reduce((res, val, i, arr) => {
    if (i % 2 === 0) res.push(arr.slice(i, i + 2));
    return res;
  }, [])
}

export function getUserID() {
  return 'User'; //TODO
}