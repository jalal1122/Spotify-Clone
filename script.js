// Global Variables
let currentSong = new Audio();
let songs = [];
let currentPlayList = "";

// Store the Play Button Svg
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

// Store the Pause Button Svg
let pauseButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />
</svg>`;

// Function to convert seconds to minutes and seconds
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to get songs from the server
async function getSongs(playListPath) {
  let response;
  // check if the playlist path is empty
  if (playListPath === "" || playListPath === undefined) {
    // get the songs from the music
    response = await fetch(`/assets/music/`);
  }
  // if the playlist path is not empty
  else {
    // get the songs from the playlist
    response = await fetch(
      `${encodeURI(`http://127.0.0.1:3000/assets/Playlists/${playListPath}/`)}`
    );
  }

  // change the response to text
  let data = await response.text();

  // create a div element to store the data
  let div = document.createElement("div");
  // set the innerHTML of the div to the data
  div.innerHTML = data;
  // get all the anchor tags from the
  let as = div.getElementsByTagName("a");
  // store the songs in the songs array
  let songs = [];
  // loop through the anchor tags
  for (let a of as) {
    // check if the href of the anchor tag ends with .mp3
    if (a.href.endsWith(".mp3")) {
      // push the song to the songs array
      songs.push(decodeURI(a.href.split("/").pop()));
    }
  }

  // get the music library element ul
  let musicLibary = document
    .getElementsByClassName("songs-library")[0]
    .getElementsByTagName("ul")[0];

  // loop through the songs
  songs.forEach((song) => {
    // create a li element
    let li = document.createElement("li");
    // set the innerHTML of the li element
    li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M11 7.13678V17M11 7.13678C12.8928 8.81698 14.5706 10.0042 16.0063 10.6818C16.6937 11.0062 17.3165 11.0682 18.0198 10.7552C19.7751 9.97419 21 8.20629 21 6.15045C19.0715 7.50911 16.6876 6.77163 14.6847 5.50548C13.0454 4.46918 12.2258 3.95102 11.8569 4.00364C11.5781 4.0434 11.4283 4.1242 11.244 4.33421C11 4.61216 11 5.4537 11 7.13678Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
              <h5>${song} </h5>
              <h6>Play</h6>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
</svg>
            </li>`;
    // append the li to the music library
    musicLibary.appendChild(li);

    // add an event listener to the li
    li.addEventListener("click", () => {
      // set the song to the song clicked
      song = song;
      console.log(song);

      // play the song
      playSong(song);
    });
  });

  // return the songs
  return songs;
}

