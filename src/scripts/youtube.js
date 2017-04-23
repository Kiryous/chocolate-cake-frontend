// Асинхронная загрузка IFrame Player API.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Функция создает <iframe> после загрузки API.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '180',
    videoId: 'ffe15Nn-jfE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
// API вызывает функцию, если плеер готов к использованию.
function onPlayerReady(event) {
  event.target.playVideo();
}
// API вызывает проигрывание.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideoб 10000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
