define("ui/viewModels/chat/videoPlayer", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "utils/common/eventMixin",
  "swx-constants",
  "vendor/knockout",
  "swx-i18n",
  "telemetry/chat/videoMessagePlayback",
  "ui/players/mediaPlayerController"
], function (e, t) {
  function c(e, t) {
    function T(e) {
      function r(e) {
        return e.toString().length === 1 ? "0" + e : e;
      }
      var t = Math.round(e), n = 0;
      return t >= y && (n = parseInt(t / y), t -= n * y), r(n) + ":" + r(t);
    }
    function N(e) {
      n.currentProgress("width: " + e + "%");
    }
    function C(e) {
      if (!e || !e.pageX)
        return;
      var t = h.offsetWidth, n = h.getBoundingClientRect().left, r = e.pageX - n;
      c.currentTime = c.duration * (r / t);
      N(r / t * 100);
    }
    function k() {
      s.requestFullscreen ? s.requestFullscreen() : s.mozRequestFullScreen ? s.mozRequestFullScreen() : s.webkitRequestFullScreen ? s.webkitRequestFullScreen() : s.msRequestFullScreen && s.msRequestFullScreen();
    }
    function L() {
      i.exitFullscreen ? i.exitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen ? i.webkitExitFullscreen() : i.msExitFullscreen && i.msExitFullscreen();
    }
    function A() {
      d || (d = !0, f.sendSeekAction());
    }
    function O() {
      v || (v = !0, f.sendFullscreenAction());
    }
    function M(e) {
      var t = new Image();
      t.onload = function () {
        n.thumbnail(e);
      };
      t.src = e;
    }
    var n = this, s = r.getElement(".VideoPlayer", e), c = r.getElement(".VideoPlayer-player", e), h = r.getElement(".VideoPlayer-timeline", e), p = !1, d = !1, v = !1, m = u.observable(0), g = u.observable(0), y = 60, b = a.fetch({ key: "swift_videocard_control_button_mute" }), w = a.fetch({ key: "swift_videocard_control_button_unmute" }), E, S = !1, x = !1;
    n.media = t.media;
    n.autoloop = t.autoloop || !1;
    n.autoplay = t.autoplay || !1;
    n.id = t.messageId;
    n.conversationId = t.conversationId;
    n.title = t.title || !1;
    n.subtitle = t.subtitle || !1;
    n.showLoadingInfo = t.showLoadingInfo || !1;
    n.mediaType = o.chat.messageType.VIDEO;
    n.displayCurrentTime = t.displayCurrentTime;
    n.displayTotalTime = t.displayTotalTime;
    n.displayMuteButton = t.displayMuteButton;
    c && (c.muted = t.muted);
    n.isPlaying = u.observable(!1);
    n.isInFullscreen = u.observable(!1);
    n.isMuted = u.observable(t.muted);
    n.thumbnail = u.observable("");
    t.thumbnail && M(t.thumbnail);
    n.isFullscreenSupported = s.requestFullscreen || s.mozRequestFullScreen || s.webkitRequestFullScreen || s.msRequestFullScreen;
    n.currentProgress = u.observable("0");
    n.canPlay = u.observable(!1);
    n.isLoading = u.observable(!0);
    n.failed = u.observable(!1);
    n.currentTime = u.pureComputed(function () {
      return T(m());
    });
    n.totalTime = u.pureComputed(function () {
      return T(g());
    });
    n.playButtonText = u.pureComputed(function () {
      return n.isPlaying() ? a.fetch({ key: "mediaPlayer_pause" }) : a.fetch({ key: "mediaPlayer_play" });
    });
    n.mute = function (e) {
      c && (c.muted = e, n.isMuted(e));
    };
    n.toggleMute = function (e) {
      e && e.touched && (x = !0);
      n.isMuted() ? n.mute(!1) : n.mute(!0);
    };
    n.toggleMuteText = function () {
      return n.isMuted() ? w : b;
    };
    n.fullscreenButtonText = u.pureComputed(function () {
      return n.isInFullscreen() ? a.fetch({ key: "videoPlayer_exitFullscreen" }) : a.fetch({ key: "videoPlayer_fullscreen" });
    });
    n.onError = function () {
      n.canPlay(!1);
      n.isLoading(!1);
      n.failed(!0);
    };
    n.onReady = function () {
      n.canPlay(!0);
      n.isLoading(!1);
    };
    n.onMetadataLoaded = function () {
      p = !0;
      E && E();
      m(c.currentTime);
      g(c.duration);
      f.sendLoadedEvent();
    };
    n.onTimeUpdated = function () {
      m(c.currentTime);
      N(m() / g() * 100);
    };
    n.onVideoEnded = function () {
      x = !1;
      n.isPlaying(!1);
    };
    n.play = function () {
      S = !p;
      p ? (c.play(), n.isPlaying(!0), E = null) : E = n.play.bind(n);
    };
    n.pause = function () {
      S = !1;
      x = !1;
      p ? (c.pause(), n.isPlaying(!1), E = null) : E = n.pause.bind(n);
    };
    n.togglePlay = function (e) {
      c.ended && f.sendReplayAction();
      c.paused || c.ended ? (l.pauseAllInConversation(n.conversationId), n.play(), n.mute(!1), e && e.touched && (x = !0)) : n.pause();
    };
    n.toggleFullscreen = function (e) {
      e && e.touched && (x = n.isPlaying());
      n.isInFullscreen() ? (L(), n.dispatchEvent(o.events.videoPlayer.FULLSCREEN_OFF, null, n.DIRECTION.PARENT)) : (k(), l.onEnteringFullscreen(n.id), n.dispatchEvent(o.events.videoPlayer.FULLSCREEN_ON, null, n.DIRECTION.PARENT), O());
    };
    n.onTimelineClick = function (e, t) {
      x = n.isPlaying();
      C(t);
      A();
    };
    n.onHandleStartDrag = function (e, t) {
      function n() {
        i.removeEventListener("mousemove", C);
        i.removeEventListener("mouseup", n);
      }
      C(t);
      i.addEventListener("mousemove", C);
      i.addEventListener("mouseup", n);
      A();
    };
    n.isQueuedForPlaying = function () {
      return S;
    };
    n.triggeredByUser = function () {
      return x;
    };
    n.init = function () {
      l.registerPlayer(n);
    };
    n.dispose = function () {
      n.currentTime.dispose();
      n.totalTime.dispose();
      n.playButtonText.dispose();
      n.fullscreenButtonText.dispose();
      l.removePlayer(n.id);
    };
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("utils/common/eventMixin"), o = e("swx-constants").COMMON, u = e("vendor/knockout"), a = e("swx-i18n").localization, f = e("telemetry/chat/videoMessagePlayback"), l = e("ui/players/mediaPlayerController");
  t.build = function (e, t) {
    return new c(e, t);
  };
  n.assign(c.prototype, s);
});
