const songlist =[
    {
        name: "Jazz In Paris",
        artist: "Media Right Production",
        src: "assets/1.jpg"

    }
    {
        name:"Blue Skies",
        artist: "Silent Partner",
        src:"assets/2.jpg"
        cover:"assets/2.jpg"
    }
];

const artistname =document.querySelector('.artist-name');
const MusicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog =document.querySelector('.progress-bar');

let song =new Audio();
let currentSong = 0;
let playing = flase; 
 
 document.addEventListener('DOMContentLoaded',() =>{
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateprogress);
    song.addEventListener('ended', nextsong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click',nextsong);
    playBtn.addEventListener('click',togglePlayPause);
    prog.addEventListener('click', seek);

 });

 function loadSong(index){
     const { name, artist, src, cover: thumb } =songlist
     [index];
     artistname.innderText = artist;
     MusicName.innderText = name;
     song.src =src;
     cover.style.backgroundImage ='url(${thumb})';

 }

 function updateprogress(){
    if(song.duration){
        const pos =(song.currentTime / song.duration) *
        100;
        fillBar.style.width = '${pos}%';

        const duration = formatTime(song.duration);
        const currentTime =formatTime(song.currentTime);
        time.innderText ='${currentTime} -${duration}';

    }
 }

  function formatTime(seconds){
    const minutes = math.floor(seconds /60);
    const secs = Math.floor(seconds % 60);
    return '${minutes}:${secs < 10 ? '0' : ''}${secs}';

  }

  function togglePlayPause(){
    if(playing){
        song.pause();

    }else{
        song.play();
    }
    playing =!playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active' , playing);
  }
   
  function nextsong(){
      currentSong = (currentSong +1) % songlist.length;
      playMusic();

  }

    function prevSong(){
        currentSong = (currentSong -1 + songlist.length)%
        songlist.length;
        playMusic();
    }

    function playMusic() {
        loadSong(currentSong);
        song.play();
        playing = true;
        playBtn.classList.add('fa-pause');
        playBtn.classList.remove('fa-play');
        cover.classList.add('active');

    }

function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song
    duration;
    song.currentTime = pos;
    

}


