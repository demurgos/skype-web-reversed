(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/builders/requestOptionsBuilder", [
      "require",
      "exports",
      "jcafe-property-model",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("jskype-settings-instance"), i = function () {
      function e(e, t) {
        this.headerSelector = e;
        this.transientFaultPolicy = t;
      }
      return e.prototype.build = function (e, t) {
        var i = this, s = n.task(), o = r.settings.webApiService, u = o.overrides && o.overrides[e], a = o.retry.limit, f = o.retry.delay, l = o.retry.strategy, c = function (n) {
            var r = {
              headers: n,
              retry: {
                limit: a,
                delay: f,
                strategy: l,
                isTransientCheck: i.transientFaultPolicy.isTransientFailure,
                isSuccessCheck: i.transientFaultPolicy.isWebApiSuccess
              },
              reporting: { serviceName: "webapi-" + e }
            };
            t && t.payload && (r.payload = JSON.stringify(t.payload));
            t && t.params && (r.params = t.params);
            s.resolve(r);
          };
        return this.headerSelector.fetch(e).then(c, s.reject.bind(s)), u && (f = u.delay || f, a = u.limit || a, l = u.strategy || l), s.promise;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
