let previous = document.querySelector("#prev");
let next = document.querySelector("#next");
let play = document.querySelector("#play");
let title = document.querySelector("#title");
let artist = document.querySelector("#artist");
let slider = document.querySelector("#duration_slider");
let show_duration = document.querySelector("#show_duration");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let track_image = document.querySelector("#track_image");
let volume_show = document.querySelector("#volume_show");
let volume_icon = document.querySelector("#volume_icon");
let auto_play = document.querySelector("#autoplay");
let recent_volumn = document.querySelector("#volume");

let timer = setInterval(range_slider, 1000);
let autoplay = 0;

let index_no = 0;
let playing_song = false;

// create a audio Element
let track = document.createElement("audio");

// All songs list
let All_song = [
  {
    name: "first song",
    path: "music/song1.mp3",
    img: "images/img1.avif",
    singer: "singer1",
  },
  {
    name: "second song",
    path: "music/song2.mp3",
    img: "images/img2.avif",
    singer: "singer2",
  },
  {
    name: "third song",
    path: "music/song3.mp3",
    img: "images/img3.avif",
    singer: "singer3",
  },
  {
    name: "fourth song",
    path: "music/song4.mp3",
    img: "images/img4.avif",
    singer: "singer4",
  },
  {
    name: "fifth song",
    path: "music/song5.mp3",
    img: "images/img5.avif",
    singer: "singer5",
  },
];

total.innerHTML = All_song.length;
present.innerHTML = index_no + 1;
// All functions

// function load the track
function load_track(index_no) {
  clearInterval(timer);
  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].singer;
  present.innerHTML = index_no + 1;
  track.load();

}

load_track(index_no);

// checking the song is playing or not
function justplay() {
  if (playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

// play song
function playsong() {
  track.play();
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// pause song
function pausesong() {
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// next song
function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}

// function previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = All_song.length;
    load_track(index_no);
    playsong();
  }
}

// change volume
function volume_change() {
  volume_show.innerHTML = recent_volumn.value;
  track.volume = recent_volumn.value / 100;
}

// change slider position
function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}

function autoplay_switch() {
  if(autoplay == 1){
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  }else{
    autoplay = 1;
    auto_play.style.background = "#FF8A65";
  }
}

// mute sound
function mute_sound() {
  track.muted = !track.muted;

  if (track.muted) {
    volume_icon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    volume_icon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }

}