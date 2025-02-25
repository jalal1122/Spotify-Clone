// Global Variables
let song;
let songs = [];

let playButtonSVG = `<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                color="#000000"
                fill="none"
              >
                <path
                  d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>`;

let pauseButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />
</svg>`;

// Get the songs
async function getSongs() {
  let response = await fetch("http://127.0.0.1:3000/assets/music/");
  let result = await response.text();
  let div = document.createElement("div");
  div.innerHTML = result;
  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.split(".preview")[0].endsWith(".mp3")) {
      songs.push(decodeURI(element.href));
    }
  }

  return songs;
}

//

// Function for playing the song
function playSong(track) {
  track.play();
  // change the name of the song
  let songName = document.getElementById("songName");
  songName.innerHTML = decodeURI(track.src)
    .split("/music/")[1]
    .split(".mp3")[0];
  songName.innerHTML =
    songName.innerHTML.length > 20
      ? songName.innerHTML.substring(0, 30) + "..."
      : songName.innerHTML;
  document
    .querySelector(".rightSide-MusicBar")
    .getElementsByTagName(
      "h5"
    )[0].innerHTML = `00:00 / ${secondsToMinutesAndSeconds(track.duration)}`;
}

// Function for showing the songs library
function showSongsLibrary(songs) {
  // run a loop to show the songs
  for (let index = 0; index < songs.length; index++) {
    let element = songs[index];
    // remove the path and the extension
    element = element.split("/music/")[1];
    element = element.split(".mp3")[0];
    // if the length of the song is greater than 20, then truncate it
    // if (element.length > 20) {
    //   element = element.substring(0, 50) + "...";
    // }
    // create a new div element
    let div = document.createElement("li");
    // set the innerHTML of the div
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M11 7.13678V17M11 7.13678C12.8928 8.81698 14.5706 10.0042 16.0063 10.6818C16.6937 11.0062 17.3165 11.0682 18.0198 10.7552C19.7751 9.97419 21 8.20629 21 6.15045C19.0715 7.50911 16.6876 6.77163 14.6847 5.50548C13.0454 4.46918 12.2258 3.95102 11.8569 4.00364C11.5781 4.0434 11.4283 4.1242 11.244 4.33421C11 4.61216 11 5.4537 11 7.13678Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
              <h5>${element} </h5>
              <h6>Play</h6>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
</svg>
            </li>`;
    // append the div to the songs library
    document
      .getElementsByClassName("songs-library")[0]
      .getElementsByTagName("ul")[0]
      .appendChild(div);
  }
}

// Function for converting seconds to minutes and seconds
function secondsToMinutesAndSeconds(second) {
  let minutes = Math.floor(second / 60);
  let seconds = Math.floor(second % 60);
  if (second < 60) {
    if (second < 10) {
      return `00:0${Math.floor(second)}`;
    }
    return `00:${Math.floor(second)}`;
  }
  if (minutes >= 1 && seconds < 10) {
    return `0${minutes}:0${seconds}`;
  }
  return `0${minutes}:${seconds}`;
}

async function main() {
  // get songs from the directory
  songs = await getSongs();
  song = new Audio(songs[0]);

  // show the songs library
  showSongsLibrary(songs);

  // add event listener to the play button
  let playButtonDiv = document.getElementsByClassName(
    "playPause-button-div"
  )[0];
  playButtonDiv.addEventListener("click", () => {
    // if song is paused play it and change the button to pause
    // song.pause()
    if (song.paused) {
      playSong(song);
      playButtonDiv.innerHTML = pauseButtonSVG;
    }
    // if song is playing pause it and change the button to play
    else {
      song.pause(song);
      playButtonDiv.innerHTML = playButtonSVG;
    }
  });

  // add event listener to play songs from the library
  let songsLibrary = document
    .querySelector(".songs-library>ul")
    .getElementsByTagName("li");

  // console.log(songsLibrary);
  Array.from(songsLibrary).forEach((e) => {
    e.addEventListener("click", () => {
      playSong(`http://127.0.0.1:3000/assets/music/${e}.mp3`);
      console.log(e);
    });
  });
  for (let index = 0; index < songsLibrary.length; index++) {
    const element = songsLibrary[index];
    element.addEventListener("click", () => {
      let songIndex = songs[index];
      // if song is not paused play the new song and change the button to pause
      if (!song.paused) {
        song.pause();
        song = songIndex;
        playSong(song);
        playButtonDiv.innerHTML = pauseButtonSVG;
      }
      // if song is paused play the new song and change the button to pause
      else {
        song = songIndex;
        playSong(song);
        playButtonDiv.innerHTML = pauseButtonSVG;
      }
    });
  }

  console.log(song.src);

  // change the seek bar value with the change in duration of the song
  song.addEventListener("timeupdate", () => {
    let songTime = document
      .getElementsByClassName("rightSide-MusicBar")[0]
      .getElementsByTagName("h5")[0];
    songTime.innerHTML = `${secondsToMinutesAndSeconds(
      song.currentTime
    )} / ${secondsToMinutesAndSeconds(song.duration)}`;
    document.querySelector(".musicRangeControl").style.left = `${
      (song.currentTime / song.duration) * 100
    }%`;
  });

  document.querySelector(".music-SeekBar").addEventListener("click", (e) => {
    document.querySelector(".musicRangeControl").style.left =
      (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
    song.currentTime =
      (e.offsetX / e.target.getBoundingClientRect().width) * song.duration;
  });
}

main();
