(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-mri/lib/mri", [
      "require",
      "exports",
      "lodash-compat",
      "./mriMaps"
    ], e);
}(function (e, t) {
  function u(e) {
    return n.isString(e) ? e.replace(i, "") : undefined;
  }
  function a(e) {
    var t = i.exec(e);
    return t ? t[1] : undefined;
  }
  function f(e, t) {
    return h(e) ? e : p(e, t);
  }
  function l(e) {
    return s.test(e);
  }
  function c(e) {
    return o.test(e);
  }
  function h(e) {
    return e.match(i);
  }
  function p(e, t) {
    return l(e) ? d(e, r.contactMriTypes.pstn) : n(r.contactMriTypes).values().contains(t) ? d(e, t) : d(e, r.contactMriTypes.skype);
  }
  function d(e, t) {
    return t + ":" + e;
  }
  var n = e("lodash-compat"), r = e("./mriMaps"), i = /^(?:(\d+):)+/, s = /^(\+)?\d+$/, o = /^guest:/;
  t.getId = u;
  t.getTypeFromKey = a;
  t.getKey = f;
  t.isPstnId = l;
  t.isGuestId = c;
}));
