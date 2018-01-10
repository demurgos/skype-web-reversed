(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/mozSdpTransform", [
      "require",
      "exports",
      "../sessionDescriptorUtils"
    ], e);
}(function (e, t) {
  var n = e("../sessionDescriptorUtils"), r = function () {
      function e() {
      }
      return e.prototype.fromNative = function (e, t, r, i) {
        return e.media.forEach(function (e, i) {
          var s = t.getMediaEntity(i);
          s && s.isEnabled() && e.port !== 0 ? (e.label = n["default"].getLabelForModality(s.getModality()), e.direction = r[s.getModality()]) : e.port = 0;
        }), e;
      }, e.prototype.toLocal = function (e, t, n) {
        return e;
      }, e.prototype.toOffer = function (e, t, n) {
        return this.fromNative(e, t, n, !0);
      }, e.prototype.toAnswer = function (e, t, n) {
        return this.fromNative(e, t, n, !1);
      }, e.prototype.toRemote = function (e, t, n) {
        var r;
        return e.media.forEach(function (e, t) {
          e.connection ? r = e.connection : r && (e.connection = r);
        }), e;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
