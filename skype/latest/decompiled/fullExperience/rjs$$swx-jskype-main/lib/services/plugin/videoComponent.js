(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/videoComponent", [
      "require",
      "exports",
      "./baseComponent"
    ], e);
}(function (e, t) {
  var n = e("./baseComponent"), r = "VideoUI", i = function (e) {
      function t(t, n) {
        var i = e.call(this, r) || this;
        return i._init(t, {
          parentElementId: n,
          removePrevious: !0
        }), i;
      }
      return __extends(t, e), t.prototype.setRenderingMode = function (e, t) {
        var n = { mode: e };
        this._invokeMethod("SetRenderingMode", n, t);
      }, t.prototype.getFrameSink = function (e) {
        this._invokeMethod("GetFrameSink", null, e);
      }, t.prototype.setupVideo = function (e, t) {
        var n = this;
        this.getFrameSink(function (r) {
          var i = r.frameSinkId;
          n.setRenderingMode(e, function () {
            t(i);
          });
        });
      }, t;
    }(n["default"]);
  t.__esModule = !0;
  t["default"] = i;
}));
