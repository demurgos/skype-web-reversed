define("jSkype/services/plugin/electron/electronVideoRenderer", [
  "require",
  "exports",
  "module",
  "jSkype/services/plugin/electron/electronBase",
  "jSkype/services/plugin/videoComponent",
  "jSkype/telemetry/logging/callingLogTracer",
  "browser/document"
], function (e, t) {
  function o(e) {
    n.call(this);
    this._parentElementId = e;
    this._renderer = new this._skypeModule.VideoRenderer();
    this._renderer.onVideoResolutionChanged = o.prototype._raiseVideoResolutionChanged.bind(this);
  }
  var n = e("jSkype/services/plugin/electron/electronBase"), r = e("jSkype/services/plugin/videoComponent"), i = e("jSkype/telemetry/logging/callingLogTracer").get(), s = e("browser/document");
  o.prototype = Object.create(n.prototype);
  o.prototype.constructor = o;
  o.prototype.load = function () {
    var e = s.getElementById(this._parentElementId);
    try {
      this._renderer.initialize(e);
      this._raiseLoadComplete(!0);
    } catch (t) {
      i.warn(t);
      this._raiseLoadComplete(!1);
    }
  };
  o.prototype.dispose = function (e) {
    try {
      this._renderer.dispose();
    } catch (t) {
      i.warn(t);
    }
    delete this._parentElementId;
    delete this._renderer;
    n.prototype.dispose.call(this, e);
  };
  o.prototype.getFrameSink = function (e) {
    var t = this._renderer.getFrameSinkId();
    e && e({ frameSinkId: t });
  };
  o.prototype.setRenderingMode = function (e, t) {
    var n = this._skypeModule.VideoRenderer.SCALING_MODE, r = {
        Stretch: n.STRETCH,
        Crop: n.CROP,
        Fit: n.FIT
      };
    this._renderer.setScalingMode(r[e]);
    t && t();
  };
  o.prototype._raiseVideoResolutionChanged = function (e, t) {
    this._raiseEvent("VideoResolutionChanged", {
      width: e,
      height: t
    });
  };
  o.prototype.setupVideo = r.prototype.setupVideo;
  t.build = function (e) {
    return new o(e);
  };
});
