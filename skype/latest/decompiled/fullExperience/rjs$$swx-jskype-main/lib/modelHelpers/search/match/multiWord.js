(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/match/multiWord", [
      "require",
      "exports",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function s(e, t) {
    function l(e, t) {
      return o(e, a) ? (f = { rank: t / r }, !0) : !1;
    }
    var s = n.stringUtils.removeNonWordCharacters(t), u = n.stringUtils.removeNonWordCharacters(e);
    if (!t || !o(u, s))
      return null;
    var a = s.split(i)[0], f = null;
    return u.split(i).some(l), f;
  }
  function o(e, t) {
    var n = new RegExp("(^|\\s|\\b)" + t, "i");
    return e.match(n);
  }
  var n = e("swx-utils-common"), r = 10, i = /\s?\b\s?/;
  t.func = s;
}));
