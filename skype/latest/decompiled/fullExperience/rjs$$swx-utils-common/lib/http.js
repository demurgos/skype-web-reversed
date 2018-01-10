(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/http", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e) {
    var t = e.request.getAllResponseHeaders(), i = t && t.split(/\n+/g), s = {};
    return i && i.length && n.forEach(i, function (e) {
      e = e && e.trim();
      var t = r.exec(e);
      if (t && t.length === 4) {
        var n = t[1], i = t[3];
        s[n] = i;
      }
    }), s;
  }
  function s(e, t) {
    var n = i(e);
    return n && n[t] || null;
  }
  var n = e("lodash-compat"), r = /^([\w\-]+)(:{1}[ \t]*)(.*)$/i;
  t.getAllResponseHeaders = i;
  t.getResponseHeader = s;
}));
