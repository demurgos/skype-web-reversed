(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("ecs-client/lib/jsonp", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function r(e, t, n, r, s) {
    function l(e) {
      clearTimeout(f);
      n && n(e);
    }
    function c(e) {
      clearTimeout(f);
      r && (r(new Error(e)), r = void 0, n = void 0);
    }
    function h() {
      c("timeout");
    }
    function p() {
      c("script.onerror invoked");
    }
    if (t <= 0 || t >= Math.pow(2, 31) || t !== (t | 0))
      throw new Error("invalid timeout");
    if (typeof s.callbackName != "string" && s.callbackName !== void 0 || s.callbackName === "")
      throw new Error("if provided, jsonp callback name must be a non-empty string");
    if (typeof s.async != "boolean" && s.async !== void 0)
      throw new Error("if provided, async flag must be boolean");
    try {
      var o = e + (/\?/.test(e) ? "&" : "?") + "callback=" + i(l, s.callbackName);
      a(o, p, s.async);
    } catch (u) {
      r(u, !0);
      return;
    }
    var f = setTimeout(h, t);
  }
  function i(e, t) {
    var r = n.getWindow();
    return t ? o(e, t, r) : s(e, r);
  }
  function s(e, t) {
    var n;
    do
      n = (Math.random().toString(36) + "00000000000000000").slice(2, 12);
    while (n in t);
    return t[n] = e, n;
  }
  function o(e, t, n) {
    var r = t.split("."), i = u(r.slice(0, -1), n), s = r.pop();
    if (s in i && typeof i[s] != "function")
      throw new Error("non-function property with supplied callback name already exists");
    return i[s] = e, t;
  }
  function u(e, t) {
    var n = t;
    return e.forEach(function (e) {
      if (e in n) {
        if (n[e] && !Object.isExtensible(n[e]))
          throw new Error("callback namespace already exists but is not an extensible type");
      } else
        n[e] = {};
      n = n[e];
    }), n;
  }
  function a(e, t, r) {
    var i = n.getDocument(), s = i.createElement("script");
    s.src = e;
    s.type = "text/javascript";
    r ? s.async = !0 : s.defer = !0;
    s.onerror = t;
    i.getElementsByTagName("head")[0].appendChild(s);
  }
  var n = e("swx-browser-globals");
  t.request = r;
}));
