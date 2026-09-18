//load a song dynamically
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const songList = document.querySelectorAll('#song-list li');
const menu = document.getElementById('menu');
const nowPlaying = document.getElementById('now-playing');
const nowTitle = document.getElementById('now-title');

const songs = ['staticMelodyKeys', 'sequenceTakeoff', 'calmingSynthWaves'];
let songIndex = 2;

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function updateSelected(index) {
  songList.forEach((li, i) => {
    li.classList.toggle('selected', i === index);
  });
}

//shows menu when menu button is clicked
function showMenu() {
  menu.classList.add('active');
  nowPlaying.classList.remove('active');
}

function showNowPlaying() {
  menu.classList.remove('active');
  nowPlaying.classList.add('active');
}

document.getElementById('menu-btn').addEventListener('click', showMenu);


//add play or pause controls
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//add next and previous logic
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//update the progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

//click to seek/scrub in track
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

//auto play next song when current song ends
audio.addEventListener('ended', nextSong);

document.addEventListener('keydown', (e) => {
  if (menu.classList.contains('active')) {
    if (e.key === 'ArrowUp') {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      updateSelected(currentSong);
    } else if (e.key === 'ArrowDown') {
      currentSong = (currentSong + 1) % songs.length;
      updateSelected(currentSong);
    }
  }
});