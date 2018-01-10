(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-xhr-dispatcher/lib/xhrDispatcher", [
      "require",
      "exports",
      "lodash-compat",
      "reqwest",
      "./uriBuilder",
      "./xhrDecorator",
      "./decorations/retry"
    ], e);
}(function (e, t) {
  function u(e) {
    var t = i.build();
    t.setDomain(e.host);
    var r = n.cloneDeep(e);
    r.decorations = r.decorations || [];
    r.decorations.unshift(o);
    var s = f(n.partial(p, "GET"), t), u = f(n.partial(p, "POST"), t), a = f(n.partial(p, "PUT"), t), c = f(n.partial(p, "DELETE"), t);
    return {
      get: l(s, r),
      post: l(u, r),
      put: l(a, r),
      remove: l(c, r),
      uriBuilder: t
    };
  }
  function a(e) {
    return function () {
      e.request.readyState !== t.REQUEST_DONE_READY_STATE && e.abort();
    };
  }
  function f(e, t) {
    return function (n, r) {
      return t.setResource(n), t.setQueryParams(r.params), e(t.getUri(), r);
    };
  }
  function l(e, t) {
    return function (n, r) {
      return r.decorations = t.decorations, e(n, r);
    };
  }
  function c(e, t) {
    return n.isUndefined(e) ? t : e;
  }
  function h(e, r, i) {
    var s = {
      url: r,
      type: e,
      headers: i.headers || {},
      timeout: 45000,
      dataType: i.dataType || "json",
      data: i.payload || "",
      crossOrigin: c(i.crossOrigin, !0),
      withCredentials: c(i.withCredentials, !1)
    };
    if (n.isUndefined(i.addContentType) || i.addContentType === !0)
      s.contentType = i.contentType || t.contentTypes.JSON;
    if (i.jsonp || i.dataType === "jsonp")
      s.jsonp = i.jsonp || "callback";
    return n.isBoolean(i.processData) && (s.processData = i.processData), s;
  }
  function p(e, t, n) {
    var r = s.decorate(d, n);
    return r(h(e, t, n));
  }
  function d(e) {
    var t = Date.now(), i = r.compat(n.cloneDeep(e)), s = new Promise(function (e, n) {
        i.then(function (n) {
          e({
            response: n,
            request: i.request,
            duration: Date.now() - t
          });
        })["catch"](function () {
          n(i.request);
        });
      });
    return s.abort = a(i), s;
  }
  function g(e) {
    return new m(e);
  }
  var n = e("lodash-compat"), r = e("reqwest"), i = e("./uriBuilder"), s = e("./xhrDecorator"), o = e("./decorations/retry");
  t.contentTypes = {
    FORM_URL_ENCODED: "application/x-www-form-urlencoded",
    JSON: "application/json",
    JSON_V1_0: "application/json; ver=1.0",
    JSON_V2_0: "application/json; ver=2.0",
    JSON_V3_0: "application/json; ver=3.0"
  };
  t.REQUEST_DONE_READY_STATE = 4;
  t.build = u;
  var v = {
      retry: {
        limit: 3,
        delay: 1000,
        strategy: o.STRATEGIES.FIXED
      }
    }, m = function () {
      function e(e) {
        this.REQUEST_DONE_READY_STATE = t.REQUEST_DONE_READY_STATE;
        this.decorations = e.slice();
      }
      return e.prototype.get = function (e, t) {
        return p("GET", e, this.makeOptions(t));
      }, e.prototype.post = function (e, t) {
        return p("POST", e, this.makeOptions(t));
      }, e.prototype.put = function (e, t) {
        return p("PUT", e, this.makeOptions(t));
      }, e.prototype.remove = function (e, t) {
        return p("DELETE", e, this.makeOptions(t));
      }, e.prototype.makeOptions = function (e) {
        return e = n.assign(n.cloneDeep(v), e), e.decorations || (e.decorations = this.decorations), e;
      }, e;
    }();
  t.buildDispatcherWithFixedRetry = g;
}));
