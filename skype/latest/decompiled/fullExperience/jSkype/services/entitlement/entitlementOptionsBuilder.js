define("jSkype/services/entitlement/entitlementOptionsBuilder", [
  "require",
  "lodash-compat",
  "jSkype/client",
  "jSkype/constants/common",
  "jSkype/services/entitlement/serviceSettings",
  "jSkype/services/serviceAccessLayer/transientFaultPolicy",
  "jSkype/services/stratus/optionsBuilder",
  "jSkype/services/entitlement/serviceSettings"
], function (e) {
  function a() {
    this._options = {
      headers: {
        Accept: r.JSON_V3_0,
        "X-Skypetoken": ""
      },
      retry: t.merge({}, { isTransientCheck: s.isTransientFailure }, i.getRetryPolicy()),
      serviceName: u.actions.getEntitlementService,
      addContentType: !1
    };
  }
  var t = e("lodash-compat"), n = e("jSkype/client"), r = e("jSkype/constants/common").contentTypes, i = e("jSkype/services/entitlement/serviceSettings"), s = e("jSkype/services/serviceAccessLayer/transientFaultPolicy"), o = e("jSkype/services/stratus/optionsBuilder"), u = e("jSkype/services/entitlement/serviceSettings");
  return t.assign(a.prototype, o.prototype, {
    constructor: a,
    setHeader: function (e, t) {
      this._options.headers[e] = t;
    },
    build: function () {
      var e = this;
      return n.get().signInManager._skypeToken().then(function (t) {
        return e.setHeader("X-Skypetoken", t), e._options;
      });
    }
  }), a;
})
