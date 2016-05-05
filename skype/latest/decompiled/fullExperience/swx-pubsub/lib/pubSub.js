function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-pubsub/lib/pubSub", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    for (var t in e)
      if (!e[t])
        throw new Error(t + " is mandatory");
  }
  function r(e, t) {
    return t && t.indexOf(e) >= 0;
  }
  function i(e, t) {
    if (!t || !r(e, t))
      return;
    t.splice(t.indexOf(e), 1);
  }
  var s = function () {
    function e() {
      this.callbacks = {};
    }
    return e.prototype.subscribe = function (e, t) {
      n({
        eventName: e,
        callback: t
      }), this.callbacks[e] = this.callbacks[e] || [], r(t, this.callbacks[e]) || this.callbacks[e].push(t);
    }, e.prototype.unsubscribe = function (e, t) {
      n({
        eventName: e,
        callback: t
      });
      var r = this.callbacks[e];
      i(t, r);
    }, e.prototype.publish = function (e, t) {
      n({ eventName: e });
      if (this.callbacks[e]) {
        var r = this.callbacks[e].slice(0);
        for (var i = r.length - 1; i >= 0; i--)
          r[i](t);
      }
    }, e.prototype.unsubscribeAll = function () {
      this.callbacks = {};
    }, e;
  }();
  t.__esModule = !0, t["default"] = s;
})
