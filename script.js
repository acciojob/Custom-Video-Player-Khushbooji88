/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
function updatePlayButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

