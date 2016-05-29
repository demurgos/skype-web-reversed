define("ui/players/ytPlayer", [
  "require",
  "constants/common",
  "experience/settings",
  "browser/window",
  "browser/document",
  "telemetry/chat/youtubeShowEvent",
  "telemetry/chat/youtubeActionEvent",
  "services/pubSub/pubSub"
], function (e) {
  function a() {
    function l() {
      e.testContext.removePlayer(this.playerId);
    }
    function c(t) {
      e.testContext.players[t] && (e.testContext.players[t].destroy(), delete e.testContext.players[t]);
      e.testContext.previewItems[t] && delete e.testContext.previewItems[t];
    }
    function h(e) {
      return e.B ? e.B.currentTime : e.F ? e.F.currentTime : e.getCurrentTime ? e.getCurrentTime() : 0;
    }
    function p(e) {
      return e.H && e.H.duration ? e.H.duration : e.F && e.F.duration ? e.F.duration : e.getDuration ? e.getDuration() : 0;
    }
    function d(e, t, n, r) {
      var i = p(n);
      return t /= 1000, t = t > i ? i : t, {
        type: e,
        duration: t,
        startTime: h(n),
        participantsCount: v(r),
        videoLength: i
      };
    }
    function v(e) {
      return e && e.conversation ? e.conversation.participantsCount() : t.telemetry.NOT_AVAILABLE;
    }
    function m(n) {
      n.previews().forEach(function (n) {
        if (n.type() !== t.urlPreviewType.YT || !n.playerId)
          return;
        if (e.testContext.players[n.playerId])
          return;
        e.testContext.players[n.playerId] = new r.YT.Player(n.playerId, {
          events: {
            onReady: e.testContext.onPlayerReady,
            onStateChange: e.testContext.onPlayerStateChange,
            onError: e.testContext.onPlayerError
          }
        });
      });
    }
    function g(t, n) {
      var r = "yt_" + t + "_" + n;
      return e.randomIdEnabled ? r + "_" + Math.random().toString(36).substring(7) : r;
    }
    function y(e) {
      return e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "");
    }
    function b(e, t) {
      var i = "https://www.youtube.com/embed/" + e + "?showinfo=0&enablejsapi=1&modestbranding=1&disablekb=1&rel=0&iv_load_policy=3" + "&hl=" + n.initParams.locale + "&" + "&origin=" + y(r.location);
      return t && (i += "&autoplay=true"), i;
    }
    function w(e) {
      return e.target.id || e.target.getIframe().id;
    }
    var e = this, a, f = 10000;
    e.testContext = {
      players: {},
      previewItems: {},
      onPlayerReady: function (t) {
        var n = w(t), r = e.testContext.previewItems[n], i = e.testContext.players[n];
        if (i.toDestroy) {
          c(n);
          return;
        }
        i.renderedAndReady = !0;
        if (!r)
          return;
        s.publish(r, t.target, p(t.target), v(r));
      },
      onPlayerStateChange: function (t) {
        var n = new r.Date().getTime(), i = w(t), s = e.testContext.previewItems[i], u = e.testContext.players[i];
        switch (t.data) {
        case r.YT.PlayerState.BUFFERING:
        case r.YT.PlayerState.CUED:
        case r.YT.PlayerState.UNSTARTED:
          return;
        case r.YT.PlayerState.PLAYING:
          s.lastActionTimestamp = n, o.publish(s, u, d(e.actionType.PLAYING, 0, u, s), n);
          break;
        case r.YT.PlayerState.PAUSED:
          s.lastActionTimestamp = s.lastActionTimestamp || n, o.publish(s, u, d(e.actionType.PAUSED, n - s.lastActionTimestamp, u, s), {
            type: e.actionType.PAUSED,
            duration: n - s.lastActionTimestamp,
            participantsCount: v(s),
            videoLength: p(u)
          }, n), s.lastActionTimestamp = null;
          break;
        case r.YT.PlayerState.ENDED:
          s.lastActionTimestamp = s.lastActionTimestamp || n, o.publish(s, u, d(e.actionType.ENDED, n - s.lastActionTimestamp, u, s), n), s.lastActionTimestamp = null;
        }
      },
      removePlayer: function (n) {
        var i = e.testContext.players[n];
        if (!i)
          return;
        i.renderedAndReady ? c(n) : (r.setTimeout(c.bind(null, n), f), i.toDestroy = !0);
      },
      onFullscreenChangedHandler: function (n) {
        var i, s;
        n.target.id && n.target.id.substring(0, 7) === "yt_msg_" ? (a && (s = e.testContext.players[a] || {}, s.inFullScreenMode = !1), a = w(n), i = e.testContext.previewItems[a], s = e.testContext.players[a], s.inFullScreenMode = !0, u.publish(t.events.videoPlayer.FULLSCREEN_ON, i ? i.messageId : null), o.publish(i, s, {
          type: e.actionType.FULLSCREEN,
          duration: h(s),
          participantsCount: v(i),
          videoLength: p(s)
        }, new r.Date().getTime())) : (i = e.testContext.previewItems[a], s = e.testContext.players[a], u.publish(t.events.videoPlayer.FULLSCREEN_OFF, i ? i.messageId : null), s && (s.inFullScreenMode = !1, a = null));
      },
      onPlayerError: function (e) {
      }
    };
    e.actionType = {
      PLAYING: "play",
      PAUSED: "pause",
      FULLSCREEN: "fullscreen",
      ENDED: "end"
    };
    e.render = function (i, s, o, u) {
      var a = i.originalRequest, f = /(?:youtube.com|youtu.be)\/(watch)?(\?v=|v\/|embed\/)?(?:.*)([\w-]{11})(?:.*)?/.exec(a);
      if (f) {
        var c = f[3], h = !!u;
        i.originalSize(!0);
        i.typeClasses.youtube(!0);
        i.target("");
        i.youtubeId = c;
        i.youtubeUri = b(c, h);
        i.playerId = g(s.contentId, c);
        i.messageId = s.model.key();
        i.contentId = s.contentId;
        i.isMyself = s.isMyself;
        i.messageTimestamp = s.timestamp;
        i.lastActionTimestamp = null;
        i.ytPlayer(!0);
        i.type(t.urlPreviewType.YT);
        i.dispose = l.bind(i);
        i.conversation = o;
        e.testContext.previewItems[i.playerId] = i;
        r.setTimeout(m.bind(null, s), n.youtubeWrapDelay);
      } else
        i.target("_blank");
      return !!f;
    };
    e.parseYTLinks = function (e) {
      var t = e.match(/(?:https?:\/\/|\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+?&v=))([\w-]{11})/gi);
      return t ? t : [];
    };
    e.isYT = function (t) {
      return e.parseYTLinks(t).length > 0;
    };
    e.handleClick = function (t) {
      var n = e.testContext.players[t.playerId];
      if (!n)
        return;
      n.getPlayerState() === r.YT.PlayerState.PLAYING ? n.pauseVideo() : n.playVideo();
    };
    e.randomIdEnabled = !0;
    r.onYouTubeIframeAPIReady = function () {
      i.addEventListener("mozfullscreenchange", e.testContext.onFullscreenChangedHandler);
      i.addEventListener("webkitfullscreenchange", e.testContext.onFullscreenChangedHandler);
      i.addEventListener("fullscreenchange", e.testContext.onFullscreenChangedHandler);
      i.addEventListener("MSFullscreenChange", e.testContext.onFullscreenChangedHandler);
    };
  }
  var t = e("constants/common"), n = e("experience/settings"), r = e("browser/window"), i = e("browser/document"), s = e("telemetry/chat/youtubeShowEvent"), o = e("telemetry/chat/youtubeActionEvent"), u = e("services/pubSub/pubSub");
  return new a();
});
