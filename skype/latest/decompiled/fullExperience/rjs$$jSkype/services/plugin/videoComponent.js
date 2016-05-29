define("jSkype/services/plugin/videoComponent", [
  "require",
  "jSkype/services/plugin/baseComponent"
], function (e) {
  function r(e, t) {
    this._init.call(this, e, {
      parentElementId: t,
      removePrevious: !0
    });
  }
  var t = "VideoUI", n = e("jSkype/services/plugin/baseComponent");
  return r.prototype = new n(t), r.constructor = n.constructor, r.prototype.setRenderingMode = function (t, n) {
    var r = { mode: t };
    this._invokeMethod("SetRenderingMode", r, n);
  }, r.prototype.getFrameSink = function (t) {
    this._invokeMethod("GetFrameSink", null, t);
  }, r.prototype.setupVideo = function (e, t) {
    var n = this;
    n.getFrameSink(function (r) {
      var i = r.frameSinkId;
      n.setRenderingMode(e, function () {
        t(i);
      });
    });
  }, r;
});
