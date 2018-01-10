(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/internalCallTelemetry", [
      "require",
      "exports",
      "../../services/internalPubSub"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("../../services/internalPubSub"), r = function () {
      function e() {
        this.callTelemetryData = {};
        n.get().subscribe("internalPluginEvent", this.recordStep.bind(this));
      }
      return e.prototype.setData = function (e, t) {
        e && t && (this.callTelemetryData[e] = t.toString());
      }, e.prototype.recordStep = function (e) {
        this.setData(e, !0);
      }, e.prototype.getData = function () {
        return Object.keys(this.callTelemetryData).length ? this.callTelemetryData : null;
      }, e.prototype.setCallDirection = function (e) {
        this.callTelemetryData.direction = e;
      }, e.prototype.reset = function () {
        this.callTelemetryData = {};
      }, e;
    }();
  t.build = i;
}));
