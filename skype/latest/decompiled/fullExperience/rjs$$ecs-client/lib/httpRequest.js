(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("ecs-client/lib/httpRequest", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e, t, n, r, i) {
    function u() {
      clearTimeout(o);
      r && (r(new Error("timeout")), r = void 0, n = void 0);
    }
    function a() {
      if (s.readyState !== 4)
        return;
      s.status === 200 ? (clearTimeout(o), n && n(s.responseText)) : (clearTimeout(o), r && r(new Error("response code " + s.status)));
    }
    if (t <= 0 || t >= Math.pow(2, 31) || t !== (t | 0))
      throw new Error("invalid timeout");
    if (typeof XMLHttpRequest != "function") {
      r(new Error("XMLHttpRequest is not supported in this environment"), !0);
      return;
    }
    var s = new XMLHttpRequest();
    s.onreadystatechange = a;
    s.open("GET", e, !0);
    s.send();
    var o = setTimeout(u, t);
  }
  t.get = n;
}));
