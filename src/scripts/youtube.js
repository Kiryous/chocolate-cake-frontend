// Асинхронная загрузка IFrame Player API.
function loadYoutubeApi() {
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// API вызывает функцию, если плеер готов к использованию.
function onPlayerReady(event) {
  //event.target.playVideo();
}
// API вызывает проигрывание.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideoб 10000);
    //done = true;
  }
}

function loadYoutubeVideo(playerDiv, videoId) {
  // Функция создает <iframe> после загрузки API.
    return new YT.Player(playerDiv, {
      height: '558',
      width: '992',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

if (document.querySelectorAll('.js-video').length) {
  loadYoutubeApi();
}

function onYouTubeIframeAPIReady() {
  loadYoutubeVideo(document.querySelector('.js-title-video'), 'ffe15Nn-jfE');
}

// function onYouTubeIframeAPIReady() {
//   loadYoutubeVideo(document.querySelector('.js-title-video'), 'h78KZKdzR5Y');
// }
