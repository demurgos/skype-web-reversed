define("jSkype/services/plugin/videoManager", [
  "require",
  "jSkype/services/plugin/componentFactory",
  "constants/plugin.const",
  "constants/calling"
], function (e) {
  function s(e) {
    e.id || (e.id = "video-" + +new Date());
  }
  function o(e, t, n) {
    var r = e._participantVideos;
    return r[t] || (r[t] = {}), r[t][n];
  }
  var t = e("jSkype/services/plugin/componentFactory"), n = e("constants/plugin.const"), r = e("constants/calling"), i = function (e, t) {
      this._managerComponentId = e;
      this._skypeCore = t;
      this._localVideoMap = {};
      this._participantVideos = {};
    };
  return i.prototype.showLocalPreview = function (r, i, o) {
    function l() {
      return a._localVideoMap[i] && (a._localVideoMap[i].embed || a._localVideoMap[i].creatingLocalVideo);
    }
    function c() {
      f.setupVideo(n.VIDEO_MODE.CROP, h);
    }
    function h(e) {
      u.setLocalFrameSink(e, function () {
        a._localVideoMap[i].creatingLocalVideo = !1;
        u.showLocalVideo(!0, o);
      });
    }
    function p(e) {
      a.onLocalResolutionChanged && a.onLocalResolutionChanged(e);
    }
    var u = this._skypeCore, a = this, f;
    if (l())
      return;
    a._localVideoMap[i] = {
      embed: null,
      creatingLocalVideo: !0,
      disposingLocalVideo: !1
    };
    s(r);
    f = t.createVideoComponent(a._managerComponentId, r.id);
    a._localVideoMap[i].embed = f;
    f.onLoadComplete = c;
    f.onVideoResolutionChanged = p;
    f.load();
    f.whenUnloaded.then(function () {
      delete a._localVideoMap[i];
    });
  }, i.prototype.startSendingLocalVideo = function (t, n) {
    var r = this._skypeCore;
    r.sendLocalVideo(!0, t, n);
  }, i.prototype.hideLocalPreview = function (t, n) {
    function i() {
      n && n();
    }
    function s() {
      delete r._localVideoMap[t];
      i();
    }
    function o() {
      return r._localVideoMap[t] && !r._localVideoMap[t].disposingLocalVideo;
    }
    var r = this;
    o() ? (r._localVideoMap[t].disposingLocalVideo = !0, r._skypeCore.showLocalVideo(!1), r._skypeCore.setLocalFrameSink(0), r._localVideoMap[t].embed.dispose(s)) : i();
  }, i.prototype.stopSendingLocalVideo = function (t, n) {
    this._skypeCore.sendLocalVideo(!1, t, n);
  }, i.prototype.showParticipant = function (i, u, a) {
    function h(e) {
      f.onResolutionChanged && f.onResolutionChanged(e, i, a);
    }
    function p() {
      var e = a === r.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? n.VIDEO_MODE.FIT : n.VIDEO_MODE.CROP;
      c.setupVideo(e, d);
    }
    function d(e) {
      l.setParticipantFrameSink(i, e, a, function () {
        l.showParticipantVideo(i, !0, a);
      });
    }
    var f = this, l = f._skypeCore, c;
    if (!i || !u || o(f, i, a))
      return;
    s(u);
    c = t.createVideoComponent(f._managerComponentId, u.id);
    f._participantVideos[i][a] = c;
    c.onLoadComplete = p;
    c.onVideoResolutionChanged = h;
    c.load();
  }, i.prototype.hideParticipant = function (t, n, r) {
    var i = o(this, t, n);
    i && (r || (this._skypeCore.showParticipantVideo(t, !1, n), this._skypeCore.setParticipantFrameSink(t, 0, n)), i.dispose(), delete this._participantVideos[t][n]);
  }, i.prototype.dispose = function () {
    var t = this, n = t._participantVideos;
    Object.keys(n).forEach(function (e) {
      var r = n[e];
      Object.keys(r).forEach(function (n) {
        t.hideParticipant(e, n);
      });
    });
    Object.keys(t._localVideoMap).forEach(function (e) {
      t.hideLocalPreview(e);
    });
  }, {
    build: function (e, t) {
      return new i(e, t);
    }
  };
});
