const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  document.getElementById("joke-text").textContent = joke;

  VoiceRSS.speech({
    key: "cd6582a7a8034847b855dae8cd51d532",
    src: joke,
    hl: "en-us",
    v: "Mike",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (e) {
    console.log("error", e);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
audioElement.addEventListener("play", function () {
  button.disabled = true;
});
audioElement.addEventListener("ended", function () {
  button.disabled = false;
});
