(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-xhr-dispatcher/lib/xhrDecorator", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e, t) {
    var r = e, s = n.isArray(t.decorations) ? n.slice(t.decorations) : [];
    return n.forEach(s, function (e) {
      r = e.build(r, i(e.name, t));
    }), r;
  }
  function i(e, t) {
    return n.isString(e) && n.isPlainObject(t[e]) ? t[e] : {};
  }
  var n = e("lodash-compat");
  t.decorate = r;
}));
