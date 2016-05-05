function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-giphy-service/lib/giphy", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "reqwest"
    ], e);
}(function (e, t) {
  function f(e, t) {
    var n = r.cancelation.adaptAbortable(i.compat(e));
    return r.cancelation.makeCancelable(n, t);
  }
  function c(e) {
    return new l(e);
  }
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("reqwest"), s = {
      endpoint: "v1/gifs/search",
      rating: "g",
      limit: 20,
      offset: 0
    }, o = {
      endpoint: "v1/gifs/translate",
      rating: "g"
    }, u = {
      endpoint: "v1/gifs/random",
      rating: "g"
    }, a = {
      endpoint: "v1/gifs/trending",
      rating: "g",
      limit: 20
    }, l = function () {
      function e(e) {
        this.options = e;
      }
      return e.prototype.search = function (e, t) {
        if (!e)
          return Promise.resolve();
        t = n.defaults({}, t, this.options, s);
        var i = {
          url: r.url.buildUrl(t.serviceUrl, t.endpoint, {
            api_key: t.apiKey,
            rating: t.rating,
            limit: t.limit,
            offset: t.offset,
            q: e
          }),
          method: "get",
          dataType: "json",
          crossOrigin: !0
        };
        return f(i, t.cancelationToken);
      }, e.prototype.translate = function (e, t) {
        if (!e)
          return Promise.resolve();
        t = n.defaults({}, t, this.options, o);
        var i = {
          url: r.url.buildUrl(t.serviceUrl, t.endpoint, {
            api_key: t.apiKey,
            rating: t.rating,
            s: e
          }),
          method: "get",
          dataType: "json",
          crossOrigin: !0
        };
        return f(i, t.cancelationToken);
      }, e.prototype.random = function (e, t) {
        t = n.defaults({}, t, this.options, u);
        var i = {
          url: r.url.buildUrl(t.serviceUrl, t.endpoint, e ? {
            api_key: t.apiKey,
            rating: t.rating,
            tag: e
          } : {
            api_key: t.apiKey,
            rating: t.rating
          }),
          method: "get",
          dataType: "json",
          crossOrigin: !0
        };
        return f(i, t.cancelationToken);
      }, e.prototype.trending = function (e) {
        e = n.defaults({}, e, this.options, a);
        var t = {
          url: r.url.buildUrl(e.serviceUrl, e.endpoint, {
            api_key: e.apiKey,
            rating: e.rating,
            limit: e.limit
          }),
          method: "get",
          dataType: "json",
          crossOrigin: !0
        };
        return f(t, e.cancelationToken);
      }, e;
    }();
  t.build = c;
})
