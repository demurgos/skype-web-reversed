(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/settablePromise", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e[e.Pending = 0] = "Pending";
    e[e.Rejected = 1] = "Rejected";
    e[e.Resolved = 2] = "Resolved";
  }(n = t.SettablePromiseState || (t.SettablePromiseState = {})));
  var r = function () {
    function e() {
      var e = this;
      this.stateInt = n.Pending;
      this.promiseInt = new Promise(function (t, n) {
        e.resolveInt = t;
        e.rejectInt = n;
      });
    }
    return e.prototype.state = function () {
      return this.stateInt;
    }, e.prototype.resolve = function (e) {
      this.stateInt = n.Resolved;
      this.resolveInt(e);
    }, e.prototype.reject = function (e) {
      this.stateInt = n.Rejected;
      this.rejectInt(e);
    }, e.prototype.promise = function () {
      return this.promiseInt;
    }, e;
  }();
  t.SettablePromise = r;
}));
