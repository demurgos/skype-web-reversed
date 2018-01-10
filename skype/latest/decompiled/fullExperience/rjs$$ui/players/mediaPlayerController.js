define("ui/players/mediaPlayerController", [
  "require",
  "swx-constants",
  "lodash-compat",
  "browser/document",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
  "swx-cafe-application-instance",
  "browser/window"
], function (e) {
  function a() {
    function d(e) {
      n.forEach(e, function (e) {
        e.pause();
        e.type === t.chat.messageType.VIDEO && e.mute(!0);
      });
    }
    function v(e) {
      if (!e)
        return;
      return n.find(a, function (t) {
        return t.id === e;
      });
    }
    function m(e) {
      return n.filter(a, function (t) {
        return t.conversationId === e;
      });
    }
    function g(e) {
      if (!e) {
        var t = b();
        t && t.pause();
      }
    }
    function y() {
      if (n.isUndefined(p)) {
        var e = s.resolve(t.serviceLocator.FEATURE_FLAGS);
        p = e.isFeatureOn(t.featureFlags.VIDEO_AUTOPLAY_SETTINGS_ENABLED);
        p && o.get().personsAndGroupsManager.mePerson.preferences(t.userSettings.preferences.VIDEO_AUTOPLAY).value.get().then(g);
      }
      return p && o.get().personsAndGroupsManager.mePerson.preferences(t.userSettings.preferences.VIDEO_AUTOPLAY).value();
    }
    function b() {
      return n.find(a, function (e) {
        return e.isPlaying() || e.isQueuedForPlaying();
      });
    }
    function w(t) {
      var n = t.target && (t.target.id && t.target.id.substring(0, 7) === "yt_msg_" || t.target.activeElement && t.target.activeElement.id && t.target.activeElement.id.substring(0, 7) === "yt_msg_");
      if (n)
        return;
      var i = !!(r.fullscreenElement || r.mozFullScreenElement || r.webkitFullscreenElement), s = v(l);
      s && s.isInFullscreen(i);
      i || e.onLeavingFullscreen();
    }
    function E() {
      var e = b();
      e && !e.triggeredByUser() && (e.pause(), c = e);
    }
    function S() {
      c && (c.play(), c = null);
    }
    var e = this, a = [], f = {}, l, c, h = function () {
      }, p;
    e.pauseAllInConversation = function (e) {
      d(m(e));
    };
    e.registerPlayer = function (e) {
      var t = {
        id: e.id,
        conversationId: e.conversationId,
        isInFullscreen: e.isInFullscreen || h,
        pause: e.pause,
        play: e.play,
        mute: e.mute || h,
        type: e.mediaType,
        isPlaying: e.isPlaying,
        autoplay: e.autoplay,
        isQueuedForPlaying: e.isQueuedForPlaying,
        triggeredByUser: e.triggeredByUser || function () {
          return !0;
        }
      };
      f[e.conversationId] = !0;
      a.push(t);
    };
    e.removePlayer = function (e) {
      var t = v(e);
      a.splice(a.indexOf(t), 1);
      var n = a.filter(function (e) {
        return e.conversationId === t.conversationId;
      });
      f[t.conversationId] = n.length > 0;
    };
    e.onEnteringFullscreen = function (e) {
      i.publish(t.events.videoPlayer.FULLSCREEN_ON);
      l = e;
    };
    e.onLeavingFullscreen = function () {
      l && (i.publish(t.events.videoPlayer.FULLSCREEN_OFF, l), l = null);
    };
    e.onVisibleViewPortChanged = function (e, n) {
      if (!y())
        return;
      var r = b(), i;
      if (r && (r.conversationId !== e || r.triggeredByUser()))
        return;
      if (!f.hasOwnProperty(e))
        return;
      n.sort(function (e, t) {
        return e - t;
      });
      for (var s = n.length - 1; s >= 0; s--) {
        var o = v(n[s]);
        if (o && o.type === t.chat.messageType.VIDEO && o.autoplay) {
          i = o;
          break;
        }
      }
      if (i && i === r)
        return;
      r && r.pause();
      i && (i.mute(!0), i.play());
    };
    r.addEventListener("webkitfullscreenchange", w);
    r.addEventListener("mozfullscreenchange", w);
    r.addEventListener("MSFullscreenChange", w);
    r.addEventListener("fullscreenchange", w);
    u.addEventListener(t.events.browser.BLUR, E);
    u.addEventListener(t.events.browser.FOCUS, S);
  }
  var t = e("swx-constants").COMMON, n = e("lodash-compat"), r = e("browser/document"), i = e("swx-pubsub-instance").default, s = e("swx-service-locator-instance").default, o = e("swx-cafe-application-instance"), u = e("browser/window");
  return new a();
});
