define("text!views/chat/videoPlayer.html", [], function () {
  return "<div class=\"VideoPlayer\">\r\n\r\n    <div class=\"VideoPlayer-controlsOverlay\" data-bind=\"click: togglePlay\"></div>\r\n\r\n    <video class=\"VideoPlayer-player\" data-bind=\"attr: { src: media, poster: poster, autoplay: autoplay }, click: togglePlay,\r\n            event: {loadedmetadata: onMetadataLoaded, timeupdate: onTimeUpdated, ended: onVideoEnded}\">\r\n    </video>\r\n\r\n    <div class=\"VideoPlayer-controls\">\r\n\r\n        <button data-bind=\"click: togglePlay, attr: {title: playButtonText }\"\r\n                class=\"VideoPlayer-button VideoPlayer-togglePlay btn circle\" type=\"button\">\r\n            <span class=\"iconfont play\" data-bind=\"css: { pause: isPlaying() }, text: playButtonText\"></span>\r\n        </button>\r\n\r\n        <div class=\"VideoPlayer-currentTime\" data-bind=\"text: currentTime\"></div>\r\n\r\n        <div class=\"VideoPlayer-timeline\" data-bind=\"click: onTimelineClick\">\r\n\r\n            <div class=\"VideoPlayer-totalProgress\"></div>\r\n\r\n            <div class=\"VideoPlayer-progress\" data-bind=\"attr: {style: currentProgress}\">\r\n                <div class=\"VideoPlayer-handle\" data-bind=\"event: {mousedown: onHandleStartDrag}\"></div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"VideoPlayer-totalTime\" data-bind=\"text: totalTime\"></div>\r\n\r\n        <!-- ko if: isFullscreenSupported -->\r\n        <button data-bind=\"click: toggleFullscreen, attr: {title: fullscreenButtonText }\"\r\n                class=\"VideoPlayer-button VideoPlayer-toggleFullscreen btn circle\" type=\"button\">\r\n            <span class=\"iconfont fullscreen\" data-bind=\"css: { fullscreenOff: isInFullscreen() }, text: fullscreenButtonText\"></span>\r\n        </button>\r\n        <!-- /ko -->\r\n\r\n    </div>\r\n</div>";
})