// Function to play the song
function playSong(song) {
  // check if the current playlist is empty
  if (currentPlayList === "") {
    // set the song to the music
    song = `http://127.0.0.1:3000/assets/music/${song}`;
  }
  // if the current playlist is not empty
  else {
    // set the song to the playlist
    song = `http://127.0.0.1:3000/assets/Playlists/${currentPlayList}/${song}`;
  }

  // check if the song is playing
  if (!currentSong.paused) {
    // pause the song
    currentSong.pause();
  }
  // set the current song to the song
  currentSong = new Audio(song);

  // play the song
  currentSong.play();

  // set the song name to the song clicked
  document.getElementById("songName").innerText = song
    .split("/")
    .pop()
    .split(".mp3")[0];

  // set the innerHTML of the time to 00 / 00
  document.querySelector(".rightSide-MusicBar>h5").innerHTML = "00 / 00";

  // change the innerHTML of the playPause button to the pause button
  document.getElementsByClassName("playPause-button-div")[0].innerHTML =
    pauseButtonSVG;

  // add an event listener on curentsong to update the time and seekbar of the song
  currentSong.addEventListener("timeupdate", () => {
    // set the innerHTML of the time to the current time and the duration of the song
    document.querySelector(
      ".rightSide-MusicBar>h5"
    ).innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;

    // set the left of the music range control to the current time of the song
    document.querySelector(".musicRangeControl").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
}

async function getPlaylists() {
  // get the playlists from the server
  let response = await fetch("http://127.0.0.1:3000/assets/playlists/");

  // change the response to text
  let data = await response.text();

  // create a div element to store the data
  let div = document.createElement("div");

  // set the innerHTML of the div to the data
  div.innerHTML = data;

  // get all the anchor tags from the
  let as = div.getElementsByTagName("a");

  // create an array to store the playlists
  let playlists = [];

  // loop through the anchor tags
  for (let a of as) {
    // check if the href of the anchor tag includes /playlists/
    if (a.href.includes("/playlists/")) {
      // push the playlist to the playlists array
      playlists.push(decodeURI(a.href));
    }
  }

  // get the playlist library element
  let playlistLibrary = document.querySelector(".spotify-playlists");

  // loop through the playlists
  playlists.forEach((playlist) => {
    // create a div element
    let div = document.createElement("div");

    // set the innerHTML of the div
    div.innerHTML = `<div class="playlist-card">
            <img src="${playlist}/playlist-card-img-1.png" alt="" />
            <h3>${playlist.split("/playlists/")[1].split("/")[0]}</h3>
            <p>By Spotify</p>
          </div>`;

    // append the div to the playlist library
    playlistLibrary.appendChild(div);
  });

  // return the playlists
  // return playlists;
}

async function main() {
  await getPlaylists();

  // store the songs in the global variable SONGS
  songs = await getSongs(currentPlayList);

  // get the playlist cards
  let playlist = document.getElementsByClassName("playlist-card");

  // add an event listener to the playlist cards
  Array.from(playlist).forEach((playlist) => {
    playlist.addEventListener("click", async () => {
      // set the current playlist to the playlist clicked
      currentPlayList = playlist.getElementsByTagName("h3")[0].innerHTML;

      // get the music library element ul and set its inner html to ""
      document
        .getElementsByClassName("songs-library")[0]
        .getElementsByTagName("ul")[0].innerHTML = "";

      // get the songs from the current playlist
      songs = await getSongs(currentPlayList);

      // set the first song of the songs list to the song name
      document.getElementById("songName").innerText = songs[0]
        .split("/")
        .pop()
        .split(".mp3")[0];

      // play the first song in the clicked playlist
      playSong(songs[0]);
    });
  });

  // set the current song to the first song in the songs array
  currentSong = new Audio(`http://127.0.0.1:3000/assets/music/${songs[0]}`);

  // set the first song of the songs list to the song name
  document.getElementById("songName").innerText = songs[0]
    .split("/")
    .pop()
    .split(".mp3")[0];

  // add an event listener to the play button
  document
    .getElementsByClassName("playPause-button-div")[0]
    .addEventListener("click", () => {
      // check if the song is paused
      if (currentSong.paused) {
        // play the song
        currentSong.play();
        // change the innerHTML of the playPause button to the pause button
        document.getElementsByClassName("playPause-button-div")[0].innerHTML =
          pauseButtonSVG;
      } else {
        // pause the song
        currentSong.pause();
        // change the innerHTML of the playPause button to the play button
        document.getElementsByClassName("playPause-button-div")[0].innerHTML =
          playButtonSVG;
      }
    });

  // add an event listener on curentsong to update the time and seekbar of the song
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(
      ".rightSide-MusicBar>h5"
    ).innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".musicRangeControl").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // add an event listener on music seek bar
  document.querySelector(".music-SeekBar").addEventListener("click", (e) => {
    // get the width of the music seek bar
    let width = document.querySelector(".music-SeekBar").offsetWidth;
    // get the position of the click
    let clickPosition = e.offsetX;
    // set the current song time to the position of the click
    currentSong.currentTime = (clickPosition / width) * currentSong.duration;
  });

  // add an event listener on the music range control for dragging
  document
    .querySelector(".musicRangeControl")
    .addEventListener("mousedown", (e) => {
      // prevent the default behavior of the event
      e.preventDefault();
      // add an event listener on mousemove
      document
        .querySelector(".musicRange")
        .addEventListener("mousemove", (e) => {
          // get the width of the music seek bar
          let width = document.querySelector(".music-SeekBar").offsetWidth;
          // get the position of the click
          let clickPosition = e.clientX;
          document
            .querySelector(".musicRangeControl")
            .addEventListener("mouseup", () => {
              // set the current song time to the position of the click
              currentSong.currentTime =
                ((clickPosition - 200) / width) * currentSong.duration;
              document.querySelector(".musicRangeControl").style.left = `${
                ((clickPosition - 200) / width) * 100
              }%`;
            });
        });
    });

  // add an event listener on the previous button
  document
    .getElementsByClassName("previous-button-div")[0]
    .addEventListener("click", () => {
      // get the index of the current song
      console.log(songs);

      let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
      // check if the current song is the first song
      if (index === 0) {
        // set the index to the last
        index = songs.length;
      }
      // play the previous song
      playSong(songs[index - 1]);
    });

  // add an event listener on the next button
  document
    .getElementsByClassName("next-button-div")[0]
    .addEventListener("click", () => {
      // get the index of the current song
      let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
      // check if the current song is the last song
      if (index === songs.length - 1) {
        // set the index to the first
        index = -1;
      }
      // play the next song
      playSong(songs[index + 1]);
    });

  // add an event listener on the volume button
  document
    .querySelector(".musicVolumeControl>svg")
    .addEventListener("click", () => {
      // check if the volume is muted
      if (currentSong.volume === 0) {
        // set the volume to 1
        currentSong.volume = 0.1;
        // change the volume range to 0.10
        document.querySelector(".volumeRangeControl").style.left = "10%";
        // change the volume button to the volume button
        document.querySelector(".musicVolumeControl>svg").innerHTML = `
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                >
                  <path
                    d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                `;
      } else {
        // set the volume to 0
        currentSong.volume = 0;
        // change the volume button to the mute button
        document.querySelector(
          ".musicVolumeControl>svg"
        ).innerHTML = ` xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
    <path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18 10L22 14M18 14L22 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
`;
      }
    });

  // add an event listener on the volume seek bar
  document.querySelector(".volumeRange").addEventListener("click", (e) => {
    // get the width of the volume seek bar
    let width = e.target.offsetWidth;
    // get the position of the click
    let clickPosition = e.offsetX;
    // set the volume of the current song to the position of the click
    currentSong.volume = clickPosition / width;
    // change the volume range control to the position of the click
    document.querySelector(".volumeRangeControl").style.left =
      (clickPosition / width) * 100 + "%";
  });

  // add an event listener for the burger menu
  document
    .querySelector(".responsive-container-icon>img")
    .addEventListener("click", () => {
      console.log("clicked");

      document.querySelector(".left").style.left = "0%";
    });

  // add an event listener for the close button
  document
    .querySelector(".library-responsive-icons>svg")
    .addEventListener("click", () => {
      document.querySelector(".left").style.left = "-100%";
    });
}

main();
