(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/mediaManager", [
      "require",
      "exports",
      "./sessionDescriptorUtils",
      "../constants",
      "../common/utils",
      "./mediaEntity"
    ], e);
}(function (e, t) {
  var n = e("./sessionDescriptorUtils"), r = e("../constants"), i = e("../common/utils"), s = e("./mediaEntity"), o = function () {
      function e(e, t) {
        this.mediaEntities = [];
        this.mediaEntitiesBackup = [];
        this.midId = 0;
        this.mediaTracks = [];
        this.logger = e.logger;
        this.settings = e.settings;
        this.numVideoChannels = e.numVideoChannels;
        this.listener = t;
      }
      return e.prototype.generateMid = function (e) {
        return "media_" + e;
      }, e.prototype.fromOffer = function (e, t) {
        var n = this;
        e.media.forEach(function (e) {
          if (e.type === r["default"].MEDIA_TYPE.audio)
            r["default"].MODALITY.audio in t && n.addMediaEntity(r["default"].MODALITY.audio);
          else if (e.type === r["default"].MEDIA_TYPE.video) {
            if (r["default"].MODALITY.video in t)
              for (var i = 0; i < n.numVideoChannels; i++)
                n.addMediaEntity(r["default"].MODALITY.video);
            r["default"].MODALITY.sharing in t && n.addMediaEntity(r["default"].MODALITY.sharing);
          }
        });
      }, e.prototype.fromRemote = function (e, t) {
        var r = this;
        e.media.forEach(function (e, s) {
          var o = n["default"].getModality(e);
          if (e.port !== 0 && o in t) {
            r.mediaEntities[s] ? r.mediaEntities[s].enable(o, e.mid || r.generateMid(s)) : r.addMediaEntity(o, e.mid || r.generateMid(s));
            if (e.msid)
              r.mediaEntities[s].setStreamId(e.msid.split(" ")[0]), r.mediaEntities[s].setTrackId(e.msid.split(" ")[1]);
            else if (e.ssrcs) {
              var u = i["default"].find(e.ssrcs, function (e) {
                return e.attribute === "msid";
              });
              u ? (r.mediaEntities[s].setStreamId(u.value.split(" ")[0]), r.mediaEntities[s].setTrackId(u.value.split(" ")[1])) : r.logger.warn("No ssrc msid for media of type " + e.type + " with mid " + e.mid);
            }
            r.mediaEntities[s].setXSourceStreamId(e.xSourceStreamId);
          } else
            r.mediaEntities[s] ? r.mediaEntities[s].disable() : r.addDisabledMediaEntity(o), r.mediaEntities[s].setStreamId(null), r.mediaEntities[s].setTrackId(null);
        });
      }, e.prototype.isEmpty = function () {
        return this.mediaEntities.length === 0;
      }, e.prototype.addMediaEntity = function (e, t) {
        this.mediaEntities.push(s["default"].create(this.settings, this.listener, e, t || this.generateMid(this.mediaEntities.length)));
      }, e.prototype.addDisabledMediaEntity = function (e) {
        this.mediaEntities.push(s["default"].create(this.settings, this.listener, e, null));
      }, e.prototype.getMediaEntities = function () {
        return this.mediaEntities;
      }, e.prototype.getMediaEntity = function (e) {
        return this.mediaEntities[e];
      }, e.prototype.getMediaEntityByMid = function (e) {
        return i["default"].find(this.mediaEntities, function (t) {
          return t.getMid() === e;
        });
      }, e.prototype.getMediaEntitiesByModality = function (e) {
        return this.mediaEntities.filter(function (t) {
          return t.getModality() === e;
        });
      }, e.prototype.getMediaEntityByStreamId = function (e) {
        return i["default"].find(this.mediaEntities, function (t) {
          return t.getStreamId() === e;
        });
      }, e.prototype.getMediaEntityByXSourceStreamId = function (e) {
        return i["default"].find(this.mediaEntities, function (t) {
          return t.getXSourceStreamId() === e;
        });
      }, e.prototype.reset = function () {
        this.mediaEntities = [];
      }, e.prototype.syncModalities = function (e, t) {
        this.disableModalities(e);
        t || (this.enableModalities(e), this.addModalities(e));
      }, e.prototype.enableModalities = function (e) {
        var t = this;
        this.mediaEntities.forEach(function (n, r) {
          n.getModality() in e && n.isDisabled() && n.enable(n.getModality(), t.generateMid(r));
        });
      }, e.prototype.disableModalities = function (e) {
        this.mediaEntities.forEach(function (t) {
          t.getModality() in e || t.disable();
        });
      }, e.prototype.addModalities = function (e) {
        var t = {};
        this.mediaEntities.map(function (e) {
          return e.getModality();
        }).forEach(function (e) {
          t[e] = !0;
        });
        for (var n in e)
          n in t || this.addMediaEntity(n);
      }, e.prototype.setMediaTracks = function (e) {
        this.mediaTracks = e;
      }, e.prototype.getMediaTracks = function () {
        return this.mediaTracks;
      }, e.prototype.backup = function () {
        var e = this;
        this.mediaEntitiesBackup = [];
        this.mediaEntities.forEach(function (t) {
          e.mediaEntitiesBackup.push(t.clone());
        });
      }, e.prototype.commit = function () {
        this.mediaEntitiesBackup = [];
      }, e.prototype.rollback = function () {
        this.mediaEntities = this.mediaEntitiesBackup;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
