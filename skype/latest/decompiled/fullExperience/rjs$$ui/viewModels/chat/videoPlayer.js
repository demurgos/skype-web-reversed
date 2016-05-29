define("ui/viewModels/chat/videoPlayer", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "utils/common/eventMixin",
  "constants/common",
  "vendor/knockout",
  "swx-i18n",
  "telemetry/chat/videoMessagePlayback"
], function (e, t) {
  function l(e, t) {
    function y(e) {
      function r(e) {
        return e.toString().length === 1 ? "0" + e : e;
      }
      var t = Math.round(e), n = 0;
      return t >= g && (n = parseInt(t / g), t -= n * g), r(n) + ":" + r(t);
    }
    function b(e) {
      n.currentProgress("width: " + e + "%");
    }
    function w(e) {
      var t = c.offsetWidth, n = c.getBoundingClientRect().left, r = e.pageX - n;
      l.currentTime = l.duration * (r / t);
      b(r / t * 100);
    }
    function E() {
      n.isInFullscreen(i.fullscreenElement || i.mozFullscreenElement || i.webkitFullscreenElement);
      n.isInFullscreen() || n.dispatchEvent(o.events.videoPlayer.FULLSCREEN_OFF, null, n.DIRECTION.PARENT);
    }
    function S() {
      s.requestFullscreen ? s.requestFullscreen() : s.mozRequestFullScreen ? s.mozRequestFullScreen() : s.webkitRequestFullScreen ? s.webkitRequestFullScreen() : s.msRequestFullScreen && s.msRequestFullScreen();
    }
    function x() {
      i.exitFullscreen ? i.exitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen ? i.webkitExitFullscreen() : i.msExitFullscreen && i.msExitFullscreen();
    }
    function T() {
      p || (p = !0, f.sendSeekAction());
    }
    function N() {
      d || (d = !0, f.sendFullscreenAction());
    }
    var n = this, s = r.getElement(".VideoPlayer", e), l = r.getElement(".VideoPlayer-player", e), c = r.getElement(".VideoPlayer-timeline", e), h = !1, p = !1, d = !1, v = u.observable(0), m = u.observable(0), g = 60;
    n.media = t.media;
    n.poster = t.poster;
    n.autoplay = t.autoplay || !1;
    n.isPlaying = u.observable(!1);
    n.isInFullscreen = u.observable(!1);
    n.isFullscreenSupported = s.requestFullscreen || s.mozRequestFullScreen || s.webkitRequestFullScreen || s.msRequestFullScreen;
    n.currentProgress = u.observable("0");
    n.currentTime = u.pureComputed(function () {
      return y(v());
    });
    n.totalTime = u.pureComputed(function () {
      return y(m());
    });
    n.playButtonText = u.pureComputed(function () {
      return n.isPlaying() ? a.fetch({ key: "videoPlayer_pause" }) : a.fetch({ key: "videoPlayer_play" });
    });
    n.fullscreenButtonText = u.pureComputed(function () {
      return n.isInFullscreen() ? a.fetch({ key: "videoPlayer_exitFullscreen" }) : a.fetch({ key: "videoPlayer_fullscreen" });
    });
    n.onMetadataLoaded = function () {
      h = !0;
      v(l.currentTime);
      m(l.duration);
      f.sendLoadedEvent();
    };
    n.onTimeUpdated = function () {
      v(l.currentTime);
      b(v() / m() * 100);
    };
    n.onVideoEnded = function () {
      n.isPlaying(!1);
    };
    n.togglePlay = function () {
      h && (l.ended && f.sendReplayAction(), l.paused || l.ended ? (l.play(), n.isPlaying(!0)) : (l.pause(), n.isPlaying(!1)));
    };
    n.toggleFullscreen = function () {
      n.isInFullscreen() ? x() : (n.dispatchEvent(o.events.videoPlayer.FULLSCREEN_ON, null, n.DIRECTION.PARENT), S(), N());
    };
    n.onTimelineClick = function (e, t) {
      w(t);
      T();
    };
    n.onHandleStartDrag = function (e, t) {
      function n() {
        i.removeEventListener("mousemove", w);
        i.removeEventListener("mouseup", n);
      }
      w(t);
      i.addEventListener("mousemove", w);
      i.addEventListener("mouseup", n);
      T();
    };
    n.init = function () {
      n.autoplay && n.isPlaying(!0);
      i.addEventListener("webkitfullscreenchange", E);
      i.addEventListener("mozfullscreenchange", E);
      i.addEventListener("MSFullscreenChange", E);
      i.addEventListener("fullscreenchange", E);
    };
    n.dispose = function () {
      n.currentTime.dispose();
      n.totalTime.dispose();
      n.playButtonText.dispose();
      n.fullscreenButtonText.dispose();
      i.removeEventListener("webkitfullscreenchange", E);
      i.removeEventListener("mozfullscreenchange", E);
      i.removeEventListener("MSFullscreenChange", E);
      i.removeEventListener("fullscreenchange", E);
    };
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("utils/common/eventMixin"), o = e("constants/common"), u = e("vendor/knockout"), a = e("swx-i18n").localization, f = e("telemetry/chat/videoMessagePlayback");
  t.build = function (e, t) {
    return new l(e, t);
  };
  n.assign(l.prototype, s);
});
