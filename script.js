const musicContainer = document.querySelector('.music__container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const progress  = document.querySelector('.progress')
const progressContainer  = document.querySelector('.progress__container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const audio = document.querySelector('#audio')

const songs =['hey', 'summer', 'ukulele']

let songIndex = 1

loadSongs(songs[songIndex])

function loadSongs(song) {

    title.innerText = song;
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

play.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play')
    isPlaying? pauseSong() : playSong()

})

nextBtn.addEventListener('click',nextSong)

prevBtn.addEventListener('click', prevSong)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('timeupdate',updateProgress)

audio.addEventListener('ended', nextSong)

function nextSong() {
    songIndex++
    songIndex>=songs.length ? songIndex=0:songIndex
    loadSongs(songs[songIndex])
    playSong()
}

function prevSong() {
    songIndex--
    songIndex<0? songIndex= songs.length-1: songIndex
    loadSongs(songs[songIndex])
    playSong()
}

function setProgress(e){

    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    console.log(width, clickX)
    audio.currentTime=(clickX/width) * duration
}
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercentage = (currentTime/duration)*100
    progress.style.width = `${progressPercentage}%`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}