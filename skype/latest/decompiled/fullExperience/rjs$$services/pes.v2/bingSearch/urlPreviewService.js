define("services/pes.v2/bingSearch/urlPreviewService", [
  "require",
  "lodash-compat",
  "utils/common/builderMixin",
  "reqwest",
  "cafe/applicationInstance",
  "experience/settings",
  "utils/common/url",
  "constants/common",
  "utils/common/cancelation",
  "services/serviceLocator"
], function (e) {
  function l(e, t, n) {
    this.defaultServiceHost = e;
    this.defaultServceEndpoint = t;
    this.defaultTokenProvider = n;
  }
  function c(e, t, n) {
    var i;
    if (!e || !n)
      return Promise.resolve();
    i = {
      url: o.buildUrl(t.serviceHost + t.serviceEndpoint, { url: e }),
      method: "GET",
      crossOrigin: !0,
      dataType: "json",
      headers: { Authorization: "skype_token " + n }
    };
    var s = a.adaptAbortable(r.compat(i));
    return a.makeCancelable(s, t.cancelationToken);
  }
  var t = e("lodash-compat"), n = e("utils/common/builderMixin"), r = e("reqwest"), i = e("cafe/applicationInstance"), s = e("experience/settings"), o = e("utils/common/url"), u = e("constants/common"), a = e("utils/common/cancelation"), f = e("services/serviceLocator");
  return l.prototype.getPreviewFor = function (n, r) {
    var o = f.resolve(u.serviceLocator.FEATURE_FLAGS), a = o.isFeatureOn(u.featureFlags.NEW_URLP_DOMAIN_ENABLED) ? s.urlPServiceHost : s.amdServiceHost;
    return r = t.defaults({}, r, {
      serviceHost: this.defaultServiceHost,
      tokenProvider: this.defaultTokenProvider,
      serviceEndpoint: this.defaultServceEndpoint
    }, {
      tokenProvider: function () {
        return i.get().signInManager._skypeToken && i.get().signInManager._skypeToken();
      },
      serviceHost: a,
      serviceEndpoint: "/v1/url/info"
    }), r.skypeToken ? c(n, r, r.skypeToken) : Promise.resolve(r.tokenProvider()).then(c.bind(null, n, r));
  }, t.extend(l, n), l;
});
