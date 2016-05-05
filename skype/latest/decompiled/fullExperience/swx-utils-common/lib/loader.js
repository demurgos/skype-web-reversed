function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/loader", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function r(e, t) {
    e.getElementsByTagName("head")[0].appendChild(t);
  }
  function i(e) {
    var t = n.getDocument(), i = t.createElement("link");
    return i.href = e, i.type = "text/css", i.rel = "stylesheet", r(t, i), i;
  }
  function s(e, t, i) {
    var s = n.getDocument(), o = s.createElement("script");
    return o.src = e, o.type = "text/javascript", o.async = !0, t && (o.onload = t), i && (o.onerror = i), r(s, o), o;
  }
  var n = e("swx-browser-globals");
  t.loadStyle = i, t.loadScript = s;
})
