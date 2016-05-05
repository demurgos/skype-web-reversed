define("utils/people/userDataProcessor", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "cafe/applicationInstance",
  "utils/common/encoder",
  "utils/chat/messageSanitizer"
], function (e, t) {
  var n = e("lodash-compat"), r = e("cafe/applicationInstance"), i = e("utils/common/encoder"), s = e("utils/chat/messageSanitizer"), o = /(<flag country="\S+">\S+<\/flag>|<ss type="\S+">\S+<\/ss>)/gi;
  t.sanitize = function (e) {
    if (n.isString(e)) {
      var t = e, u = i.build(r);
      if (e.match(o) === null) {
        var a = s.escapeIncomingHTML(e);
        t = u.encode(a, !1);
      }
      return s.escapeIncomingHTML(u.decode(t));
    }
    return "";
  }, t.sanitizeXml = function (e) {
    return n.isString(e) ? n.escape(e) : "";
  }, t.stripAnchors = function (e) {
    return n.isString(e) ? s.removeAnchorTags(e) : "";
  };
})
