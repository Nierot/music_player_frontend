export default function parseTime(time) {
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;
    
    let minutes = Math.floor(time / 60);

    return `${minutes}:${seconds}`;
  }