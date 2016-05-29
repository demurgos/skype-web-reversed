define("jSkype/services/serviceAccessLayer/requestDispatcher", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "reqwest",
  "jSkype/services/serviceAccessLayer/builders/factory",
  "jSkype/services/serviceAccessLayer/requestDecorator"
], function (e, t) {
  function u(e, i, o) {
    function p(e) {
      return u = r.compat(n.cloneDeep(e)), a(u);
    }
    function d(e) {
      return function () {
        e.request.readyState !== t.REQUEST_DONE_READY_STATE && e.abort();
      };
    }
    var u, l = f(e, i, o), c = s.build(p, o), h = c(l);
    return h._abort = d(u), h;
  }
  function a(e) {
    return Promise.resolve(e).then(function (n) {
      return {
        request: e.request,
        response: n
      };
    }, function () {
      throw e.request;
    });
  }
  function f(e, t, n) {
    var r, s = i.get("headerBuilder"), u = typeof n.addContentType == "undefined" || n.addContentType === !0 ? !0 : !1;
    s.populate(n.headers);
    r = {
      url: t,
      type: e,
      headers: s.get(),
      timeout: o,
      dataType: n.dataType || "json",
      data: n.payload || "",
      crossOrigin: typeof n.crossOrigin != "undefined" ? n.crossOrigin : !0,
      withCredentials: typeof n.withCredentials != "undefined" ? n.withCredentials : !1
    };
    u && (r.contentType = n.contentType || "application/json");
    if (n.jsonp || n.dataType === "jsonp")
      r.jsonp = n.jsonp || "callback";
    return typeof n.processData == "boolean" && (r.processData = n.processData), r;
  }
  var n = e("lodash-compat"), r = e("reqwest"), i = e("jSkype/services/serviceAccessLayer/builders/factory"), s = e("jSkype/services/serviceAccessLayer/requestDecorator"), o = 45000;
  t.get = function (e, t) {
    return u("GET", e, t);
  };
  t.post = function (e, t) {
    return u("POST", e, t);
  };
  t.put = function (e, t) {
    return u("PUT", e, t);
  };
  t.remove = function (e, t) {
    return u("DELETE", e, t);
  };
  t.REQUEST_DONE_READY_STATE = 4;
});
