define("jSkype/services/serviceAccessLayer/builders/uriBuilder", [], function () {
  function e() {
    var e = {
      fqdn: null,
      resource: null,
      queryParams: null
    };
    this.build = function () {
      var t = e.fqdn;
      return t += e.resource !== null ? e.resource : "", t += e.queryParams !== null ? r(e.queryParams) : "", t;
    };
    this.setDomain = function (t) {
      var n = typeof t == "string";
      if (!n || t === "")
        throw new TypeError("domain must be a string");
      e.fqdn = t;
    };
    this.setResource = function (t) {
      e.fqdn.substring(0, 6) === "skype:" ? e.resource = t : e.resource = n(e.fqdn, t);
    };
    this.setQueryParams = function (t) {
      var n = {}.toString.call(t) === "[object Object]";
      if (!n && t !== undefined)
        throw new Error("queryParams must be an object");
      e.queryParams = t || {};
    };
  }
  function t(e) {
    var t = /^ *$/;
    if (e !== null && e !== undefined)
      return e.toString().replace(t, "");
  }
  function n(e, t) {
    var n = "/", r = t[0] === n;
    return e[e.length - 1] === n ? t = r ? t.substring(1) : t : t = r ? t : n + t, t;
  }
  function r(e) {
    function i(r) {
      var i = t(e[r]);
      i && n.push(r + "=" + i);
    }
    var n = [], r = "";
    for (var s in e)
      e.hasOwnProperty(s) && i(s);
    return n.length > 0 && (r = "?" + n.join("&")), r;
  }
  return e;
});
