(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/httpRequestDispatcher", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e, t) {
      var n = this;
      this.getRequestOptions = function (e, t, r) {
        var i = {
          headers: t || {},
          retry: {
            delay: 1000,
            enabled: !0,
            limit: 3,
            strategy: "fixed",
            isTransientCheck: n.transientFaultPolicy.isTransientFailure,
            isSuccessCheck: n.transientFaultPolicy.isWebApiSuccess
          },
          reporting: { serviceName: "ngcCallController-" + (e || "") },
          payload: r || null
        };
        return i;
      };
      this.getAsync = function (e, t) {
        return n.salRequestDispatcher.get(e, t);
      };
      this.postAsync = function (e, t) {
        return n.salRequestDispatcher.post(e, t);
      };
      this.putAsync = function (e, t) {
        return n.salRequestDispatcher.put(e, t);
      };
      this.removeAsync = function (e, t) {
        return n.salRequestDispatcher.remove(e, t);
      };
      this.salRequestDispatcher = e;
      this.transientFaultPolicy = t;
    }
    return e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));
