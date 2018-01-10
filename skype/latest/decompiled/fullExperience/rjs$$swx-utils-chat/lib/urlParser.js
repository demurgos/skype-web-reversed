(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/urlParser", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e, t) {
    var n = decodeURIComponent(e), r = new RegExp("(" + t + ")=([^&]+)"), i = n.match(r);
    return i && i[2] ? i[2] : undefined;
  }
  function r(e) {
    e === void 0 && (e = null);
    var t = new RegExp("index[^#]*#(.+)/"), n = e && e.match(t);
    return n && n[1] ? n[1] : undefined;
  }
  function i(e) {
    return /^https:/.test(e);
  }
  function s(e) {
    var t = /(?:youtube\.com|youtu\.be)\/watch(?:\?|\&|&amp;)v=([\w-]{11})/.exec(e);
    return t || (t = /(?:youtube\.com|youtu\.be)\/([\w-]{11})/.exec(e)), t ? !0 : !1;
  }
  t.getParam = n;
  t.getRoute = r;
  t.isHttps = i;
  t.isYoutubeLink = s;
}));
