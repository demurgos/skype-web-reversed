(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-xhr-dispatcher/lib/uriBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function i() {
    function i() {
      var e = t.fqdn + t.resource;
      return e += t.queryParams !== null ? o(t.queryParams) : "", e;
    }
    function u(e) {
      var n = typeof e == "string";
      if (!n || e === "")
        throw new TypeError("domain must be a string");
      t.fqdn = e;
    }
    function a(n) {
      t.fqdn === null && e.error("FQDN was not set yet!", n);
      t.fqdn.substring(0, 6) === "skype:" ? t.resource = n : t.resource = s(t.fqdn, n);
    }
    function f(e) {
      if (!n.isPlainObject(e) && !n.isUndefined(e))
        throw new Error("queryParams must be an object");
      t.queryParams = e || {};
    }
    var e = r.getLogger("[xhrDispatcher]"), t = {
        fqdn: "",
        resource: "",
        queryParams: null
      };
    return {
      getUri: i,
      setDomain: u,
      setResource: a,
      setQueryParams: f
    };
  }
  function s(e, t) {
    var n = "/", r = t[0] === n;
    return e[e.length - 1] === n ? r ? t.substring(1) : t : r ? t : n + t;
  }
  function o(e) {
    var t = n.reduce(n.keys(e), function (t, n) {
      var r = u(e[n]);
      return r ? t.concat(n + "=" + r) : t;
    }, []).join("&");
    return t.length ? "?" + t : "";
  }
  function u(e) {
    var t = /^ *$/;
    return !n.isUndefined(e) && e !== null ? e.toString().replace(t, "") : undefined;
  }
  var n = e("lodash-compat"), r = e("swx-log-tracer");
  t.build = i;
}));
