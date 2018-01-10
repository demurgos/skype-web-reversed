(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/userDataProcessor", [
      "require",
      "exports",
      "swx-cafe-application-instance",
      "swx-encoder",
      "swx-utils-chat",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u(e) {
    if (s.isString(e)) {
      var t = r.build(n), u = e;
      if (e.match(o) === null) {
        var a = i.messageSanitizer.escapeIncomingHTML(e);
        u = t.encode(a, !1);
      }
      return i.messageSanitizer.escapeIncomingHTML(t.decode(u));
    }
    return "";
  }
  function a(e) {
    return s.isString(e) ? s.escape(e) : "";
  }
  function f(e) {
    return s.isString(e) ? i.messageSanitizer.removeAnchorTags(e) : "";
  }
  var n = e("swx-cafe-application-instance"), r = e("swx-encoder"), i = e("swx-utils-chat"), s = e("lodash-compat"), o = /(<flag country="\S+">\S+<\/flag>|<ss type="\S+">\S+<\/ss>)/gi;
  t.sanitize = u;
  t.sanitizeXml = a;
  t.stripAnchors = f;
}));
