const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const forwardButton = document.getElementById("jsForwardButton");
const backwardButton = document.getElementById("jsBackwardButton");

let intervalFwd;
let intervalRwd;

const timeFormat = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function windBackward() {
  if(videoPlayer.currentTime <= 3) {
    backwardButton.classList.remove('active');
    clearInterval(intervalRwd);
    videoPlayer.stop();
  } else {
    videoPlayer.currentTime -= 3;
  }
}

function windForward() {
  if(videoPlayer.currentTime >= videoPlayer.duration - 3) {
    forwardButton.classList.remove('active');
    clearInterval(intervalFwd);
    videoPlayer.stop();
  } else {
    videoPlayer.currentTime += 3;
  }
}

function mediaBackward() {
  clearInterval(intervalFwd);
  forwardButton.classList.remove('active');

  if(backwardButton.classList.contains('active')) {
    backwardButton.classList.remove('active');
    clearInterval(intervalRwd);
    videoPlayer.play();
  } else {
    backwardButton.classList.add('active');
    videoPlayer.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  backwardButton.classList.remove('active');

  if(forwardButton.classList.contains('active')) {
    forwardButton.classList.remove('active');
    clearInterval(intervalFwd);
    videoPlayer.play();
  } else {
    forwardButton.classList.add('active');
    videoPlayer.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}


function getVideoTime(){
  currentTime.innerHTML = timeFormat(Math.floor(videoPlayer.currentTime));
}

function setTotalTime(){
  const totalTimeString = timeFormat(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getVideoTime, 1000);
}


function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';

  }
}



function handleVolumClick(){
  if(videoPlayer.muted){
    videoPlayer.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  }
  else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleScreenClick(){
  videoContainer.webkitRequestFullscreen();
  fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenButton.removeEventListener("click", handleScreenClick);
  // eslint-disable-next-line no-use-before-define
  fullScreenButton.addEventListener("click", exitFullScreen);
  document.webkitExitFullscreen();
}

function exitFullScreen(){
  fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenButton.addEventListener("click", handleScreenClick)
}

function handleEnded(){
  videoPlayer.currentTime = 0;
  playButton.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVolume(event){
  const { 
    target : {value }
  } = event;
  videoPlayer.volume = value;
}

function init() {
  videoPlayer.volume = 0.5;
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumClick);
  fullScreenButton.addEventListener("click", handleScreenClick);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolume);
  backwardButton.addEventListener("click", mediaBackward);
  forwardButton.addEventListener("click", mediaForward);
}

if (videoContainer) {
  init();
}