define("services/pes.v2/bingSearch/bingSearchService", [
  "require",
  "lodash-compat",
  "utils/common/builderMixin",
  "reqwest",
  "utils/common/cancelation",
  "utils/common/url",
  "experience/settings"
], function (e) {
  function u(e, t, n) {
    this.apiKey = e;
    this.authMethod = t;
    this.serviceUrl = n;
  }
  var t = e("lodash-compat"), n = e("utils/common/builderMixin"), r = e("reqwest"), i = e("utils/common/cancelation"), s = e("utils/common/url"), o = e("experience/settings");
  return u.prototype.search = function (n, u) {
    var a, f;
    return u = t.defaults({}, u, {
      authMethod: this.authMethod,
      apiKey: this.apiKey,
      serviceUrl: this.serviceUrl
    }, {
      authMethod: o.pesSearchServices.bingAuthMethod,
      apiKey: o.pesSearchServices.bingApiKey,
      serviceUrl: o.pesSearchServices.bingServiceURL
    }, { fetch: 20 }), n ? (a = {
      headers: { Authorization: u.authMethod + " " + u.apiKey },
      url: s.buildUrl(u.serviceUrl, {
        Query: "'" + n + "'",
        $top: u.fetch
      }),
      dataType: "json",
      crossOrigin: !0
    }, f = i.adaptAbortable(r.compat(a)), i.makeCancelable(f, u.cancelationToken).then(function (e) {
      return e.d.results.map(function (e) {
        return {
          id: e.ID,
          url: e.MediaUrl,
          contentType: e.ContentType,
          thumbnail: e.Thumbnail.MediaUrl,
          title: e.Title,
          width: e.Width,
          height: e.Height
        };
      });
    })) : Promise.resolve();
  }, t.extend(u, n), u;
});
