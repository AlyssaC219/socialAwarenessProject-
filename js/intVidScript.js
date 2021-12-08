let contentEle = document.querySelector("#contentEle");
let continueBtn = document.querySelector("#goToTimeBtn");

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "V1kUznJa2_o",
    playerVars: {
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

  setInterval(onTimeStampUpdate, 1000);
}

function onTimeStampUpdate(event) {
  if (currentPlayerState === 1) {
    let currentTime = Math.floor(player.getCurrentTime());
    /* console.log(currentTime); */

    if (currentTime === 7) {
      player.pauseVideo();

      document.getElementById("questionText").innerText =
        "Empathy is the ability to...";

      document.getElementById("radioItems").style.display = "block";
      document.getElementById("continueButton").style.visibility = "visible";
    } else if (currentTime === 8) {
      document.getElementById("questionText").innerText = "";
      document.getElementById("continueButton").style.visibility = "hidden";
      document.getElementById("radioItems").style.display = "none";
    } else if (currentTime === 252) {
      player.pauseVideo();
      window.location.replace("completion.html");
    }
  }
}

// 5. The API calls this function when the player's state changes. document.getElementById("roboto1").innerHTML = "Paragraph changed!";
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

let currentPlayerState;
function onPlayerStateChange(event) {
  currentPlayerState = event.data;
}
function stopVideo() {
  player.stopVideo();
}

goToTimeBtn.addEventListener("click", (event) => {
  player.seekTo(60, true);
});
