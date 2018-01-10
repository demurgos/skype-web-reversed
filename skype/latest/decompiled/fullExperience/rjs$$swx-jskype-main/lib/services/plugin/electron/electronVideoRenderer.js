(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/electron/electronVideoRenderer", [
      "require",
      "exports",
      "./electronBase",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function u(e) {
    return new o(e);
  }
  var n = e("./electronBase"), r = e("../../../../lib/telemetry/logging/callingLogTracer"), i = e("swx-browser-globals"), s = r.get(), o = function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return n._parentElementId = t, n._renderer = new n._skypeModule.VideoRenderer(), n._renderer.onVideoResolutionChanged = n._raiseVideoResolutionChanged.bind(n), n;
      }
      return __extends(t, e), t.prototype.load = function () {
        var e = i.getDocument().getElementById(this._parentElementId);
        try {
          this._renderer.initialize(e);
          this._raiseLoadComplete(!0);
        } catch (t) {
          s.warn(t);
          this._raiseLoadComplete(!1);
        }
      }, t.prototype.dispose = function (t) {
        try {
          this._renderer.dispose();
        } catch (n) {
          s.warn(n);
        }
        delete this._parentElementId;
        delete this._renderer;
        e.prototype.dispose.call(this, t);
      }, t.prototype.getFrameSink = function (e) {
        var t = this._renderer.getFrameSinkId();
        e && e({ frameSinkId: t });
      }, t.prototype.setRenderingMode = function (e, t) {
        var n = this._skypeModule.VideoRenderer.SCALING_MODE, r = {
            Stretch: n.STRETCH,
            Crop: n.CROP,
            Fit: n.FIT
          };
        this._renderer.setScalingMode(r[e]);
        t && t();
      }, t.prototype._raiseVideoResolutionChanged = function (e, t) {
        this._raiseEvent("VideoResolutionChanged", {
          width: e,
          height: t
        });
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
  t.ElectronVideoRenderer = o;
  t.build = u;
}));
