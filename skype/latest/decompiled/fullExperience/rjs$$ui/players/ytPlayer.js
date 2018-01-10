define("ui/players/ytPlayer", [
  "require",
  "swx-constants",
  "experience/settings",
  "browser/window",
  "browser/document",
  "swx-log-tracer",
  "telemetry/chat/youtubeShowEvent",
  "telemetry/chat/youtubeActionEvent",
  "swx-pubsub-instance"
], function (e) {
  function f() {
    function c() {
      try {
        e.testContext.removePlayer(this.playerId);
      } catch (t) {
        s.error("Error in disposing the Player: ");
        s.error(t);
      }
    }
    function h(t) {
      e.testContext.players[t] && (e.testContext.players[t].destroy(), delete e.testContext.players[t]);
      e.testContext.previewItems[t] && delete e.testContext.previewItems[t];
    }
    function p(e) {
      return e.B ? e.B.currentTime : e.F ? e.F.currentTime : e.getCurrentTime ? e.getCurrentTime() : 0;
    }
    function d(e) {
      return e.H && e.H.duration ? e.H.duration : e.F && e.F.duration ? e.F.duration : e.getDuration ? e.getDuration() : 0;
    }
    function v(e, t, n, r) {
      var i = d(n);
      return t /= 1000, t = t > i ? i : t, {
        type: e,
        duration: t,
        startTime: p(n),
        participantsCount: m(r),
        videoLength: i
      };
    }
    function m(e) {
      return e && e.conversation ? e.conversation.participantsCount() : t.telemetry.NOT_AVAILABLE;
    }
    function g(n) {
      n.previews().forEach(function (n) {
        if (!r || !r.YT || !r.YT.Player)
          return;
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
    function y(t, n) {
      var r = "yt_" + t + "_" + n;
      return e.randomIdEnabled ? r + "_" + Math.random().toString(36).substring(7) : r;
    }
    function b(e) {
      return e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "");
    }
    function w(e, t) {
      var i = "https://www.youtube.com/embed/" + e + "?showinfo=0&enablejsapi=1&modestbranding=1&disablekb=1&rel=0&iv_load_policy=3" + "&hl=" + n.initParams.locale + "&" + "&origin=" + b(r.location);
      return t && (i += "&autoplay=true"), i;
    }
    function E(e) {
      return e.target.id || e.target.getIframe().id;
    }
    var e = this, f, l = 10000;
    e.testContext = {
      players: {},
      previewItems: {},
      onPlayerReady: function (t) {
        try {
          var n = E(t), r = e.testContext.previewItems[n], i = e.testContext.players[n];
          if (i.toDestroy) {
            h(n);
            return;
          }
          i.renderedAndReady = !0;
          if (!r)
            return;
          o.publish(r, t.target, d(t.target), m(r));
        } catch (u) {
          s.error("Error in onPlayerReady: ");
          s.error(u);
        }
      },
      onPlayerStateChange: function (t) {
        try {
          var n = new r.Date().getTime(), i = E(t), o = e.testContext.previewItems[i], a = e.testContext.players[i];
          switch (t.data) {
          case r.YT.PlayerState.BUFFERING:
          case r.YT.PlayerState.CUED:
          case r.YT.PlayerState.UNSTARTED:
            return;
          case r.YT.PlayerState.PLAYING:
            o.lastActionTimestamp = n, u.publish(o, a, v(e.actionType.PLAYING, 0, a, o), n);
            break;
          case r.YT.PlayerState.PAUSED:
            o.lastActionTimestamp = o.lastActionTimestamp || n, u.publish(o, a, v(e.actionType.PAUSED, n - o.lastActionTimestamp, a, o), {
              type: e.actionType.PAUSED,
              duration: n - o.lastActionTimestamp,
              participantsCount: m(o),
              videoLength: d(a)
            }, n), o.lastActionTimestamp = null;
            break;
          case r.YT.PlayerState.ENDED:
            o.lastActionTimestamp = o.lastActionTimestamp || n, u.publish(o, a, v(e.actionType.ENDED, n - o.lastActionTimestamp, a, o), n), o.lastActionTimestamp = null;
          }
        } catch (f) {
          s.error("Error in onPlayerStateChange: ");
          s.error(f);
        }
      },
      removePlayer: function (n) {
        try {
          var i = e.testContext.players[n];
          if (!i)
            return;
          i.renderedAndReady ? h(n) : (r.setTimeout(h.bind(null, n), l), i.toDestroy = !0);
        } catch (o) {
          s.error("Error in removePlayer: ");
          s.error(o);
        }
      },
      onFullscreenChangedHandler: function (n) {
        function l() {
          i && a.publish(t.events.videoPlayer.FULLSCREEN_OFF, i.messageId);
        }
        var i, o;
        if (n.target.id && n.target.id.substring(0, 7) === "yt_msg_") {
          f && (s.error("[YOUTUBE] Trying to go to fullscreen twice! Message in a fullscreen: " + f), o = e.testContext.players[f] || {}, o.inFullScreenMode = !1);
          try {
            f = E(n);
            i = e.testContext.previewItems[f];
            o = e.testContext.players[f];
            o.inFullScreenMode = !0;
            a.publish(t.events.videoPlayer.FULLSCREEN_ON, i ? i.messageId : null);
            u.publish(i, o, {
              type: e.actionType.FULLSCREEN,
              duration: p(o),
              participantsCount: m(i),
              videoLength: d(o)
            }, new r.Date().getTime());
          } catch (c) {
            s.error("Error in onFullscreenChangedHandler: ");
            s.error(c);
          }
        } else {
          try {
            i = e.testContext.previewItems[f];
            o = e.testContext.players[f];
            l();
          } catch (c) {
            s.error("Error in onFullscreenChangedHandler: ");
            s.error(c);
          }
          o && (o.inFullScreenMode = !1, f = null);
        }
      },
      onPlayerError: function (e) {
        s.error("[YT ERROR]");
        s.error(e);
      }
    };
    e.actionType = {
      PLAYING: "play",
      PAUSED: "pause",
      FULLSCREEN: "fullscreen",
      ENDED: "end"
    };
    e.render = function (i, o, u, a) {
      var f = i.originalRequest, l = /(?:youtube.com|youtu.be)\/(watch)?((?:.*)v=|v\/|embed\/)?([\w-]{11})/.exec(f);
      if (l) {
        var h = l[3], p = !!a;
        i.originalSize(!0);
        i.target("");
        i.youtubeId = h;
        i.youtubeUri = w(h, p);
        i.playerId = y(o.contentId, h);
        i.messageId = o.model.key();
        i.contentId = o.contentId;
        i.isMyself = o.isMyself;
        i.messageTimestamp = o.timestamp;
        i.lastActionTimestamp = null;
        i.ytPlayer(!0);
        i.type(t.urlPreviewType.YT);
        i.dispose = c.bind(i);
        i.conversation = u;
        e.testContext.previewItems[i.playerId] = i;
        r.setTimeout(g.bind(null, o), n.youtubeWrapDelay);
      } else
        i.target("_blank"), s.error("Unmatched yt link: " + f);
      return !!l;
    };
    e.parseYTLinks = function (e) {
      var t = e.match(/(?:https?:\/\/|\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+?&v=))([\w-]{11})(?:[^\s.]*)/gi);
      return t ? t : [];
    };
    e.isYT = function (t) {
      return e.parseYTLinks(t).length > 0;
    };
    e.handleClick = function (t) {
      var n = e.testContext.players[t.playerId];
      if (!n) {
        s.error("Unable to find a player for " + t.playerId);
        return;
      }
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
  var t = e("swx-constants").COMMON, n = e("experience/settings"), r = e("browser/window"), i = e("browser/document"), s = e("swx-log-tracer").getLogger(), o = e("telemetry/chat/youtubeShowEvent"), u = e("telemetry/chat/youtubeActionEvent"), a = e("swx-pubsub-instance").default;
  return new f();
});
