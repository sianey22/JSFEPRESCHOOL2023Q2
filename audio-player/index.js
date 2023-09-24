const audio = document.querySelector('audio');
const playButton = document.querySelector('.play-stop-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.backward-button');
const progress = document.querySelector('.progress-bar');

const imgList = ["./assets/img/lemonade.png", "./assets/img/dontstartnow.png"];
const audioList = ["./assets/audio/beyonce.mp3", "./assets/audio/dontstartnow.mp3"];
const titleList = ["Beyonce", "Dua Lipa"];
const nameList = ["Don't Hurt Myself", "Don't Start Now"];

let isPlay = false; 
let songNumb = 0;
const arrSize = audioList.length;

// for duration and progress bar

function calcTime(time) {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    const secondsResult = seconds < 10 ? `0${seconds}`: `${seconds}`;
    return `${minutes}:${secondsResult}` 
}

function audioDuration(){
    document.querySelector('.duration').textContent=calcTime(audio.duration);
    progress.max = Math.floor(audio.duration);
}

function updateTime(){
    if (audio.readyState>0){
        audioDuration()
    }
    else{
        audio.addEventListener('loadedmetadata', audioDuration)
    }
}

function progressBar(){
    const value = progress.value;
    audio.currentTime = value;
}

function playAudio() {
  audio.play();
  playButton.src = "./assets/svg/pause.png";
  isPlay = true;
}

function pauseAudio() {
  audio.pause();
  playButton.src = "./assets/svg/play.png";
  isPlay = false;
}

function playPauseAudio() {
    isPlay? pauseAudio(): playAudio();
}

function changeInfo() {
    document.querySelector('.background').src=imgList[songNumb];
    document.querySelector('.player-img').src=imgList[songNumb];
    document.querySelector('.song-title').textContent=titleList[songNumb];
    document.querySelector('.song-name').textContent=nameList[songNumb];
    audio.src = audioList[songNumb];
}

function forward() {
    if (songNumb == arrSize - 1) {
        songNumb = 0;
    }
    else {
        songNumb+=1;
    }
    changeInfo();
    playAudio();
}

function backward() {
    if (songNumb == 0){
        songNumb = arrSize-1;
    }
    else{
        songNumb-=1;
    }
    changeInfo();
    playAudio();
}

audio.addEventListener('loadedmetadata', updateTime);
playButton.addEventListener('click', playPauseAudio);
forwardButton.addEventListener('click', forward);
backwardButton.addEventListener('click', backward);
progress.addEventListener('input', progressBar);
audio.addEventListener('timeupdate', () => {
    progress.value = Math.floor(audio.currentTime);
    document.querySelector('.current-time').textContent= calcTime(audio.currentTime)
  });
audio.addEventListener('ended', forward);