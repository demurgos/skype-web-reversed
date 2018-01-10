(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceAccessLayer/uriBuilder", [
      "require",
      "exports",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function r() {
    function r() {
      var e = t.fqdn;
      return e += t.resource !== null ? t.resource : "", e += t.queryParams !== null ? o(t.queryParams) : "", e;
    }
    function i(n) {
      var r = typeof n == "string";
      e.log("Setting domain to", n);
      if (!r || n === "")
        throw new TypeError("domain must be a string");
      t.fqdn = n;
    }
    function u(n) {
      t.fqdn === null && e.error("FQDN was not set yet!", n);
      t.fqdn.substring(0, 6) === "skype:" ? t.resource = n : t.resource = s(t.fqdn, n);
    }
    function a(e) {
      var n = {}.toString.call(e) === "[object Object]";
      if (!n && e !== undefined)
        throw new Error("queryParams must be an object");
      t.queryParams = e || {};
    }
    var e = n.getLogger("[serviceAccessLayer]"), t = {
        fqdn: null,
        resource: null,
        queryParams: null
      };
    return {
      getUri: r,
      setDomain: i,
      setResource: u,
      setQueryParams: a
    };
  }
  function i(e) {
    var t = /^ *$/;
    if (e !== null && e !== undefined)
      return e.toString().replace(t, "");
  }
  function s(e, t) {
    var n = "/", r = t[0] === n;
    return e[e.length - 1] === n ? t = r ? t.substring(1) : t : t = r ? t : n + t, t;
  }
  function o(e) {
    function r(n) {
      var r = i(e[n]);
      r && t.push(n + "=" + r);
    }
    var t = [], n = "";
    for (var s in e)
      e.hasOwnProperty(s) && r(s);
    return t.length > 0 && (n = "?" + t.join("&")), n;
  }
  var n = e("swx-log-tracer");
  t.build = r;
}));
