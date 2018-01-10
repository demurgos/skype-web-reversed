(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/optionsBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "jskype-constants",
      "./serviceAccessLayer/transientFaultPolicy",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function l(e, t) {
    var r = this, i;
    return function (s) {
      var o = { makeDefault: !0 };
      r.setHeader(a, s, o);
      i = n.merge({}, r._defaultOptions, t);
      e.resolve(i);
    };
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("jcafe-property-model"), s = e("jskype-constants"), o = e("./serviceAccessLayer/transientFaultPolicy"), u = e("jskype-settings-instance"), a = "X-Skypetoken", f = function () {
      function e() {
        this._dynamicOptions = {};
        this._defaultOptions = { headers: { Accept: s.COMMON.contentTypes.JSON_V1_0 } };
        this._defaultOptions.headers[a] = "";
        this._defaultOptions.retry = this.getRetryPolicy();
      }
      return e.prototype.getRetryPolicy = function () {
        var e = u.settings.retry;
        return n.merge({ isTransientCheck: o.isTransientFailure }, e);
      }, e.prototype.setOption = function (e, t) {
        this._dynamicOptions[e] = t;
      }, e.prototype.setHeader = function (e, t, n) {
        n && n.makeDefault ? this._defaultOptions.headers[e] = t : (this._dynamicOptions.headers = this._dynamicOptions.headers || {}, this._dynamicOptions.headers[e] = t);
      }, e.prototype.removeHeader = function (e) {
        this._dynamicOptions.headers && delete this._dynamicOptions.headers[e];
      }, e.prototype.setServiceName = function (e) {
        this._dynamicOptions.reporting = { serviceName: e };
      }, e.prototype.build = function () {
        var e = i.task();
        return r.get().signInManager._skypeToken().then(l.call(this, e, this._dynamicOptions)), this._dynamicOptions = {}, e.promise;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = f;
}));
