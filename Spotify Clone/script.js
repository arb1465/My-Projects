console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlayBtn = document.querySelector("#masterPlay");
let myProgressBarBtn = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Deaf Kev - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Diffrenet Hevean & Ehide", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba Janda", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Bhula Dena Mujhe", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tumhari Kasam", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

masterPlayBtn.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlayBtn.classList.remove('fa-play-circle');
        masterPlayBtn.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlayBtn.classList.remove('fa-pause-circle');
        masterPlayBtn.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    // console.log("timeupdate");
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBarBtn.value = progress;
});

myProgressBarBtn.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBarBtn.value*audioElement.duration)/100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        // console.log(e.target)
        makeAllPlays(); 
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongInfo.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlayBtn.classList.remove('fa-play-circle');
        masterPlayBtn.classList.add('fa-pause-circle');
    })
})

document.getElementById("next").addEventListener("click", () => {
    if(songIndex >= 7){
        songIndex = 0;
    }
    else{
        songIndex++;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongInfo.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlayBtn.classList.remove('fa-play-circle');
    masterPlayBtn.classList.add('fa-pause-circle');
})

document.getElementById("previous").addEventListener("click", () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex--;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongInfo.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlayBtn.classList.remove('fa-play-circle');
    masterPlayBtn.classList.add('fa-pause-circle');
})