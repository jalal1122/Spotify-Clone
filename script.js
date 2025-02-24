// Get the songs
async function getSongs() {
  let response = await fetch("./assets/music/");
  let result = await response.text();
  console.log(result);
  let div = document.createElement("div");
  div.innerHTML = result;
  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.includes(".mp3")) {
      songs.push(element.href.replaceAll("%20", ""));
    }
  }

  return songs;
}

async function main() {
  let songs = await getSongs();
  //   console.log(songs);

  let song = new Audio(`${songs[0]}`);
  song.play();
}

main();
