define("jSkype/services/stratus/optionsBuilder", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/services/clientInfo",
  "jSkype/constants/common",
  "jSkype/services/stratus/serviceSettings",
  "jSkype/services/serviceAccessLayer/transientFaultPolicy"
], function (e) {
  function c() {
    this._dynamicOptions = {}, this._defaultOptions = {
      headers: {
        Accept: o.JSON_V1_0,
        "X-Stratus-Caller": s.getBIAppName()
      },
      retry: t.merge({ isTransientCheck: a.isTransientFailure }, u.getRetryPolicy())
    }, this._defaultOptions.headers[f] = "", this._defaultOptions.headers[l] = "";
  }
  function h(e, r) {
    var i;
    return function (s) {
      var o = { makeDefault: !0 };
      this.setHeader(f, s, o), this.setHeader(l, n.create().substring(0, 8), o), i = t.merge({}, this._defaultOptions, r), e.resolve(i);
    }.bind(this);
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").guid, r = e("jSkype/client"), i = e("jcafe-property-model"), s = e("jSkype/services/clientInfo"), o = e("jSkype/constants/common").contentTypes, u = e("jSkype/services/stratus/serviceSettings"), a = e("jSkype/services/serviceAccessLayer/transientFaultPolicy"), f = "X-Skypetoken", l = "X-Stratus-Request";
  return c.prototype.setOption = function (e, t) {
    this._dynamicOptions[e] = t;
  }, c.prototype.setHeader = function (e, t, n) {
    n && n.makeDefault ? this._defaultOptions.headers[e] = t : (this._dynamicOptions.headers = this._dynamicOptions.headers || {}, this._dynamicOptions.headers[e] = t);
  }, c.prototype.removeHeader = function (e) {
    this._dynamicOptions.headers && delete this._dynamicOptions.headers[e];
  }, c.prototype.setServiceName = function (e) {
    this._dynamicOptions.reporting = { serviceName: e };
  }, c.prototype.build = function () {
    var e = i.task();
    return r.get().signInManager._skypeToken().then(h.call(this, e, this._dynamicOptions)), this._dynamicOptions = {}, e.promise;
  }, c;
})
