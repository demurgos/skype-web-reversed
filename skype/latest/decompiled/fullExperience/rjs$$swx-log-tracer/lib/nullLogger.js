(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/nullLogger", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    return new r();
  }
  t.build = n;
  var r = function () {
    function e() {
    }
    return e.prototype.log = function () {
    }, e.prototype.info = function () {
    }, e.prototype.warn = function () {
    }, e.prototype.error = function () {
    }, e.prototype.debug = function () {
    }, e.prototype.createChild = function () {
      return this;
    }, e.prototype.supportsCorrelationId = function () {
      return !1;
    }, e;
  }();
}));
