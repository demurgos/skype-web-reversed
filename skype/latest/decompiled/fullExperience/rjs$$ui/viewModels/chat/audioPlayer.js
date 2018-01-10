define("ui/viewModels/chat/audioPlayer", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "utils/common/eventMixin",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "ui/players/mediaPlayerController",
  "telemetry/chat/audioMessagePlayback"
], function (e, t) {
  function c(e, t) {
    function y(e) {
      function r(e) {
        return e.toString().length === 1 ? "0" + e : e;
      }
      var t = Math.round(e), n = 0;
      return t >= v && (n = parseInt(t / v), t -= n * v), r(n) + ":" + r(t);
    }
    function b(e) {
      n.currentProgress("width: " + e + "%");
    }
    function w(e) {
      var t = c.offsetWidth, n = c.getBoundingClientRect().left, r = e.pageX - n;
      s.currentTime = s.duration * (r / t);
      b(r / t * 100);
    }
    var n = this, s = r.getElement(".AudioPlayer-player", e), c = r.getElement(".AudioPlayer-timeline", e), h = !1, p = o.observable(0), d = o.observable(0), v = 60, m, g;
    n.media = t.media;
    n.thumbnail = t.thumbnail;
    n.id = t.messageId;
    n.conversationId = t.conversationId;
    n.mediaType = a.chat.messageType.AUDIO;
    n.showLoadingInfo = t.showLoadingInfo || !1;
    n.isPlaying = o.observable(!1);
    n.currentProgress = o.observable("0");
    n.canPlay = o.observable(!1);
    n.isLoading = o.observable(!0);
    n.failed = o.observable(!1);
    n.currentTime = o.pureComputed(function () {
      return y(p());
    });
    n.totalTime = o.pureComputed(function () {
      return y(d());
    });
    n.playButtonText = o.pureComputed(function () {
      return n.isPlaying() ? u.fetch({ key: "mediaPlayer_pause" }) : u.fetch({ key: "mediaPlayer_play" });
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
      h = !0;
      m && m();
      p(s.currentTime);
      d(s.duration);
    };
    n.onTimeUpdated = function () {
      p(s.currentTime);
      b(p() / d() * 100);
    };
    n.onAudioEnded = function () {
      n.isPlaying(!1);
    };
    n.play = function () {
      g = !h;
      h ? (s.play(), n.isPlaying(!0), m = null) : m = n.play.bind(n);
    };
    n.pause = function () {
      g = !1;
      h ? (s.pause(), n.isPlaying(!1), m = null) : m = n.pause.bind(n);
    };
    n.togglePlay = function () {
      s.ended && l.sendReplayAction();
      s.paused || s.ended ? (f.pauseAllInConversation(n.conversationId), n.play()) : n.pause();
    };
    n.onTimelineClick = function (e, t) {
      w(t);
    };
    n.onHandleStartDrag = function (e, t) {
      function n() {
        i.removeEventListener("mousemove", w);
        i.removeEventListener("mouseup", n);
      }
      w(t);
      i.addEventListener("mousemove", w);
      i.addEventListener("mouseup", n);
    };
    n.isQueuedForPlaying = function () {
      return g;
    };
    n.init = function () {
      f.registerPlayer(n);
    };
    n.dispose = function () {
      n.currentTime.dispose();
      n.totalTime.dispose();
      n.playButtonText.dispose();
    };
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("utils/common/eventMixin"), o = e("vendor/knockout"), u = e("swx-i18n").localization, a = e("swx-constants").COMMON, f = e("ui/players/mediaPlayerController"), l = e("telemetry/chat/audioMessagePlayback");
  t.build = function (e, t) {
    return new c(e, t);
  };
  n.assign(c.prototype, s);
});
