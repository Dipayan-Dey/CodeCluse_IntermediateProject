let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let volSvg = document.querySelector("#vol-svg");
let Mute_Unmute = document.querySelector("#mute-unmute");
let musicAnim = document.querySelector("#musicanim");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let overlay = document.querySelector(".overlay");
let index = 0;
let playingSong = false;
let track = document.createElement("audio");
let songs = [
  {
    name: "Dil Ko Maine Di Kasam ",
    path: "./Music/s1.mp3",
    image: "./Image/p1.jpg",
    singer: "Arijit Singh",
  },
  {
    name: "Bekhayali",
    path: "./Music/s2.mp3",
    image: "./Image/p2.jpg",
    singer: "Arijit Singh",
  },
  {
    name: "Ve kamleya",
    path: "./Music/s3.mp3",
    image: "./Image/p3.jpg",
    singer: "Arijit Singh",
  },
  {
    name: "Apna Bana Le",
    path: "./Music/s4.mp3",
    image: "./Image/p4.jpg",
    singer: "Arijit Singh",
  },
  {
    name: "Pehle Bhi Me",
    path: "./Music/s5.mp3",
    image: "./Image/p5.jpg",
    singer: "Vishal Mishra",
  },
  {
    name: "Satranga",
    path: "./Music/s6.mp3",
    image: "./Image/p6.jpg",
    singer: "Arijit Singh",
  },
  {
    name: "Borbad Hoyechi Ami Tor Apekhhai",
    path: "./Music/s7.mp3",
    image: "./Image/p7.jpg",
    singer: "Arindom",
  },
];
function loadTrack(index) {
  track.src = songs[index].path;
  songName.innerHTML = songs[index].name;
  songSinger.innerHTML = songs[index].singer;
  songImage.style = `background-image: url("${songs[index].image}");`;
  volume();
  setInterval(setUpdate, 1000);
  setInterval(() => {
    songRange.max = track.duration;
    songRange.value = track.currentTime;
  }, 1000);
  track.loop = true;
  track.load();
}
loadTrack(index);

function playPause() {
  if (playingSong == false) {
    playSong();
  } else {
    pauseSong();
  }
}
function playSong() {
  track.play();
  playingSong = true;
  playPauseImg.src = "./Svg/pause.svg";
  musicAnim.style.display = "block";
}
function pauseSong() {
  track.pause();
  playingSong = false;
  playPauseImg.src = "./Svg/play.svg";
  musicAnim.style.display = "none";
}
function nextSong() {
  if (index < songs.length - 1) {
    index++;
    loadTrack(index);
    playSong();
  } else {
    index = 0;
    loadTrack(index);
    playSong();
  }
}
function previousSong() {
  if (index > 0) {
    index--;
    loadTrack(index);
    playSong();
  } else {
    index = songs.length - 1;
    loadTrack(index);
    playSong();
  }
}
function volume() {
  track.volume = volumeRange.value / 100;
  if (volumeRange.value == 0) {
    volSvg.src = "./Svg/mute.svg";
  } else {
    volSvg.src = "./Svg/volume.svg";
  }
}
Mute_Unmute.addEventListener("click", () => {
  if (track.muted == true) {
    track.muted = false;
    volSvg.src = "./Svg/volume.svg";
  } else {
    track.muted = true;
    volSvg.src = "./Svg/mute.svg";
  }
});
function duration() {
  track.currentTime = songRange.value;
}

playlistImg.addEventListener("click", () => {
  playlist.classList.toggle("playlist-active");
  if (playlist.classList.contains("playlist-active")) {
    playlistImg.src = "./Svg/cross.svg";
  } else {
    playlistImg.src = "./Svg/playlist.svg";
  }
});
overlay.addEventListener("click", () => {
  playlist.classList.remove("playlist-active");
  playlistImg.src = "./Svg/playlist.svg";
});
playlistSong.forEach((song, index) => {
  song.addEventListener("click", () => {
    loadTrack(index);
    playSong();
    playlist.classList.remove("playlist-active");
    playlistImg.src = "./Svg/playlist.svg";
  });
});

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(track.duration)) {
    seekPosition = track.currentTime * (100 / track.duration);
    songRange.value = seekPosition;

    let currentMinutes = Math.floor(track.currentTime / 60);
    let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(track.duration / 60);
    let durationSeconds = Math.floor(track.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
