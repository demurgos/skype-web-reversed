(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/videoManager", [
      "require",
      "exports",
      "./componentFactory",
      "swx-constants",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o(e, t) {
    return new s(e, t);
  }
  var n = e("./componentFactory"), r = e("swx-constants"), i = e("swx-constants"), s = function () {
      function e(e, t) {
        this._localVideoMap = {};
        this._participantVideos = {};
        this._managerComponentId = e;
        this._skypeCore = t;
      }
      return e.prototype.setupVideoContainer = function (e) {
        e.id || (e.id = "video-" + +new Date());
      }, e.prototype.getParticipantVideo = function (e, t, n) {
        var r = e._participantVideos;
        return r[t] || (r[t] = {}), r[t][n];
      }, e.prototype.showLocalPreview = function (e, t, i) {
        var s = this, o = this._skypeCore, u = function () {
            return s._localVideoMap[t] && (s._localVideoMap[t].embed || s._localVideoMap[t].creatingLocalVideo);
          };
        if (u())
          return;
        this._localVideoMap[t] = {
          embed: null,
          creatingLocalVideo: !0,
          disposingLocalVideo: !1
        };
        this.setupVideoContainer(e);
        var a = n.createVideoComponent(this._managerComponentId, e.id);
        this._localVideoMap[t].embed = a;
        var f = function (e) {
            o.setLocalFrameSink(e, function () {
              s._localVideoMap[t].creatingLocalVideo = !1;
              o.showLocalVideo(!0, i);
            });
          }, l = a, c = function () {
            l.setupVideo(r.PLUGIN_CONST.VIDEO_MODE.CROP, f);
          }, h = function (e) {
            s.onLocalResolutionChanged && s.onLocalResolutionChanged(e);
          };
        l.onLoadComplete = c;
        l.onVideoResolutionChanged = h;
        a.load();
        l.whenUnloaded.then(function () {
          delete s._localVideoMap[t];
        });
      }, e.prototype.startSendingLocalVideo = function (e, t) {
        this._skypeCore.sendLocalVideo(!0, e, t);
      }, e.prototype.hideLocalPreview = function (e, t) {
        var n = this, r = function () {
            t && t();
          }, i = function () {
            delete n._localVideoMap[e];
            r();
          }, s = function () {
            return n._localVideoMap[e] && !n._localVideoMap[e].disposingLocalVideo;
          };
        s() ? (this._localVideoMap[e].disposingLocalVideo = !0, this._skypeCore.showLocalVideo(!1), this._localVideoMap[e].embed.whenUnloaded.then(i), this._localVideoMap[e].embed.dispose()) : r();
      }, e.prototype.stopSendingLocalVideo = function (e, t) {
        this._skypeCore.sendLocalVideo(!1, e, t);
      }, e.prototype.showParticipant = function (e, t, s) {
        var o = this, u = this._skypeCore;
        if (!e || !t || this.getParticipantVideo(this, e, s))
          return;
        this.setupVideoContainer(t);
        var a = n.createVideoComponent(this._managerComponentId, t.id), f = function (t) {
            o.onResolutionChanged && o.onResolutionChanged(t, e, s);
          }, l = function (t) {
            u.setParticipantFrameSink(e, t, s, function () {
              u.showParticipantVideo(e, !0, s);
            });
          }, c = function () {
            var e = s === i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? r.PLUGIN_CONST.VIDEO_MODE.FIT : r.PLUGIN_CONST.VIDEO_MODE.CROP;
            a.setupVideo(e, l);
          };
        this._participantVideos[e][s] = a;
        a.onLoadComplete = c;
        a.onVideoResolutionChanged = f;
        a.load();
      }, e.prototype.hideParticipant = function (e, t, n) {
        var r = this.getParticipantVideo(this, e, t);
        r && (n || (this._skypeCore.showParticipantVideo(e, !1, t), this._skypeCore.setParticipantFrameSink(e, 0, t)), r.dispose(), delete this._participantVideos[e][t]);
      }, e.prototype.dispose = function () {
        var e = this, t = this._participantVideos;
        Object.keys(t).forEach(function (n) {
          var r = t[n];
          Object.keys(r).forEach(function (t) {
            e.hideParticipant(n, t);
          });
        });
        Object.keys(this._localVideoMap).forEach(function (t) {
          e.hideLocalPreview(t);
        });
      }, e;
    }();
  t.VideoManager = s;
  t.build = o;
}));
