import { REFRESH_URL } from '../settings';

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

export async function refreshToken(refresh_token) {

  return new Promise(async (res, rej) => await fetch(REFRESH_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh_token })
  })
  .then(data => data.json())
  .then(data => {
    if (data.error) {
      console.log('Spotify refresh invalid', data);
      rej(data);
      localStorage.removeItem('spotifyAccess');
    } else {
      data.dateSet = new Date();
      res(data.access_token);
      localStorage.setItem('spotifyAccess', JSON.stringify(data));
    }
  }));
}

export function splitList(results) {
  return results.reduce((res, val, i, arr) => {
    if (i % 2 === 0) res.push(arr.slice(i, i + 2));
    return res;
  }, [])
}

export function rand(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
}

export function randomValueFromArray(array) {
  return array[rand(0, array.length - 1)];
}

export function shuffleArray(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
/**
 * Divide an array in two, selecting random values for the resulting two arrays
 * @param {Array} array
*/
export function divideArrayInTwoRandomArrays(array) {
  const shuffle = shuffleArray([...array])
  let fst = shuffle
  let snd = shuffle.splice(0, shuffle.length / 2)
  return { fst, snd }
}

export function sleep(time) {
  return new Promise((res, rej) => setTimeout(res, time))
}