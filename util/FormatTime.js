function formatTime(time) {
  const hours = `0${Math.floor(time / 3600) % 24}`.slice(-2);
  const minutes = `0${Math.floor(time / 60) % 60}`.slice(-2);
  const seconds = `0${Math.floor(time) % 60}`.slice(-2);
  const milliseconds = `00${(time % 1).toFixed(3) * 1000}`.slice(-3);
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

module.exports = formatTime;
