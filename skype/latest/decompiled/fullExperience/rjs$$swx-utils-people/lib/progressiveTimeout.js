(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/progressiveTimeout", [
      "require",
      "exports",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  var n = e("swx-utils-common"), r = {
      ONE_MINUTE: 1,
      LIMIT_HOUR: 59,
      ONE_HOUR: 60,
      LIMIT_DAY: 1439,
      ONE_DAY: 1440
    }, i = [
      {
        timeout: r.ONE_MINUTE,
        limit: r.LIMIT_HOUR
      },
      {
        timeout: r.ONE_HOUR,
        limit: r.LIMIT_DAY
      },
      {
        timeout: r.ONE_DAY,
        limit: null
      }
    ], s = function () {
      function e(e) {
        this.timeouts = {};
        this.$unit = { timeouts: this.timeouts };
        this.timeoutProvider = e;
      }
      return e.prototype.start = function (e, t) {
        this.timeouts.hasOwnProperty(e) || (this.timeouts[e] = {
          callbacks: {},
          timeoutId: null,
          timeout: this.getTimeout()
        });
        var r = this.timeouts[e];
        r.callbacks || (r.callbacks = {});
        var i = n.guid.create();
        return r.callbacks[i] = t, r.timeoutId === null && this.runCallbacks(e), i;
      }, e.prototype.stop = function (e, t) {
        var n = this.timeouts[e];
        if (!n)
          return;
        n.callbacks.hasOwnProperty(t) && delete n.callbacks[t];
        Object.keys(n.callbacks).length === 0 && (this.timeoutProvider.clearTimeout(n.timeoutId), n.timeoutId = null);
      }, e.prototype.reset = function (e, t) {
        this.timeouts.hasOwnProperty(e) && (this.timeouts[e].timeout = this.getTimeout(t));
      }, e.prototype.getTimeout = function (e) {
        e === void 0 && (e = null);
        if (e === undefined || e === null)
          return this.toMilliseconds(i[0].timeout);
        for (var t = 0; t < i.length; t++) {
          var n = i[t];
          if (n.limit && e > n.limit)
            continue;
          return this.toMilliseconds(n.timeout);
        }
        return this.toMilliseconds(i[i.length - 1].timeout);
      }, e.prototype.toMilliseconds = function (e) {
        return e * 60 * 1000;
      }, e.prototype.runCallbacks = function (e) {
        var t = this, n = this.timeouts[e];
        n.timeoutId = this.timeoutProvider.setTimeout(function () {
          t.runCallbacks(e);
        }, n.timeout);
        for (var r in n.callbacks)
          n.callbacks.hasOwnProperty(r) && n.callbacks[r]();
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = s;
}));
